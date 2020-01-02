<template>
  <div class="stream-type-id">
    <f-tab v-if="!$vuetify.breakpoint.xs" :tabs="[]" :title="''">
      <div class="f-tab__grid">
        <v-btn class="theme" icon dark>
          <v-icon>star_border</v-icon>
        </v-btn>
        <v-btn class="theme" to="/live/recommend">
          {{ $t("account_type_subtype.stream_overview") }}
        </v-btn>
      </div>
    </f-tab>
    <div v-if="$vuetify.breakpoint.xs" class="mobile-content">
      <f-vod-mobile
        v-if="vod"
        :stream="stream"
        :vod="vod"
        :source="list"
        @load-more="loadMore"
        @click="switchTab"
        :more-enabled="loadMoreEnabled[selectedTab]"
      ></f-vod-mobile>
    </div>
    <div v-else class="content">
      <div>
        <f-vod v-if="vod" :stream="stream" :vod="vod"></f-vod>
      </div>
      <div class="stream-below-info">
        <f-block-box
          :title="$t('account_type_subtype.streamer_info')"
          background-color="#f2ecf6"
        >
          <div v-html="stream.title"></div>
        </f-block-box>
      </div>
      <div class="stream-comment">
        <f-block-box
          :title="$t('account_type_subtype.hot_recommend')"
          :second-title="$t('fStream.vod')"
          background-color="#f2ecf6"
          tab
          @click="switchTab"
        >
          <f-stream-container
            narrow
            :max-col="3"
            :streams="list"
            :type="selectedTab === 'tab-1' ? 'stream' : 'vod'"
            :available="selectedTab === 'tab-1' || vods.length > 0"
            :msg="$t('account_type_subtype.no_vod_msg')"
          ></f-stream-container>
          <div v-if="list.length > 0">
            <v-btn
              :class="[loadMoreEnabled[selectedTab] ? 'theme' : 'disabled']"
              :dark="loadMoreEnabled[selectedTab]"
              block
              @click="loadMore"
              :disabled="!loadMoreEnabled[selectedTab]"
            >
              {{ $t("fFollowedStreams.load_more_streams") }}
            </v-btn>
          </div>
        </f-block-box>
      </div>
    </div>
  </div>
</template>
<script>
import FTab from "@/components/FTab";
import FVod from "@/components/FVod";
import FVodMobile from "@/components/FVodMobile";
import FBlockBox from "@/components/FBlockBox";
import FStreamContainer from "@/components/FStreamContainer";
export default {
  components: {
    FTab,
    FVod,
    FVodMobile,
    FBlockBox,
    FStreamContainer
  },
  data() {
    return {
      vod: {},
      stream: {},
      vods: [],
      streams: [],
      pageIndex: 0,
      pageSize: 6,
      selectedTab: "",
      loadMoreEnabled: { "tab-1": true, "tab-2": true }
    };
  },
  computed: {
    list() {
      if (this.selectedTab === "tab-1") {
        return this.streams.filter(
          x => x.id.toString() !== this.$route.params.sid
        );
      } else if (this.selectedTab === "tab-2") {
        return this.vods;
      } else {
        return [];
      }
    }
  },
  mounted() {
    if (this.$route.params.sid) {
      if (this.$route.params.type === "youtube") {
        this.getYoutubeStream(this.$route.params.sid).then(
          stream => (this.stream = stream)
        );
        this.getYoutubeStreams(0, 13).then(streams => (this.streams = streams));
      } else if (this.$route.params.type === "twitch") {
        this.getTwitchStream(this.$route.params.sid).then(
          stream => (this.stream = stream)
        );
        this.getTwitchStreams(0, 13, true).then(streams => {
          streams.forEach(s => s.then(res => this.streams.push(res)));
        });
      } else {
        this.getStream(this.$route.params.sid).then(
          stream => (this.stream = stream)
        );
        this.getStreams(0, 13, { src: this.$route.params.type }).then(
          streams => (this.streams = streams)
        );
      }
    }
    this.getVodsOfStream(this.pageIndex, 12, this.$route.params.sid).then(
      res => (this.vods = res)
    );
    this.getVodOfStream(this.$route.params.id).then(res => (this.vod = res));
  },
  methods: {
    switchTab(tab) {
      this.selectedTab = tab;
      this.pageIndex = 0;
    },
    loadMore() {
      this.pageIndex++;
      if (this.selectedTab === "tab-1") {
        if (this.$route.params.type === "twitch") {
          this.getTwitchStreams(this.pageIndex, this.pageSize, true).then(
            streams => {
              streams.forEach(s => s.then(res => this.streams.push(res)));
              this.loadMoreEnabled["tab-1"] =
                streams && streams.length === this.pageSize;
            }
          );
        } else if (this.$route.params.type === "youtube") {
          this.getYoutubeStreams(this.pageIndex, this.pageSize).then(
            streams => {
              this.streams = streams;
              this.loadMoreEnabled["tab-1"] =
                streams && streams.length === this.pageSize;
            }
          );
        } else {
          this.getStreams(this.pageIndex, this.pageSize, {
            src: this.$route.params.type
          }).then(streams => {
            this.streams.push(...streams);
            this.loadMoreEnabled["tab-1"] =
              streams && streams.length === this.pageSize;
          });
        }
      } else if (this.selectedTab === "tab-2") {
        this.getVodsOfStream(
          this.pageIndex,
          this.pageSize,
          this.$route.params.sid
        ).then(res => {
          this.vods.push(...res);
          this.loadMoreEnabled["tab-2"] = res && res.length === this.pageSize;
        });
      }
    }
  }
};
</script>
<style scoped>
.stream-type-id {
  background-color: #f2ecf6;
}
.content {
  margin: 0px 100px 5px 100px;
  padding-top: 70px;
}
.stream-below-info,
.stream-comment {
  margin-top: 20px;
  width: calc(100% - 340px);
}
.f-tab__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-self: end;
  justify-items: center;
  padding: 0px 40px;
}
.mobile-content {
  margin-top: 56px;
}
@media (min-width: 1904px) {
  .stream-below-info,
  .stream-comment {
    margin-top: 20px;
    width: calc((100vw - 435px - 100px));
  }
}
@media (max-width: 1264px) {
  .stream-below-info,
  .stream-comment {
    width: calc(100%);
  }
}
</style>
