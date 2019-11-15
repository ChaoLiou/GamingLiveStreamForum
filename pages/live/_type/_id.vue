<template>
  <div class="live-type-id">
    <f-tab title="精彩實況" :tabs="tabs"></f-tab>
    <div class="content">
      <f-block
        :icon="$route.params.type === 'hot' ? '/platform_icons/icn_hot_B.png' : '/platform_icons/icn_push_B.png'"
        :to="`/live/${$route.params.type}`"
        :title="mainTitle"
        background-color="#f2ecf6"
      >
        <f-home-stream-carousel
          :streams="$route.params.type === 'hot' ? streamsByGame[$route.params.id] ? streamsByGame[$route.params.id].slice(0, 5) : streams['all'].slice(0, 5) : streams[$route.params.id ? $route.params.id : 'all'].slice(0, 5)"
        ></f-home-stream-carousel>
      </f-block>
      <div>
        <div v-if="multiple">
          <f-block
            more
            :to="`/live/${$route.params.type}/${item.id}`"
            :title="item.title"
            :icon="item.icon"
            v-for="(item, index) in multipleSource"
            :key="index"
            background-color="#f2ecf6"
          >
            <f-stream-container
              :streams="$route.params.type === 'hot' ? streamsByGame[item.id] ? streamsByGame[item.id].slice(0, 4) : [] : streams[item.id ? item.id : 'all'].slice(0, 4)"
            ></f-stream-container>
          </f-block>
        </div>
        <div v-else>
          <f-block :icon="platformIcon" :title="title" background-color="#f2ecf6">
            <f-stream-container
              :streams="$route.params.type === 'hot' ? streamsByGame[$route.params.id] ? streamsByGame[$route.params.id] : [] : streams[$route.params.id ? $route.params.id : 'all']"
            ></f-stream-container>
          </f-block>
        </div>
      </div>
    </div>
    <div class="pagination-container" v-if="!multiple">
      <v-pagination color="#3e006f" v-model="pageIndex" :length="15" :total-visible="7"></v-pagination>
    </div>
  </div>
</template>
<script>
import FTab from "@/components/FTab";
import FBlock from "@/components/FBlock";
import FHomeStreamCarousel from "@/components/FHomeStreamCarousel";
import FStreamContainer from "@/components/FStreamContainer";
import liveTabs from "@/assets/json/tabs/live";
import games from "@/assets/json/games";
import platforms from "@/assets/json/platforms";
export default {
  components: {
    FTab,
    FBlock,
    FHomeStreamCarousel,
    FStreamContainer
  },
  data() {
    return {
      tabs: [],
      multiple: true,
      multipleSource: [],
      streams: {
        all: [],
        douyu: [],
        bilibili: [],
        twitch: [],
        now: []
      },
      streamsByGame: {},
      totals: 0,
      title: "",
      pageIndex: 1,
      platformIcon: ""
    };
  },
  computed: {
    mainTitle() {
      return this.$route.params.type
        ? liveTabs.find(x => this.$route.params.type === x.type).title
        : liveTabs[0].title;
    }
  },
  mounted() {
    this.multiple = this.$route.params.id === undefined;
    this.multipleSource = this.$route.params.type === "hot" ? games : platforms;
    if (!this.multiple) {
      this.title = this.multipleSource.find(
        x => x.id === this.$route.params.id
      ).title;
      this.initPlatformIcon();
    }
    this.tabs = liveTabs.map(x => ({
      ...x,
      active: this.$route.params.type === x.type
    }));
    this.getStreams(0, 20).then(streams => (this.streams.all = streams));
    this.getStreams(0, 20, "douyu").then(
      streams => (this.streams.douyu = streams)
    );
    this.getStreams(0, 20, "bilibili").then(
      streams => (this.streams.bilibili = streams)
    );
    this.getTwitchStreams(20).then(promises => {
      promises.forEach(p => p.then(res => this.streams.twitch.push(res)));
    });
    this.getStreamsByGame().then(promises => {
      promises.forEach(p =>
        p.then(
          res => (this.streamsByGame[res.game.id] = res.streams.slice(0, 20))
        )
      );
    });
  },
  methods: {
    initPlatformIcon() {
      const platform = platforms.find(x => x.title === this.$route.params.id);
      this.platformIcon = platform
        ? platform.icon
        : this.$route.params.type == "hot"
        ? "/platform_icons/icn_hot_B.png"
        : "/platform_icons/icn_push_B.png";
    }
  }
};
</script>
<style scoped>
.live-type-id {
  background-color: #f2ecf6;
}
.content {
  margin: 40px;
  padding-top: 70px;
}
.pagination-container {
  display: grid;
  justify-items: center;
}
.f-home-stream-carousel {
  justify-self: center;
  margin-top: 0px !important;
}
</style>
