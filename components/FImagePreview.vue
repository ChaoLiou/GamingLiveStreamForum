<template>
  <v-img class="f-image-preview" :src="image">
    <slot></slot>
    <div class="fixed-mask play-mask">
      <v-img class="v-icon" src="/misc_icons/play_circle_outline.svg"></v-img>
      <div class="fixed-mask play-mask__background"></div>
    </div>
    <div class="fixed-mask live-mask">LIVE</div>
  </v-img>
</template>
<script>
export default {
  props: {
    image: {
      type: String,
      default: ""
    }
  }
};
</script>
<style scoped>
.v-image {
  height: 100%;
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
.live-mask {
  font-weight: bold;
  top: 0px;
  left: 0px;
  background: white;
  color: red;
  border: 2px red solid;
  padding: 0px 2px;
  height: 18px;
  line-height: 14px;
  margin: 10px;
}
</style>
<style>
.f-image-preview.v-image .v-image__image {
  transition: all 0.3s ease-out;
}
.f-image-preview.v-image:hover .v-image__image {
  transform: scale(1.1);
}
</style>
