<template>
  <div class="live-type-id">
    <f-tab
      v-if="!$vuetify.breakpoint.xs"
      :title="$t('live_type_id.amazing_streams')"
      :tabs="tabs"
      from="live"
    ></f-tab>
    <div class="content">
      <f-block
        :icon="
          $route.params.type === 'hot'
            ? hotIcon
            : '/platform_icons/icn_push_B.png'
        "
        :to="`/live/${$route.params.type}`"
        :title="mainTitle"
        :content-left-margin="12"
        :font-size="$vuetify.breakpoint.xs ? 16 : 30"
      >
        <f-home-stream-carousel-mobile
          v-if="$vuetify.breakpoint.xs"
          :streams="fstreams_slice5"
        ></f-home-stream-carousel-mobile>
        <f-home-stream-carousel
          v-else
          :streams="fstreams_slice5"
        ></f-home-stream-carousel>
      </f-block>
      <div>
        <div v-if="multiple">
          <f-block
            more
            :content-left-margin="12"
            :font-size="$vuetify.breakpoint.xs ? 16 : 30"
            :to="`/live/${$route.params.type}/${item.id}`"
            :title="$t(`${localeKey}.${item.id}`)"
            :icon="item.icon ? item.icon : '/platform_icons/icn_Game_B.png'"
            v-for="(item, index) in multipleSource"
            :key="index"
            v-show="getFStreams(item.id).length > 0"
          >
            <f-stream-container
              :streams="getFStreams(item.id)"
            ></f-stream-container>
          </f-block>
        </div>
        <div v-else>
          <f-block
            :content-left-margin="12"
            :font-size="$vuetify.breakpoint.xs ? 16 : 30"
            :icon="platformIcon"
            :title="title"
          >
            <f-stream-container :streams="fstreams"></f-stream-container>
          </f-block>
        </div>
      </div>
    </div>
    <div class="more-btn-container" v-if="!multiple">
      <v-btn dark block @click="loadMore">
        {{ $t("live_type_id.load_more_streams") }}
      </v-btn>
    </div>
  </div>
</template>
<script>
import FTab from "@/components/FTab";
import FBlock from "@/components/FBlock";
import FHomeStreamCarousel from "@/components/FHomeStreamCarousel";
import FHomeStreamCarouselMobile from "@/components/FHomeStreamCarouselMobile";
import FStreamContainer from "@/components/FStreamContainer";
import liveTabs from "@/assets/json/tabs/live";
import games from "@/assets/json/games";
import platforms from "@/assets/json/platforms";
export default {
  components: {
    FTab,
    FBlock,
    FHomeStreamCarousel,
    FHomeStreamCarouselMobile,
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
        cc163: [],
        huya: []
      },
      streamsByGame: {
        jdqs: [],
        jdqsm: [],
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
    localeKey() {
      return this.isGroupByGame ? "_games" : "_platforms";
    },
    isGroupByGame() {
      return this.$route.params.type === "hot";
    },
    fstreams() {
      return this.isGroupByGame
        ? this.streamsByGame[this.$route.params.id]
          ? this.streamsByGame[this.$route.params.id]
          : []
        : this.streams[this.$route.params.id ? this.$route.params.id : "all"];
    },
    fstreams_slice5() {
      return this.isGroupByGame
        ? this.streamsByGame[this.$route.params.id]
          ? this.streamsByGame[this.$route.params.id].slice(0, 5)
          : this.streams["all"].slice(0, 5)
        : this.streams[
            this.$route.params.id ? this.$route.params.id : "all"
          ].slice(0, 5);
    },
    mainTitle() {
      let target = undefined;
      if (this.$route.params.type) {
        target = liveTabs.find(x => this.$route.params.type === x.type);
      } else {
        target = liveTabs[0];
      }
      return target ? this.$t(`_tabs.live.${target.type}`) : "Title";
    }
  },
  mounted() {
    this.multiple = this.$route.params.id === undefined;
    this.multipleSource = this.isGroupByGame ? games : platforms;
    if (!this.multiple) {
      const target = this.multipleSource.find(
        x => x.id === this.$route.params.id
      );
      if (target) {
        this.title = this.$t(`${this.localeKey}.${target.id}`);
      }
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
        .filter(x => !x.usingOfficialAPI)
        .forEach(p => {
          this.getStreams(0, 20, { src: p.id }).then(
            streams => (this.streams[p.id] = streams)
          );
        });
      this.getTwitchStreams(0, 20, true).then(promises => {
        promises.forEach(p => p.then(res => this.streams.twitch.push(res)));
      });
      this.getYoutubeStreams(0, 20).then(streams => {
        this.youtubeNextPageToken =
          streams.length > 0 ? streams[0].nextPageToken : undefined;
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
            this.youtubeNextPageToken =
              streams.length > 0 ? streams[0].nextPageToken : undefined;
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
@media (max-width: 600px) {
  .content {
    margin: 20px 0px 0px 0px;
  }
}
</style>
