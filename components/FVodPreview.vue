<template>
  <div :class="['f-vod-preview', player ? 'player' : '']">
    <f-link :link="vodLink">
      <v-img
        lazy
        :src="imageSource"
        :style="{
          'background-color': backgroundColor,
          'border-radius': `${backgroundColor ? '10px' : undefined} ${
            backgroundColor ? '10px' : undefined
          } 0px 0px`
        }"
        :max-height="$vuetify.breakpoint.xs ? '100px' : '200px'"
        :min-height="$vuetify.breakpoint.xs ? '100px' : '200px'"
      >
        <div class="fixed-mask play-mask">
          <v-img
            class="v-icon"
            src="/misc_icons/play_circle_outline.svg"
          ></v-img>
          <div class="fixed-mask play-mask__background"></div>
        </div>
        <div class="fixed-mask viewer-mask">
          <div class="viewer-mask__container">
            <div class="viewer-mask__content">
              {{ duration }}
            </div>
            <div class="viewer-mask__background"></div>
          </div>
        </div>
      </v-img>
    </f-link>
    <div
      :style="{
        'background-color': backgroundColor,
        'border-radius': `0px 0px  ${backgroundColor ? '10px' : undefined} ${
          backgroundColor ? '10px' : undefined
        }`
      }"
    >
      <div class="vod-brief">
        <div class="vod-brief__content">
          <div class="vod-brief__name" :title="vod.createTime">
            <a>{{ createTime }}</a>
          </div>
          <div v-if="!player" class="vod-brief__title" :title="vod.title">
            <f-link :link="vodLink">
              {{ vod.title }}
            </f-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import formatter from "@/assets/utils/formatter";
import helper from "@/assets/utils/helper";
import games from "@/assets/json/games";
import platforms from "@/assets/json/platforms";
import FLink from "@/components/FLink";
export default {
  components: {
    FLink
  },
  props: {
    vod: {
      type: Object,
      default() {
        return {};
      }
    },
    player: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      width: 530,
      height: 300
    };
  },
  computed: {
    duration() {
      return formatter.fduration(
        this.vod.durationSec ? this.vod.durationSec : 0
      );
    },
    createTime() {
      return formatter.fcreated(this.vod.createTime ? this.vod.createTime : 0);
    },
    toExternal() {
      return this.vod.platform === "bilibili";
    },
    vodLink() {
      return `/vod/${this.vod.src}/${this.vod.streamId}/${this.vod._id}`;
    },
    imageSource() {
      return this.vod.img;
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.f-vod-preview {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
}
.f-vod-preview.player {
  grid-template-columns: 53fr 20fr;
  grid-template-rows: 1fr;
}
.vod-brief {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.player .vod-brief {
  grid-template-columns: repeat(3, 1fr);
}
.vod-brief > div {
  margin: 5px;
}
.vod-description {
  margin: 10px;
  width: 180px;
}
.vod-brief .v-avatar {
  grid-column: 1/2;
  justify-self: center;
  align-self: center;
}
.vod-brief__content {
  font-size: 19px;
  grid-column: 1/-1;
}
.vod-brief__content > div {
  margin-bottom: 2px;
}
.vod-brief__content a {
  text-decoration: none;
}
.vod-description {
  max-height: 120px;
  overflow: hidden;
}
.vod-brief a {
  font-weight: 500;
}
.v-image {
  cursor: pointer;
  position: relative;
}
.fixed-mask {
  position: absolute;
}
.play-mask {
  transition: all 0.1s ease-out;
  top: calc(50% - 36px);
  left: calc(50% - 36px);
  width: 72px;
  height: 72px;
  opacity: 0;
}
.v-image:hover .play-mask {
  opacity: 1;
}
.v-image:hover .play-mask .v-icon {
  opacity: 1;
  transform: scale(1);
}
.play-mask .v-icon {
  opacity: 0;
  transition: all 0.3s ease-out;
  transform: scale(2);
  color: rgba(255, 255, 255);
  width: 100%;
  height: 100%;
  z-index: 2;
  position: absolute;
}
.play-mask__background {
  top: 0px;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.4;
  z-index: 1;
  border-radius: 50%;
}
.viewer-mask {
  right: 0px;
  bottom: 0px;
}
.viewer-mask__container {
  position: relative;
  width: 70px;
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
  background: #b9b9b9;
  opacity: 0.8;
  z-index: 1;
  border-radius: 10px 0px 0px 0px;
}
.vod-brief__title * {
  font-weight: 900;
  font-size: 19px;
  color: #3e006f;
}
.vod-brief__name a,
.vod-brief__platform a {
  color: #737277;
}
.player .vod-brief__name a {
  color: #6f5ba3;
}
@media (max-width: 600px) {
  .vod-brief__content {
    font-size: 12px;
  }
  .vod-brief__title a {
    font-size: 14px;
  }
}
</style>
<style>
.f-vod-preview .v-image .v-image__image {
  transition: all 0.3s ease-out;
}
.f-vod-preview .v-image:hover .v-image__image {
  transform: scale(1.1);
}
</style>
