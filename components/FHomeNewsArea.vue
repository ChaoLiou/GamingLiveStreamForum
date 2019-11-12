<template>
  <div class="f-home-news-area">
    <f-home-news-carousel :source="carouselSource" :interval-seconds="10"></f-home-news-carousel>
    <f-home-news-tab-page :source="news"></f-home-news-tab-page>
  </div>
</template>
<script>
import FHomeNewsCarousel from "@/components/FHomeNewsCarousel";
import FHomeNewsTabPage from "@/components/FHomeNewsTabPage";
import news from "@/assets/json/news";
import newsTypes from "@/assets/json/news-types";
export default {
  components: {
    FHomeNewsCarousel,
    FHomeNewsTabPage
  },
  data() {
    return {
      news: news.map((x, index) => {
        return { ...x, type: newsTypes[index % 4] };
      })
    };
  },
  computed: {
    carouselSource() {
      return this.news
        .slice(0, 6)
        .map(x => ({ ...x, image: x.image.replace("/S/", "/B/") }));
    }
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
</style>
