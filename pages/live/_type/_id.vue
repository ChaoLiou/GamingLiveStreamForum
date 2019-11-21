<template>
  <div class="live-type-id">
    <f-tab title="精彩實況" :tabs="tabs"></f-tab>
    <div class="content">
      <f-block
        :icon="
          $route.params.type === 'hot'
            ? '/platform_icons/icn_hot_B.png'
            : '/platform_icons/icn_push_B.png'
        "
        :to="`/live/${$route.params.type}`"
        :title="mainTitle"
      >
        <f-home-stream-carousel :streams="fstreams_slice5"></f-home-stream-carousel>
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
            v-show="getFStreams(item.id).length > 0"
          >
            <f-stream-container :streams="getFStreams(item.id)"></f-stream-container>
          </f-block>
        </div>
        <div v-else>
          <f-block :icon="platformIcon" :title="title">
            <f-stream-container :streams="fstreams"></f-stream-container>
          </f-block>
        </div>
      </div>
    </div>
    <div class="more-btn-container" v-if="!multiple">
      <v-btn dark block @click="loadMore">載入更多直播</v-btn>
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
        now: [],
        youtube: [],
        cc163: []
      },
      streamsByGame: {
        jdqs: [],
        how: [],
        lol: [],
        wzry: [],
        chess: [],
        pubg: [],
        identityv: [],
        apex: [],
        deadline: [],
        csgo: [],
        lolm: [],
        overwatch: []
      },
      totals: 0,
      title: "",
      pageIndex: 0,
      platformIcon: "",
      youtubeNextPageToken: ""
    };
  },
  computed: {
    fstreams() {
      return this.$route.params.type === "hot"
        ? this.streamsByGame[this.$route.params.id]
          ? this.streamsByGame[this.$route.params.id]
          : []
        : this.streams[this.$route.params.id ? this.$route.params.id : "all"];
    },
    fstreams_slice5() {
      return this.$route.params.type === "hot"
        ? this.streamsByGame[this.$route.params.id]
          ? this.streamsByGame[this.$route.params.id].slice(0, 5)
          : this.streams["all"].slice(0, 5)
        : this.streams[
            this.$route.params.id ? this.$route.params.id : "all"
          ].slice(0, 5);
    },
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
    if (this.$route.params.type === "hot") {
      this.getStreamsByGame().then(promises => {
        promises.forEach(p =>
          p.then(
            res => (this.streamsByGame[res.game.id] = res.streams.slice(0, 20))
          )
        );
      });
    } else {
      platforms
        .filter(x => !x.usingOfficalAPI)
        .forEach(p => {
          this.getStreams(0, 20, { src: p.id }).then(
            streams => (this.streams[p.id] = streams)
          );
        });
      this.getTwitchStreams(0, 20, true).then(promises => {
        promises.forEach(p => p.then(res => this.streams.twitch.push(res)));
      });
      this.getYoutubeStreams(0, 20).then(streams => {
        this.youtubeNextPageToken = streams[0].nextPageToken;
        this.streams.youtube = streams;
      });
    }
  },
  methods: {
    getFStreams(id, sliced = 4) {
      return this.$route.params.type === "hot"
        ? this.streamsByGame[id]
          ? this.streamsByGame[id].slice(0, sliced)
          : []
        : this.streams[id ? id : "all"].slice(0, sliced);
    },
    loadMore() {
      this.pageIndex++;
      if (this.$route.params.type === "hot") {
        this.getStreams(this.pageIndex, 20, {
          sort: this.$route.params.id
        }).then(streams => {
          this.streamsByGame[this.$route.params.id].push(...streams);
        });
      } else {
        if (this.$route.params.id === "twitch") {
          this.getTwitchStreams(this.pageIndex, 20, true).then(promises =>
            promises.forEach(p => {
              p.then(res => {
                this.streams[this.$route.params.id].push(res);
              });
            })
          );
        } else if (this.$route.params.id === "youtube") {
          this.getYoutubeStreams(
            this.pageIndex,
            20,
            this.youtubeNextPageToken
          ).then(streams => {
            this.youtubeNextPageToken = streams[0].nextPageToken;
            this.streams[this.$route.params.id].push(...streams);
          });
        } else {
          this.getStreams(this.pageIndex, 20, {
            src: this.$route.params.id
          }).then(streams => {
            this.streams[this.$route.params.id].push(...streams);
          });
        }
      }
    },
    initPlatformIcon() {
      const platform = platforms.find(x => x.id === this.$route.params.id);
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
.more-btn-container {
  margin-bottom: 20px;
}
.more-btn-container .v-btn {
  width: 80%;
  margin: auto;
  background: linear-gradient(45deg, #6540a7, 49%, #dab4ff, 51%, #6540a7);
}
</style>
