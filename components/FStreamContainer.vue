<template>
  <div :class="['f-stream-container', narrow ? 'narrow' : '']">
    <div
      class="stream-grid"
      :style="{ 'grid-template-columns': `repeat(${maxCol}, 1fr)` }"
    >
      <template v-if="streams.length > 0">
        <f-stream-preview
          v-for="(item, index) in streams"
          :preview-image-ratio="previewImageRatio"
          :key="index"
          :stream="item"
          background-color="#eadbf8"
        ></f-stream-preview>
      </template>
      <template v-else>
        <f-stream-preview-placeholder
          v-for="(item, index) in 4"
          :available="available"
          :key="index"
        ></f-stream-preview-placeholder>
      </template>
    </div>
    <div v-if="!available" class="unavailable-viewing-tips">
      <div>
        该直播平台仅限中国台湾或中国香港等区域播放
      </div>
      <div>请转换您的IP至对应区域进行观赏</div>
    </div>
  </div>
</template>
<script>
import FStreamPreview from "@/components/FStreamPreview";
import FStreamPreviewPlaceholder from "@/components/FStreamPreviewPlaceholder";
export default {
  components: {
    FStreamPreview,
    FStreamPreviewPlaceholder
  },
  props: {
    narrow: {
      type: Boolean,
      default: false
    },
    available: {
      type: Boolean,
      default: true
    },
    streams: {
      type: Array,
      default() {
        return [];
      }
    },
    maxCol: {
      type: Number,
      default: 4
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
.f-stream-container {
  position: relative;
}
.stream-grid {
  margin: auto;
  margin-top: 10px;
  display: grid;
  grid-gap: 15px;
}
.unavailable-viewing-tips {
  border-radius: 10px;
  display: grid;
  justify-items: center;
  position: absolute;
  font-weight: bold;
  padding: 30px;
  top: calc(50% - 83px);
  left: calc(50% - 281px);
  z-index: 2;
  background: white;
  font-size: 22px;
  border: 20px solid #eadbf8;
  box-shadow: 5px 8px 5px 3px rgba(0, 0, 0, 0.4);
}
@media (max-width: 1280px) {
  .stream-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
@media (max-width: 1367px) {
  .narrow .stream-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>
