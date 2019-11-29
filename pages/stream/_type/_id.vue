<template>
  <div class="stream-type-id">
    <f-tab :tabs="[]" :title="''">
      <div class="f-tab__grid">
        <v-btn icon dark>
          <v-icon>star_border</v-icon>
        </v-btn>
        <v-btn to="/live/recommend">
          {{
          $t("account_type_subtype.stream_overview")
          }}
        </v-btn>
      </div>
    </f-tab>
    <div class="content">
      <div>
        <f-stream v-if="stream" :stream="stream"></f-stream>
      </div>
      <div class="stream-below-info">
        <f-block-box :title="$t('account_type_subtype.streamer_info')" background-color="#f2ecf6">
          <div v-html="stream.description"></div>
        </f-block-box>
      </div>
      <div class="stream-comment">
        <f-block-box :title="$t('account_type_subtype.hot_recommend')" background-color="#f2ecf6">
          <f-stream-container :col-count="3" :streams="filteredStreams"></f-stream-container>
        </f-block-box>
      </div>
    </div>
  </div>
</template>
<script>
import FTab from "@/components/FTab";
import FStream from "@/components/FStream";
import FBlockBox from "@/components/FBlockBox";
import FStreamContainer from "@/components/FStreamContainer";
export default {
  components: {
    FTab,
    FStream,
    FBlockBox,
    FStreamContainer
  },
  data() {
    return {
      stream: {},
      streams: []
    };
  },
  computed: {
    filteredStreams() {
      return this.streams
        .filter(x => x.id.toString() !== this.$route.params.id)
        .slice(0, 12);
    }
  },
  mounted() {
    if (this.$route.params.id) {
      if (this.$route.params.type === "youtube") {
        this.getYoutubeStream(this.$route.params.id).then(
          stream => (this.stream = stream)
        );
        this.getYoutubeStreams(0, 13).then(streams => (this.streams = streams));
      } else if (this.$route.params.type === "twitch") {
        this.getTwitchStream(this.$route.params.id).then(
          stream => (this.stream = stream)
        );
        this.getTwitchStreams(0, 13, true).then(streams => {
          streams.forEach(s => s.then(res => this.streams.push(res)));
        });
      } else {
        this.getStream(this.$route.params.id).then(
          stream => (this.stream = stream)
        );
        this.getStreams(0, 13, { src: this.$route.params.type }).then(
          streams => (this.streams = streams)
        );
      }
    }
  },
  methods: {}
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
.v-btn {
  background: linear-gradient(45deg, #6540a7, 40%, #dab4ff, 60%, #6540a7);
  color: white;
  font-size: 16px;
}
@media (min-width: 1900px) {
  .stream-below-info,
  .stream-comment {
    margin-top: 20px;
    width: calc(100% - 435px);
  }
}
</style>
