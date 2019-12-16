<template>
  <div class="index">
    <div
      class="landing-background"
      :style="{ background: `url(/${landingBackground}) no-repeat` }"
    ></div>
    <div class="landing">
      <f-home-stream-carousel-mobile
        v-if="$vuetify.breakpoint.xs"
        :streams="streams.douyu.slice(0, 5)"
      ></f-home-stream-carousel-mobile>
      <f-home-stream-carousel
        v-else
        :streams="streams.douyu.slice(0, 5)"
      ></f-home-stream-carousel>
    </div>
    <div class="content-grid">
      <div class="content-grid__main">
        <f-home-news-area></f-home-news-area>
        <f-block
          :content-left-margin="!$vuetify.breakpoint.xs ? undefined : 12"
          icon="/platform_icons/icn_push_B.png"
          more
          to="/live/recommend"
          :font-size="$vuetify.breakpoint.xs ? 16 : 30"
          :title="$t('index.recommended_streams')"
        >
          <f-stream-container
            narrow
            :streams="streams.all.slice(0, 8)"
          ></f-stream-container>
        </f-block>
        <f-block
          :content-left-margin="!$vuetify.breakpoint.xs ? undefined : 12"
          :title="$t('index.hot_streamers')"
          :font-size="$vuetify.breakpoint.xs ? 16 : 30"
          :line-height="3"
          icon="/platform_icons/icn_star_B.png"
          @tab-change="tabChange"
        >
          <f-stream-ranking :streams="streamRanking"></f-stream-ranking>
        </f-block>
        <f-block
          :content-left-margin="!$vuetify.breakpoint.xs ? undefined : 12"
          :icon="hotIcon"
          :title="$t('index.hot_games')"
          :font-size="$vuetify.breakpoint.xs ? 16 : 30"
          to="/live/hot"
          more
          :more-title="$t('index.more_games')"
        >
          <f-game-ranking></f-game-ranking>
        </f-block>
        <f-block
          :content-left-margin="!$vuetify.breakpoint.xs ? undefined : 12"
          :more="available[item.id] === undefined || available[item.id]"
          :to="`/live/recommend/${item.id}`"
          :title="$t(`_platforms.${item.id}`)"
          :icon="item.icon"
          v-for="(item, index) in platforms"
          :font-size="$vuetify.breakpoint.xs ? 16 : 30"
          :key="index"
        >
          <f-stream-container
            narrow
            :available="available[item.id]"
            :streams="streams[item.id ? item.id : 'all']"
          ></f-stream-container>
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
import FHomeStreamCarouselMobile from "@/components/FHomeStreamCarouselMobile";
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
    FHomeStreamCarouselMobile,
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
        all: []
      },
      available: {
        youtube: false,
        twitch: false
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
  created() {
    platforms.forEach(x => {
      this.$set(this.streams, x.id, []);
    });
  },
  mounted() {
    this.getStreams(0, 20).then(streams => (this.streams.all = streams));
    platforms
      .filter(x => !x.usingOfficialAPI)
      .forEach(p => {
        this.getStreams(0, 8, { src: p.id }).then(
          streams => (this.streams[p.id] = streams)
        );
      });
    this.getTwitchStreams(0, 8, true).then(streams => {
      streams.forEach(s => s.then(res => this.streams.twitch.push(res)));
      this.available.twitch = streams && streams.length > 0;
    });
    this.getYoutubeStreams(0, 8).then(streams => {
      this.streams.youtube = streams;
      this.available.youtube = streams && streams.length > 0;
    });
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
  background-size: cover;
  width: 100vw;
  height: 783px;
  z-index: 0;
}
.content-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto 20vw;
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
@media (min-width: 1905px) {
  .landing {
    height: 510px;
  }
  .landing-background {
    height: 863px;
  }
  .content-grid {
    margin-top: 100px;
  }
}
@media (min-width: 1264px) and (max-width: 1904px) {
  .content-grid {
    margin-top: 140px;
  }
}
@media (max-width: 1264px) and (min-width: 960px) {
  .content-grid {
    margin-top: 80px;
  }
}
@media (max-width: 600px) {
  .content-grid {
    grid-template-columns: 1fr;
    margin: 0px;
  }
  .content-grid__side {
    display: none;
  }
  .landing-background {
    display: none;
  }
  .landing {
    margin: 86px 0px 30px 0px;
    height: calc((100vw - 60px) * 9 / 16);
  }
}
</style>
