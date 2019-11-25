<template>
  <div>
    <f-block
      :font-size="22"
      :line-height="0"
      :content-left-margin="10"
      :content-right-margin="30"
      title="推薦實況"
      background-color="#eadbf8"
    >
      <f-stream-container :streams="streams.slice(0, 4)"></f-stream-container>
    </f-block>
    <f-block
      :font-size="22"
      :line-height="0"
      :content-left-margin="10"
      :content-right-margin="30"
      title="追蹤實況"
      background-color="#eadbf8"
    >
      <f-stream-container :streams="streams"></f-stream-container>
      <div class="more-btn-container">
        <v-btn dark block @click="loadMore">載入更多直播</v-btn>
      </div>
    </f-block>
  </div>
</template>
<script>
import FBlock from "@/components/FBlock";
import FStreamContainer from "@/components/FStreamContainer";
export default {
  components: {
    FBlock,
    FStreamContainer
  },
  data() {
    return {
      streams: [],
      pageIndex: 0
    };
  },
  mounted() {
    this.getStreams(0, 12, { src: "douyu" }).then(
      streams => (this.streams = streams)
    );
  },
  methods: {
    loadMore() {
      this.pageIndex++;
      this.getStreams(this.pageIndex, 12, { src: "douyu" }).then(streams => {
        this.streams.push(...streams);
      });
    }
  }
};
</script>
<style scoped>
.f-stream-container {
  margin-left: 15px;
  margin-right: 15px;
}
.more-btn-container {
  margin: 20px 0px;
}
.more-btn-container .v-btn {
  width: 80%;
  margin: auto;
  background: linear-gradient(45deg, #6540a7, 49%, #dab4ff, 51%, #6540a7);
}
</style>
