<template>
  <div class="f-block-box">
    <f-block-box-title
      :background-color="backgroundColor"
      :text="title"
      :second-text="secondTitle"
      :tab="tab"
      @click="tab => $emit('click', tab)"
    ></f-block-box-title>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import FBlockBoxTitle from "@/components/FBlockBox/FBlockBoxTitle";
export default {
  components: {
    FBlockBoxTitle
  },
  props: {
    title: {
      type: String,
      default: "Title"
    },
    backgroundColor: {
      type: String,
      default: "#fafafa"
    },
    tab: {
      type: Boolean,
      default: false
    },
    secondTitle: {
      type: String,
      default: "Title-2"
    },
    secondTo: {
      type: String,
      default: "#"
    }
  }
};
</script>
<style scoped>
.content {
  border: 1px rgb(0, 0, 0, 0.5) solid;
  border-top: none;
  padding: 10px;
}
</style>
