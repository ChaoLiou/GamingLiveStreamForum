<template>
  <div class="f-stream-viewers">
    <div class="stream-viewers__container">
      <div class="stream-viewers__front">{{fviewers(viewers)}}</div>
      <div class="stream-viewers__back"></div>
    </div>
  </div>
</template>
<script>
import formatter from "@/assets/utils/formatter";
export default {
  props: {
    viewers: {
      type: Number,
      default: 0
    }
  },
  data() {
    return { fviewers: formatter.fviewers };
  }
};
</script>
<style scoped>
.f-stream-viewers {
  position: absolute;
  right: 0px;
  bottom: 0px;
}
.stream-viewers__container {
  position: relative;
  width: 70px;
  height: 25px;
}
.stream-viewers__front,
.stream-viewers__back {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.stream-viewers__front {
  padding: 2px 10px;
  z-index: 2;
  color: black;
}
.stream-viewers__back {
  background: white;
  opacity: 0.8;
  z-index: 1;
  border-radius: 15px 0px 0px 0px;
}
</style>
