<template>
  <div class="f-stream-preview-placeholder">
    <v-img
      :style="{
        'background-color': imageBackgroundColor,
        'border-radius': `${imageBackgroundColor ? '15px' : undefined} ${
          imageBackgroundColor ? '15px' : undefined
        } 0px 0px`
      }"
      min-height="200px"
    ></v-img>
    <div
      class="stream-brief"
      :style="{
        'background-color': backgroundColor,
        'border-radius': `0px 0px  ${backgroundColor ? '15px' : undefined} ${
          backgroundColor ? '15px' : undefined
        }`
      }"
    >
      <v-avatar size="80px">
        <v-img :style="{ 'background-color': imageBackgroundColor }"></v-img>
      </v-avatar>
      <div class="stream-brief__content">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: "#eadbf8"
    },
    imageBackgroundColor: {
      type: String,
      default: "rgb(200, 200, 200)"
    }
  }
};
</script>
<style scoped>
.f-stream-preview-placeholder {
  grid-template-rows: auto 1fr;
  height: 100%;
}
.stream-brief {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-bottom: 20px;
  grid-column-gap: 5px;
}
.stream-brief .v-avatar {
  grid-column: 1/2;
  justify-self: center;
  align-self: center;
}
.stream-brief__content {
  grid-column: 2/-1;
}
.stream-brief__content > div {
  height: 18px;
  background: #737277;
  margin-top: 7px;
  width: 60%;
}
.stream-brief__content > div:first-child {
  background: #6f5ba3;
  width: 90%;
}
</style>
