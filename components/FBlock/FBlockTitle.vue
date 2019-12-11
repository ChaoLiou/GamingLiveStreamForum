<template>
  <div class="f-block-title">
    <div class="bar" :style="barStyles">
      <div class="background" :style="backgroundStyles"></div>
      <div class="background-line" :style="backgroundLineStyles"></div>
      <div class="triangle" :style="triangleStyles"></div>
      <div class="rectangle" :style="rectangleStyles"></div>
      <div class="content" :style="contentStyles">
        <div v-if="tabs.length > 0" @click="tabChange(-1)">{{ text }}</div>
        <nuxt-link v-else :to="to">{{ text }}</nuxt-link>
      </div>
      <div class="more" v-if="more" :style="moreLinkStyles">
        <nuxt-link :to="to"
          >{{ moreTitle ? moreTitle : $t("fBlockTitle.see_more") }}></nuxt-link
        >
      </div>
      <div v-else class="tab-bar" :style="tabBarStyles">
        <div class="tab-container" :style="tabContainerStyles">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{ selected: selectedIndex === index }"
            :style="getTabStyles(index)"
          >
            <div class="tab__left-trangle" :style="tabLeftTriangleStyles"></div>
            <div
              class="tab__content"
              :style="tabContentStyles"
              @click="tabChange(index)"
            >
              {{ tab }}
            </div>
            <div
              class="tab__right-trangle"
              :style="tabRightTriangleStyles"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: "Title"
    },
    to: {
      type: String,
      default: "#"
    },
    backgroundColor: {
      type: String,
      default: "#fafafa"
    },
    contentLeftMargin: {
      type: Number,
      default: 38
    },
    contentRightMargin: {
      type: Number,
      default: 10
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
    more: {
      type: Boolean,
      default: false
    },
    moreTitle: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tabColor: "#8e75ae",
      barMarginLeft: 30,
      selectedIndex: -1
    };
  },
  computed: {
    whiteBarHeight() {
      return this.height - this.lineHeight;
    },
    height() {
      return this.fontSize + this.fontSize / 2;
    },
    contentMargin() {
      return this.contentLeftMargin + this.contentRightMargin;
    },
    titleWidth() {
      return (
        this.fontSize * (this.text.length < 5 ? this.text.length : 5) +
        this.contentMargin
      );
    },
    triangleStyles() {
      return {
        "border-width": `0 ${this.triangleWidth}px ${this.whiteBarHeight}px 0`,
        left: `${this.titleWidth}px`,
        "border-color": `transparent ${this.backgroundColor} transparent transparent`
      };
    },
    trangleSlope() {
      return this.triangleWidth / this.whiteBarHeight;
    },
    rectangleStyles() {
      return {
        width: `calc(100% - ${this.titleWidth +
          this.triangleWidth +
          (this.icon ? this.barMarginLeft : 0)}px)`,
        left: `${this.titleWidth + this.triangleWidth}px`,
        height: `${this.whiteBarHeight}px`,
        "background-color": `${this.backgroundColor}`
      };
    },
    backgroundStyles() {
      return {
        height: `${this.height}px`,
        width: `${this.titleWidth + this.triangleWidth}px`
      };
    },
    backgroundLineStyles() {
      return {
        height: `${this.height}px`,
        width: `calc(100% - ${this.titleWidth +
          this.triangleWidth +
          (this.icon ? this.barMarginLeft : 0)}px)`,
        left: `${this.titleWidth + this.triangleWidth}px`
      };
    },
    contentStyles() {
      return {
        "font-size": `${this.fontSize}px`,
        margin: `0px ${this.contentRightMargin}px 0px ${this.contentLeftMargin}px`
      };
    },
    barStyles() {
      return {
        height: `${this.height}px`,
        "margin-left": this.icon ? `${this.barMarginLeft}px` : undefined,
        width: `calc(100% - ${this.icon ? this.barMarginLeft : 0}px - 1px)`
      };
    },
    tabBarStyles() {
      return {
        left: `${this.titleWidth + this.triangleWidth}px`,
        "font-size": `${this.fontSize}px`
      };
    },
    tabContainerStyles() {
      return {
        display: "grid",
        "grid-template-columns": `repeat(${this.tabs.length}, 1fr)`
      };
    },
    tabLeftTriangleStyles() {
      return {
        "border-width": `0 ${Math.ceil(
          this.trangleSlope * (this.whiteBarHeight - this.lineHeight)
        )}px ${this.whiteBarHeight - this.lineHeight}px 0`,
        "border-color": `transparent ${this.tabColor} transparent transparent`
      };
    },
    tabContentStyles() {
      return {
        "background-color": this.tabColor,
        height: `${this.whiteBarHeight - this.lineHeight}px`,
        "line-height": `${this.whiteBarHeight - this.lineHeight}px`
      };
    },
    tabRightTriangleStyles() {
      return {
        "border-width": `${this.whiteBarHeight -
          this.lineHeight}px 0 0 ${Math.ceil(
          this.trangleSlope * (this.whiteBarHeight - this.lineHeight)
        )}px`,
        "border-color": `transparent transparent transparent ${this.tabColor}`
      };
    },
    triangleWidth() {
      return this.whiteBarHeight - this.fontSize / 2;
    },
    moreLinkStyles() {
      return {
        left: `${this.titleWidth + this.triangleWidth}px`,
        height: `${this.whiteBarHeight}px`
      };
    }
  },
  methods: {
    tabChange(index) {
      this.selectedIndex = index;
      this.$emit("tab-change", index);
    },
    getTabStyles(index) {
      return {
        "margin-left": `-${
          index ? (this.fontSize * 7) / 10 : (this.fontSize * 5) / 7
        }px`,
        "grid-template-columns": `${Math.ceil(
          this.trangleSlope * (this.whiteBarHeight - this.lineHeight)
        )}px ${this.fontSize * 2 + 1}px ${Math.ceil(
          this.trangleSlope * (this.whiteBarHeight - this.lineHeight)
        )}px`
      };
    }
  }
};
</script>
<style scoped>
.bar {
  display: block;
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}
.background {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  background: linear-gradient(90deg, #7e13ec, #af25dd);
  z-index: 1;
}
.background-line {
  position: absolute;
  top: 0px;
  width: 100%;
  background-color: #5e3b8b;
  z-index: 1;
}
.content {
  position: absolute;
  top: 0px;
  left: 0px;
  display: grid;
  z-index: 2;
}
.content * {
  text-decoration: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
}
.triangle {
  top: 0px;
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  z-index: 2;
}
.rectangle {
  top: 0px;
  position: absolute;
  z-index: 2;
}
.tab-bar {
  position: absolute;
  z-index: 3;
}
.tab-container {
  position: relative;
}
.tab-container > div {
  color: white;
  display: grid;
}
.tab-container > div {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.tab-container > div:hover {
  margin-top: -4px;
  margin-right: 2px;
}
.selected > .tab__content {
  background: #7b3bae !important;
}
.selected > .tab__left-trangle {
  border-color: transparent #7b3bae transparent transparent !important;
}
.selected > .tab__right-trangle {
  border-color: transparent transparent transparent #7b3bae !important;
}
.tab__content {
  text-align: center;
  cursor: pointer;
}
.tab__content:hover {
  color: #f7a12f;
}
.tab__left-trangle,
.tab__right-trangle {
  width: 0;
  height: 0;
  border-style: solid;
}
.more {
  position: absolute;
  z-index: 2;
  display: grid;
  align-items: end;
}
.more a {
  text-decoration: none;
  font-size: 24px;
  color: #5e3b8b;
  font-weight: bold;
}
@media (max-width: 600px) {
  .more a {
    font-size: 14px;
  }
}
</style>
