<template>
  <div class="f-block-box">
    <f-block-box-title
      :background-color="backgroundColor"
      :text="title"
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
