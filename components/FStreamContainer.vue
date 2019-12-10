<template>
  <div class="f-stream-container">
    <div class="stream-grid">
      <f-stream-preview
        v-for="(item, index) in streams"
        :preview-image-ratio="previewImageRatio"
        :key="index"
        :stream="item"
        background-color="#eadbf8"
      ></f-stream-preview>
    </div>
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
      previewImageRatio: 2 / 5
    };
  }
};
</script>
<style scoped>
.stream-grid {
  margin: auto;
  margin-top: 10px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 1264px) {
  .stream-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
