<template>
  <div class="f-home-news-carousel">
    <v-carousel hide-delimiters :interval="interval" :height="height">
      <v-carousel-item v-for="(item, i) in source" :key="i">
        <nuxt-link
          :to="`/news/${item.type.value}/${item.id}`"
          :title="item.title"
        >
          <v-img
            :alt="item.title"
            :contain="!$vuetify.breakpoint.xs"
            :src="item.image"
            :height="height"
          >
            <div
              class="carousel__title text-truncate"
              :style="{ top: `calc(${height} - 30px)` }"
            >
              {{ item.title }}
            </div>
            <div
              class="carousel__title-shadow"
              :style="{ top: `calc(${height} - 40px)` }"
            ></div>
          </v-img>
        </nuxt-link>
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
    },
    height: {
      type: String,
      default: "360px"
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
  top: 0px;
  height: 40px;
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
@media (max-width: 600px) {
  .carousel__title {
    font-size: 14px;
    height: 20px;
  }
}
</style>
<style>
.f-home-news-carousel .v-responsive__content {
  position: relative;
}
.f-home-news-carousel .v-image__image {
  border-radius: 5px;
}
.f-home-news-carousel .v-btn__content {
  background: black;
  opacity: 0.7;
}
</style>
