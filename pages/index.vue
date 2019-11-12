<template>
  <div class="index">
    <div class="landing-background"></div>
    <div class="landing">
      <f-home-stream-carousel :streams="streams.slice(0, 5)"></f-home-stream-carousel>
    </div>
    <div class="content-grid">
      <div class="content-grid__main">
        <f-home-news-area></f-home-news-area>
        <f-block
          icon="/platform_icons/icn_push_B.png"
          background-color="#f2ecf6"
          more
          to="/live/recommend"
          title="推薦實況"
        >
          <f-stream-container :streams="streams.slice(0, 8)"></f-stream-container>
        </f-block>
        <f-block
          background-color="#f2ecf6"
          title="本週播主榜"
          :tabs="['月榜']"
          :font-size="30"
          :line-height="3"
          icon="/platform_icons/icn_star_B.png"
          @tab-change="tabChange"
        >
          <f-stream-ranking :streams="streamRankingSource"></f-stream-ranking>
        </f-block>
        <f-block
          icon="/platform_icons/icn_hot_B.png"
          background-color="#f2ecf6"
          title="熱門遊戲"
          to="/live/hot"
          more
          more-title="更多遊戲"
        >
          <f-game-ranking :games="games"></f-game-ranking>
        </f-block>
        <f-block
          background-color="#f2ecf6"
          more
          :to="`/live/recommend/${item.title.toLowerCase()}`"
          :title="item.title"
          :icon="item.icon"
          v-for="(item, index) in platforms"
          :key="index"
        >
          <f-stream-container v-if="item.title === '斗魚直播'" :streams="douyuStreams.slice(0, 8)"></f-stream-container>
          <f-stream-container v-else :streams="streams.slice(0, 8)"></f-stream-container>
        </f-block>
      </div>
      <div class="content-grid__side">
        <f-temp-ad></f-temp-ad>
      </div>
    </div>
  </div>
</template>
<script>
import FHomeStreamCarousel from "@/components/FHomeStreamCarousel";
import FHomeNewsArea from "@/components/FHomeNewsArea";
import FTempAd from "@/components/FTempAd";
import FBlock from "@/components/FBlock";
import FStreamContainer from "@/components/FStreamContainer";
import FStreamRanking from "@/components/FStreamRanking";
import FGameRanking from "@/components/FGameRanking";
import platforms from "@/assets/json/platforms";
export default {
  components: {
    FHomeStreamCarousel,
    FHomeNewsArea,
    FTempAd,
    FBlock,
    FStreamContainer,
    FStreamRanking,
    FGameRanking
  },
  data() {
    return {
      streams: [],
      douyuStreams: [],
      totals: 0,
      platforms,
      selectedRankingType: -1,
      games: []
    };
  },
  computed: {
    streamRankingSource() {
      return this.selectedRankingType === -1
        ? this.streams
        : this.streams
            .map(x => {
              const rand = Math.floor(Math.random() * 4) + 1;
              return { ...x, viewers: rand * x.viewers };
            })
            .sort((a, b) => b.viewers - a.viewers);
    }
  },
  mounted() {
    this.getGames(6);
    this.getStreams(20);
    this.getDouyuStreams(0, 8);
  },
  methods: {
    async getGames(amount) {
      const { _totas, top } = await this.$axios.$get(
        `https://api.twitch.tv/kraken/games/top?limit=${
          amount ? amount : 4
        }&language=zh-tw`,
        {
          headers: {
            "Client-ID": "6zvm0fafre0cbqse6zez4q0nattl7h",
            Accept: "application/vnd.twitchtv.v5+json"
          }
        }
      );
      this.games = top;
    },
    async getStreams(amount) {
      const { streams, _total } = await this.$axios.$get(
        `https://api.twitch.tv/kraken/streams/?limit=${
          amount ? amount : 4
        }&language=zh-tw`,
        {
          headers: {
            "Client-ID": "6zvm0fafre0cbqse6zez4q0nattl7h",
            Accept: "application/vnd.twitchtv.v5+json"
          }
        }
      );
      this.streams = streams.map(x => ({
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
      this.totals = _total;
    },
    async getDouyuStreams(begin, size) {
      const aid = "12345";
      const streams = await this.$axios.$get(
        `https://woolive.ark-program.com/stream/list?src=douyu&begin=${
          begin ? begin : 0
        }&size=${size ? size : 4}`
      );
      this.douyuStreams = streams.map(x => ({
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
    },
    tabChange(index) {
      this.selectedRankingType = index;
    }
  }
};
</script>
<style scoped>
.index {
  background-color: #f2ecf6;
}
.landing {
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 200px 20px 20px 20px;
  height: 430px;
}
.landing-background {
  position: absolute;
  left: 0px;
  top: 0px;
  background: url(~static/landing-background.png) no-repeat;
  background-size: cover;
  width: 100vw;
  height: 783px;
  z-index: 0;
}
.content-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto 300px;
  margin-top: 120px;
  margin-left: 20px;
  margin-right: 20px;
}
.content-grid__main > div {
  margin-bottom: 20px;
}
.content-grid__main > .f-home-news-area {
  margin-bottom: 45px;
}
@media (min-width: 1900px) {
  .landing {
    height: 510px;
  }
  .landing-background {
    height: 863px;
  }
  .content-grid {
    margin-top: 200px;
  }
}
</style>
