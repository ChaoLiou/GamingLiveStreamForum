<template>
  <div class="live-type-id">
    <f-tab title="精彩實況" :tabs="tabs"></f-tab>
    <div class="content">
      <f-block
        :icon="$route.params.type == 'hot' ? 'platform_icons/icn_hot_B.png' : 'platform_icons/icn_push_B.png'"
        :to="`/live/${$route.params.type}`"
        :title="mainTitle"
        background-color="#f2ecf6"
      >
        <f-home-stream-carousel
          v-if="$route.params.id === '斗魚直播'"
          :streams="topDouyuStreams.slice(0, 5)"
        ></f-home-stream-carousel>
        <f-home-stream-carousel v-else :streams="topStreams"></f-home-stream-carousel>
      </f-block>
      <div>
        <div v-if="multiple">
          <f-block
            more
            :to="`/live/${$route.params.type}/${item.title.toLowerCase()}`"
            :title="item.title"
            :icon="item.icon"
            v-for="(item, index) in multipleSource"
            :key="index"
            background-color="#f2ecf6"
          >
            <f-stream-container v-if="item.title === '斗魚直播'" :streams="topDouyuStreams.slice(0, 4)"></f-stream-container>
            <f-stream-container v-else :streams="topStreams.slice(0, 4)"></f-stream-container>
          </f-block>
        </div>
        <div v-else>
          <f-block :icon="platformIcon" :title="title" background-color="#f2ecf6">
            <f-stream-container v-if="title === '斗魚直播'" :streams="douyuStreams"></f-stream-container>
            <f-stream-container v-else :streams="streams"></f-stream-container>
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
      topStreams: [],
      streams: [],
      topDouyuStreams: [],
      douyuStreams: [],
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
      this.title = this.$route.params.id;
      this.title = [this.title[0].toUpperCase(), ...this.title.slice(1)].join(
        ""
      );
      this.initPlatformIcon();
    }
    this.tabs = liveTabs.map(x => ({
      ...x,
      active: this.$route.params.type === x.type
    }));
    this.getStreams(20);
    this.getDouyuStreams(0, 20);
  },
  methods: {
    initPlatformIcon() {
      const platform = platforms.find(x => x.title === this.$route.params.id);
      this.platformIcon = platform
        ? platform.icon
        : this.$route.params.type == "hot"
        ? "/platform_icons/icn_hot_B.png"
        : "/platform_icons/icn_push_B.png";
    },
    async getStreams(amount) {
      const { streams, _total } = await this.$axios.$get(
        `https://api.twitch.tv/kraken/streams/?limit=${
          amount ? amount : 5
        }&language=zh-tw`,
        {
          headers: {
            "Client-ID": "6zvm0fafre0cbqse6zez4q0nattl7h",
            Accept: "application/vnd.twitchtv.v5+json"
          }
        }
      );
      const gstreams = streams.map(x => ({
        id: x.channel._id.toString(),
        source: `https://player.twitch.tv/?channel=${x.channel.name}&autoplay=true`,
        preview: x.preview.template,
        viewers: x.viewers,
        streamer_image: x.channel.logo,
        title: x.channel.status,
        name: x.channel.name,
        streamer_name: x.channel.display_name,
        game: x.game,
        description: x.channel.description,
        chatSource: `https://www.twitch.tv/embed/${x.channel.name}/chat`,
        platform: "Twitch"
      }));
      this.streams = gstreams;
      this.totals = _total;
      this.topStreams = gstreams.slice(0, 5);
    },
    async getDouyuStreams(begin, size) {
      const aid = "12345";
      const streams = await this.$axios.$get(
        `https://woolive.ark-program.com/stream/list?src=douyu&begin=${
          begin ? begin : 0
        }&size=${size ? size : 4}`
      );
      const gstreams = streams.map(x => ({
        id: x.baseId,
        source: `https://open.douyu.com/tpl/h5/chain2/${aid}/${x.roomId}`,
        preview: x.roomImg,
        viewers: x.online,
        streamer_image: x.avatar,
        title: x.roomName,
        streamer_name: x.ownerName,
        game: x.gameName,
        description: x.roomDesc,
        platform: "斗魚直播",
        externalLink: x.streamUrl,
        follows: x.fans
      }));
      this.topDouyuStreams = this.douyuStreams = gstreams;
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
