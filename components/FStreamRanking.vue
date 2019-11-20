<template>
  <div class="f-stream-ranking">
    <f-container-slide-control left @slide="goLeft"></f-container-slide-control>
    <f-container-slide-control right @slide="goRight"></f-container-slide-control>
    <div class="stream-ranking__grid" ref="content">
      <div class="stream-ranking__item" v-for="(item, index) in streams" :key="index">
        <div :class="['ranking-board', index < 3 ? 'ranking-board__icon' : '']">
          <v-img v-if="index < 3" :src="ranks[index]"></v-img>
          <div v-else class="ranking-board__content font-italic font-weight-black">{{ index + 1 }}</div>
        </div>
        <v-card class="stream-board" color="#eadbf8">
          <f-link :link="`/stream/${item.platform}/${item.id}`">
            <v-img
              class="stream-board__stream-avatar"
              width="180px"
              height="180px"
              :src="item.streamer_image"
            >
              <f-stream-viewers :viewers="item.viewers"></f-stream-viewers>
            </v-img>
          </f-link>
          <div class="stream-board__stream-info">
            <f-link :link="getPlatformInfo(item.platform, 'link')" external>
              <v-img width="46px" :src="getPlatformInfo(item.platform, 'icon')"></v-img>
            </f-link>
            <div class="stream-info__text">
              <div class="text-truncate">
                <f-link :link="`/stream/${item.platform}/${item.id}`">{{ item.streamer_name }}</f-link>
              </div>
              <div>
                <f-link
                  :link="getPlatformInfo(item.platform, 'link')"
                  external
                >{{ getPlatformInfo(item.platform, "title") }}</f-link>
              </div>
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
import platforms from "@/assets/json/platforms";
import FStreamViewers from "@/components/FStreamViewers";
import FLink from "@/components/FLink";
import FContainerSlideControl from "@/components/FContainerSlideControl";
export default {
  components: {
    FStreamViewers,
    FLink,
    FContainerSlideControl
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
    return { ranks, platforms };
  },
  methods: {
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
    },
    getPlatformInfo(platform_id, key) {
      const platform = platforms.find(x => x.id === platform_id);
      return platform ? platform[key] : "";
    }
  }
};
</script>
<style scoped>
.f-stream-ranking {
  display: grid;
}
.stream-ranking__grid {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  overflow: hidden;
  grid-gap: 15px;
  margin: 0px 20px;
}
.stream-ranking__item {
  position: relative;
  height: 100%;
  width: 100%;
}
.ranking-board.ranking-board__icon {
  z-index: 2;
}
.ranking-board {
  left: 60px;
  width: 80px;
  height: 100px;
  text-align: center;
  margin: 0px auto 0px auto;
  z-index: 1;
  position: absolute;
}
.ranking-board__content {
  color: #8e75ae;
  font-size: 45px;
  margin-bottom: 10px;
  background: #eadbf8;
  border-radius: 50%;
  width: 80px;
  height: 80px;
}
.stream-board {
  padding: 10px 0px;
  margin-top: 70px;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 200px;
  height: 260px;
  z-index: 1;
}
.stream-ranking__item:hover .stream-board,
.stream-ranking__item:hover .ranking-board__content {
  box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.5);
}
.stream-board__stream-avatar {
  border-radius: 5px;
  margin: 0px 10px;
}
.stream-board__stream-info {
  display: grid;
  grid-template-columns: 46px 134px;
  margin: 10px;
}
.stream-info__text {
  margin-left: 10px;
  color: #6540a7;
  font-size: 18px;
}
</style>
