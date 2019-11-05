<template>
  <div class="stream-type-id">
    <f-tab :tabs="[]" :title="''">
      <div class="f-tab__grid">
        <v-btn icon dark>
          <v-icon>star</v-icon>
        </v-btn>
        <v-btn to="/live/recommend">直播總覽</v-btn>
      </div>
    </f-tab>
    <div class="content">
      <div>
        <f-stream v-if="stream" :stream="stream"></f-stream>
      </div>
      <div class="stream-below-info">
        <f-block-box title="播主資訊" background-color="#f2ecf6">
          <div>{{stream ? stream.description : ''}}</div>
        </f-block-box>
      </div>
      <div class="stream-comment">
        <f-block-box title="熱門推薦" background-color="#f2ecf6">
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
      this.getStream(this.$route.params.id);
    }
    this.getStreams(13);
  },
  methods: {
    async getStream(id) {
      this.stream = (await this.$axios.$get(
        `https://api.twitch.tv/kraken/streams/${id}`,
        {
          headers: {
            "Client-ID": "6zvm0fafre0cbqse6zez4q0nattl7h",
            Accept: "application/vnd.twitchtv.v5+json"
          }
        }
      )).stream;
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
      this.streams = streams.map(x => ({
        id: x.channel._id,
        source: `https://player.twitch.tv/?channel=${x.channel.name}&autoplay=true`,
        preview: x.preview.template,
        viewers: x.viewers,
        streamer_image: x.channel.logo,
        title: x.channel.status,
        name: x.channel.name,
        streamer_name: x.channel.display_name,
        game: x.game,
        description: x.channel.description,
        chatSource: `https://www.twitch.tv/embed/${x.channel.name}/chat`
      }));
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
