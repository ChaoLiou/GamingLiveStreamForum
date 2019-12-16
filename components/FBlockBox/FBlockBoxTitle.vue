<template>
  <div class="f-block-box-title">
    <div class="bar" :style="barStyles">
      <div class="background" :style="backgroundStyles"></div>
      <div class="mask" :style="maskStyles"></div>
      <div class="rectangle" :style="rectangleStyles"></div>
      <div v-if="tab" class="rectangle second" :style="rectangleStyles2"></div>
      <svg
        class="triangle"
        :style="svgStyles"
        viewBox="0 0 80 100"
        preserveAspectRatio="none"
      >
        <path
          d="M80,100
           L80,0
           C30,5 50,95 0,100z"
          :fill="tab ? 'url(#Gradient2)' : backgroundColor"
        />
        <defs>
          <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="41%" stop-color="purple" />
            <stop offset="100%" stop-color="#66448e" />
          </linearGradient>
        </defs>
      </svg>
      <div
        class="content"
        :style="contentStyles"
        @click="$emit('click', 'tab-1')"
      >
        <div>{{ text }}</div>
      </div>
      <svg
        v-if="tab"
        class="triangle"
        :style="svgStyles2"
        viewBox="0 0 80 100"
        preserveAspectRatio="none"
      >
        <path
          d="M80,100
           L80,0
           C30,5 50,95 0,100z"
          :fill="backgroundColor"
        />
      </svg>
      <div
        v-if="tab"
        class="content second"
        :style="contentStyles2"
        @click="$emit('click', 'tab-2')"
      >
        <div>{{ secondText }}</div>
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
    icon: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: "#"
    },
    backgroundColor: {
      type: String,
      default: "#fafafa"
    },
    tab: {
      type: Boolean,
      default: false
    },
    secondText: {
      type: String,
      default: "Title-2"
    },
    secondTo: {
      type: String,
      default: "#"
    }
  },
  data() {
    return {
      fontSize: 20,
      lineHeight: 0,
      contentLeftMargin: 10,
      contentRightMargin: 38
    };
  },
  computed: {
    whiteBarHeight() {
      return this.height - this.lineHeight;
    },
    height() {
      return this.fontSize + this.fontSize;
    },
    contentMargin() {
      return this.contentLeftMargin + this.contentRightMargin;
    },
    titleWidth() {
      return this.fontSize * this.text.length + this.contentMargin;
    },
    svgStyles() {
      return {
        left: `${this.titleWidth}px`,
        height: `${this.height}px`
      };
    },
    svgStyles2() {
      return {
        left: `${this.titleWidth * 2 + 20}px`,
        height: `${this.height}px`
      };
    },
    rectangleStyles() {
      return {
        width: `${this.titleWidth + 30}px`,
        height: `${this.height}px`,
        "background-color": this.backgroundColor
      };
    },
    rectangleStyles2() {
      return {
        left: `${this.titleWidth + 30}px`,
        width: `${this.titleWidth + 20}px`,
        height: `${this.height}px`,
        "background-color": "purple"
      };
    },
    backgroundStyles() {
      return { height: `${this.height}px` };
    },
    maskStyles() {
      return { left: `${this.titleWidth + 20}px`, height: `${this.height}px` };
    },
    contentStyles() {
      return {
        "font-size": `${this.fontSize}px`,
        padding: `5px ${this.contentRightMargin}px 0px ${this.contentLeftMargin}px`
      };
    },
    contentStyles2() {
      return {
        "font-size": `${this.fontSize}px`,
        padding: `5px ${this.contentRightMargin}px 0px ${this.titleWidth +
          this.contentLeftMargin +
          30}px`
      };
    },
    barStyles() {
      return { height: `${this.height + 3}px` };
    }
  },
  mounted() {
    this.$emit("click", "tab-1");
  }
};
</script>
<style scoped>
.bar {
  display: block;
  position: relative;
  color: white;
  width: 100%;
  border: 1px rgb(0, 0, 0, 0.5) solid;
}
.background {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 1;
}
.mask {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 4;
}
.content {
  position: absolute;
  top: 0px;
  left: 0px;
  display: grid;
  z-index: 5;
  cursor: pointer;
}
.content.second {
  z-index: 4;
}
.rectangle {
  background: linear-gradient(180deg, #66448e, 70%, #e7d6fa);
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 2;
}
.rectangle.second {
  background: linear-gradient(180deg, purple, 70%, #66448e);
  z-index: 1;
}
.triangle {
  top: 0px;
  position: absolute;
  z-index: 3;
}
</style>
