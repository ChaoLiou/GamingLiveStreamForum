<template>
  <div class="f-block">
    <v-avatar
      class="f-block__icon"
      :size="$vuetify.breakpoint.xs ? '42px' : '60px'"
    >
      <v-img :src="icon"></v-img>
    </v-avatar>
    <f-block-title
      :icon="icon"
      :tabs="tabs"
      :text="title"
      :to="to"
      :more="more"
      :more-title="moreTitle"
      :font-size="fontSize"
      :line-height="lineHeight"
      :content-left-margin="contentLeftMargin"
      :content-right-margin="contentRightMargin"
      :background-color="backgroundColor"
      @tab-change="index => $emit('tab-change', index)"
    ></f-block-title>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import FBlockTitle from "@/components/FBlock/FBlockTitle";
export default {
  components: {
    FBlockTitle
  },
  props: {
    title: {
      type: String,
      default: "Title"
    },
    to: {
      type: String,
      default: "#"
    },
    more: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: "#f2ecf6"
    },
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    fontSize: {
      type: Number,
      default: 30
    },
    lineHeight: {
      type: Number,
      default: 5
    },
    moreTitle: {
      type: String,
      default: undefined
    },
    icon: {
      type: String,
      default: ""
    },
    contentLeftMargin: {
      type: Number,
      default: 38
    },
    contentRightMargin: {
      type: Number,
      default: 10
    }
  }
};
</script>
<style scoped>
.f-block {
  position: relative;
}
.content {
  display: grid;
  padding: 0px 0px 40px 0px;
  border-radius: 5px;
}
.f-block__icon {
  position: absolute;
  z-index: 3;
  left: 0px;
  top: -15px;
}
@media (max-width: 600px) {
  .content {
    padding-bottom: 20px;
  }
}
</style>
