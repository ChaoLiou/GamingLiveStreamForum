<template>
  <v-btn
    v-if="left || right"
    :class="['slide-btn', left ? 'slide-btn__left' : 'slide-btn__right']"
    large
    icon
    dark
    @click="$emit('slide')"
  >
    <v-icon large>{{left ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}}</v-icon>
  </v-btn>
</template>
<script>
export default {
  props: {
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style scoped>
.slide-btn::before,
.slide-btn {
  width: 33px !important;
  height: 100px !important;
  border-radius: 5px !important;
}
.slide-btn {
  position: absolute;
  top: 50%;
  background-color: #b498f0;
  z-index: 2;
}
.slide-btn__left {
  left: 0px;
}
.slide-btn__right {
  right: 0px;
}
</style>
