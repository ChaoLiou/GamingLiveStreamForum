<template>
  <div class="index">
    <div class="landing-background"></div>
    <div class="landing">
      <f-home-stream-carousel :streams="streams.all.slice(0, 5)"></f-home-stream-carousel>
    </div>
    <div class="content-grid">
      <div class="content-grid__main">
        <f-home-news-area></f-home-news-area>
        <f-block icon="/platform_icons/icn_push_B.png" more to="/live/recommend" title="推薦實況">
          <f-stream-container :streams="streams.all.slice(0, 8)"></f-stream-container>
        </f-block>
        <f-block
          title="熱門主播榜"
          :font-size="30"
          :line-height="3"
          icon="/platform_icons/icn_star_B.png"
          @tab-change="tabChange"
        >
          <f-stream-ranking :streams="streamRanking"></f-stream-ranking>
        </f-block>
        <f-block
          icon="/platform_icons/icn_hot_B.png"
          title="熱門遊戲"
          to="/live/hot"
          more
          more-title="更多遊戲"
        >
          <f-game-ranking></f-game-ranking>
        </f-block>
        <f-block
          more
          :to="`/live/recommend/${item.id}`"
          :title="item.title"
          :icon="item.icon"
          v-for="(item, index) in platforms"
          :key="index"
        >
          <f-stream-container :streams="streams[item.id ? item.id : 'all']"></f-stream-container>
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
      streams: {
        all: [],
        douyu: [],
        bilibili: [],
        twitch: [],
        now: [],
        youtube: [],
        cc163: []
      },
      platforms,
      selectedRankingType: -1
    };
  },
  computed: {
    streamRanking() {
      const temp = this.streams.all.map(x => x);
      return temp.sort((a, b) => b.viewers - a.viewers).slice(0, 20);
    }
  },
  mounted() {
    this.getStreams(0, 20).then(streams => (this.streams.all = streams));
    platforms
      .filter(x => !x.usingOfficalAPI)
      .forEach(p => {
        this.getStreams(0, 8, { src: p.id }).then(
          streams => (this.streams[p.id] = streams)
        );
      });
    this.getTwitchStreams(0, 8, true).then(streams => {
      streams.forEach(s => s.then(res => this.streams.twitch.push(res)));
    });
    this.getYoutubeStreams(0, 8).then(
      streams => (this.streams.youtube = streams)
    );
  },
  methods: {
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
