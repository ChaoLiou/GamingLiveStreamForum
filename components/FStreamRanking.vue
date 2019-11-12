<template>
  <div class="f-stream-ranking">
    <v-btn large icon class="slide-btn slide-btn__prev" dark @click="goLeft">
      <v-icon large>keyboard_arrow_left</v-icon>
    </v-btn>
    <v-btn large icon class="slide-btn slide-btn__next" dark @click="goRight">
      <v-icon large>keyboard_arrow_right</v-icon>
    </v-btn>
    <div class="stream-rank__grid" ref="content">
      <div v-for="(item, index) in streams" :key="index" :style="{ display: 'grid' }">
        <v-avatar
          size="60px"
          color="#eadbf8"
          :style="{ 'justify-self': 'center', 'margin-bottom': '-10px', 'z-index': '1' }"
        >
          <v-img v-if="index < 3" :src="ranks[index]"></v-img>
          <div
            v-else
            class="font-italic font-weight-black"
            :style="{ color: '#8e75ae', 'font-size': '40px', 'margin-bottom': '10px' }"
          >{{index + 1}}</div>
        </v-avatar>
        <v-card
          color="#eadbf8"
          :style="{ 'padding':'10px 0px', 'margin-bottom': '10px', 'border-radius': '10px', width: '150px', height: '210px' }"
        >
          <v-img
            width="130px"
            :style="{ 'border-radius': '5px', margin: '0px 10px' }"
            :src="item.streamer_image"
          >
            <div class="fixed-mask viewer-mask">
              <div class="viewer-mask__container">
                <div class="viewer-mask__content">{{item.viewers}}</div>
                <div class="viewer-mask__background"></div>
              </div>
            </div>
          </v-img>
          <div :style="{ margin: '10px', display: 'grid', 'grid-template-columns': '46px 84px' }">
            <v-img width="46px" src="/platform_icons/icn_twitch_B.png"></v-img>
            <div :style="{ 'margin-left': '10px', color: '#6540a7', 'font-size': '18px' }">
              <div class="text-truncate">{{item.streamer_name}}</div>
              <div>{{item.platform}}</div>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};
function scrollTo(element, to, duration) {
  var start = element.scrollLeft,
    change = to - start,
    currentTime = 0,
    increment = 20;

  var animateScroll = function() {
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollLeft = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
}

import ranks from "@/assets/json/ranks";
import formatter from "@/assets/utils/formatter";
export default {
  props: {
    streams: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return { ranks };
  },
  methods: {
    fviewers: formatter.fviewers,
    scrollTo,
    goLeft() {
      this.scrollTo(
        this.$refs.content,
        this.$refs.content.scrollLeft - this.$refs.content.offsetWidth,
        300
      );
    },
    goRight() {
      this.scrollTo(
        this.$refs.content,
        this.$refs.content.scrollLeft + this.$refs.content.offsetWidth,
        300
      );
    }
  }
};
</script>
<style scoped>
.stream-rank__grid {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  overflow: hidden;
  grid-gap: 15px;
  margin: 0px 20px;
}
.stream-rank__grid > div {
  height: 100%;
  width: 100%;
}
.fixed-mask {
  position: absolute;
}
.viewer-mask {
  right: 0px;
  bottom: 0px;
}
.viewer-mask__container {
  position: relative;
  width: 50px;
  height: 25px;
}
.viewer-mask__container > div {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.viewer-mask__content {
  padding: 2px 10px;
  z-index: 2;
  color: black;
}
.viewer-mask__background {
  background: white;
  opacity: 0.8;
  z-index: 1;
  border-radius: 15px 0px 0px 0px;
}
.slide-btn {
  position: absolute;
  top: calc(50% - 44px + 30px);
  background-color: #b498f0;
  z-index: 1;
  border-radius: 5px !important;
  width: calc(44px / 2) !important;
  height: calc(44px * 2) !important;
}
.slide-btn__prev {
  left: 0px;
}
.slide-btn__next {
  right: 0px;
}
.f-stream-ranking {
  display: grid;
}
</style>
