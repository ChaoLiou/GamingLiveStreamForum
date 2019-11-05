<template>
  <div class="f-carousel">
    <v-card>
      <v-btn large icon class="slide-btn slide-btn__prev" dark @click="moveTo(true)">
        <v-icon large>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn large icon class="slide-btn slide-btn__next" dark @click="moveTo(false)">
        <v-icon large>keyboard_arrow_right</v-icon>
      </v-btn>
      <v-carousel :cycle="false" hide-delimiters hide-controls height="300px">
        <v-carousel-item ref="carouselItems" v-for="(item, index) in streams " :key="index">
          <f-stream-preview ref="streams" player :stream="item"></f-stream-preview>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </div>
</template>
<script>
import FStreamPreview from "@/components/FStreamPreview";
export default {
  components: {
    FStreamPreview
  },
  props: {
    streams: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      index: 0
    };
  },
  methods: {
    moveTo(prev) {
      const lastIndex = this.streams.length - 1;
      if (prev && this.index === 0) {
        this.index = lastIndex;
        this.$refs.carouselItems[this.index].toggle();
      } else if (!prev && this.index === lastIndex) {
        this.index = 0;
        this.$refs.carouselItems[this.index].toggle();
      } else {
        this.$refs.carouselItems[prev ? --this.index : ++this.index].toggle();
      }

      this.$refs.streams.forEach((stream, index) =>
        stream.turnPlayer(this.index === index)
      );
    }
  }
};
</script>
<style scoped>
.f-carousel {
  margin: 10px 0px;
}
.v-card {
  border-radius: 15px;
  margin: auto;
  width: 730px;
  height: 300px;
  position: relative;
}
.v-carousel {
  border-radius: 15px;
}
.slide-btn {
  position: absolute;
  top: calc(50% - 22px);
  background-color: #e7d6fa;
}
.slide-btn__prev {
  left: 0px;
  margin-left: -66px;
}
.slide-btn__next {
  right: 0px;
  margin-right: -66px;
}
</style>
