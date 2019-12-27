<template>
  <div class="f-news-detail">
    <div class="news-detail__title">{{ news.title }}</div>
    <div
      :style="{
        display: 'grid',
        'grid-template-columns': '1fr 100px',
        margin: '5px 0px',
        'align-items': 'center'
      }"
    >
      <div>{{ news.time }}</div>
      <v-btn small color="primary" width="100px">
        <v-icon left small>thumb_up</v-icon>{{ $t("fNewsDetail.like") }}
      </v-btn>
    </div>
    <v-divider></v-divider>
    <div class="news-detail__content" v-html="fcontent"></div>
    <v-btn small color="primary" width="100px">
      <v-icon left small>local_offer</v-icon>{{ $t("fNewsDetail.collect") }}
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    news: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    fcontent() {
      return this.news.content
        ? this.news.content.replace(/data-src=/g, "src=")
        : "";
    }
  }
};
</script>
<style scoped>
.f-news-detail {
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 5px 10px;
}
.news-detail__title {
  font-size: 26px;
  margin: 10px 0px;
  font-weight: bold;
}
.news-detail__content {
  margin: auto;
  max-width: 938px;
  font-size: 18px;
}
</style>
<style>
.f-news-detail .GN-thumbnail,
.video-container {
  /* width: fit-content !important;
  margin: auto !important; */
}
.f-news-detail ul {
  list-style: none;
  padding-left: 0px;
}
@media (min-width: 600px) {
  .f-news-detail .video-container iframe {
    width: 776px !important;
    height: 437px !important;
  }
}
@media (max-width: 600px) {
  .f-news-detail {
    max-width: 100%;
    overflow: hidden;
  }
  .f-news-detail ul {
    padding: 0px;
  }
  .video-container,
  .video-container iframe {
    width: calc(100vw - 30px) !important;
    height: calc((100vw - 30px) * 437 / 776) !important;
  }
  .f-news-detail .GN-thumbnail,
  .f-news-detail .GN-thumbnail img,
  .f-news-detail img {
    width: calc(100vw - 30px) !important;
    height: auto !important;
  }
  .f-news-detail table {
    display: none;
    border: #aeaeae 2px solid;
    margin: 0 auto;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .f-news-detail table tbody {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  .f-news-detail table tr {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  .f-news-detail table td {
    width: auto !important;
    height: auto !important;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    border-radius: 3px;
    word-break: break-all;
    word-wrap: break-word;
  }
}
</style>
