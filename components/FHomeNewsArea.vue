<template>
  <div class="f-home-news-area">
    <f-home-news-carousel
      :source="carouselSource"
      :interval-seconds="10"
      :height="
        $vuetify.breakpoint.xs ? 'calc((100vw - 20px) * 9 / 16)' : undefined
      "
    ></f-home-news-carousel>
    <f-home-news-tab-page :source="news"></f-home-news-tab-page>
  </div>
</template>
<script>
import FHomeNewsCarousel from "@/components/FHomeNewsCarousel";
import FHomeNewsTabPage from "@/components/FHomeNewsTabPage";
import newsTypes from "@/assets/json/news-types";
export default {
  components: {
    FHomeNewsCarousel,
    FHomeNewsTabPage
  },
  data() {
    return {
      news: []
    };
  },
  computed: {
    carouselSource() {
      return this.news
        .filter(x => !!x.image)
        .slice(0, 6)
        .map(x => ({ ...x, image: x.image.replace("/S/", "/B/") }));
    }
  },
  mounted() {
    this.getNews(0, 24).then(
      res =>
        (this.news = res.map((x, index) => ({
          ...x,
          type: newsTypes[index % 4]
        })))
    );
  }
};
</script>
<style scoped>
.f-home-news-area {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: #eadbf8;
}
.f-home-news-area > div {
  margin: 10px;
}
@media (max-width: 1264px and min-width: 601px) {
  .f-home-news-area {
    grid-template-columns: 1fr;
    grid-template-rows: calc((100vw - 20vw - 20px - 40px) * 9 / 16) auto;
  }
}
@media (max-width: 600px) {
  .f-home-news-area {
    grid-template-columns: 1fr;
    grid-template-rows: calc((100vw - 20px) * 9 / 16 + 20px) auto;
  }
}
</style>
