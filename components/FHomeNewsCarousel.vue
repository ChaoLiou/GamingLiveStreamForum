<template>
  <div class="f-home-news-carousel">
    <v-carousel hide-delimiters :interval="interval" height="360px">
      <v-carousel-item v-for="(item,i) in source" :key="i" :src="item.image">
        <div class="carousel__title text-truncate">{{item.title}}</div>
        <div class="carousel__title-shadow"></div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  props: {
    source: {
      type: Array,
      default() {
        return {};
      }
    },
    intervalSeconds: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      interval: this.intervalSeconds * 1000
    };
  }
};
</script>
<style scoped>
.v-carousel {
  border-radius: 5px;
}
.carousel__title,
.carousel__title-shadow {
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 35px;
  border-radius: 5px;
}
.carousel__title {
  color: white;
  font-size: 20px;
  width: 90%;
  left: 5%;
  height: 30px;
  z-index: 2;
}
.carousel__title-shadow {
  width: 100%;
  background: black;
  opacity: 0.7;
  z-index: 1;
}
</style>
<style>
.f-home-news-carousel .v-responsive__content {
  position: relative;
}
.f-home-news-carousel .v-image__image {
  border-radius: 5px;
}
</style>
