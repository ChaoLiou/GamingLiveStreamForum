<template>
  <div class="f-block-box-title">
    <div class="bar" :style="barStyles">
      <div class="background" :style="backgroundStyles"></div>
      <div class="mask" :style="maskStyles"></div>
      <div class="rectangle" :style="rectangleStyles"></div>
      <svg
        class="triangle"
        :style="triangleStyles"
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
      <div class="content" :style="contentStyles">
        <nuxt-link :to="to">{{ text }}</nuxt-link>
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
    triangleStyles() {
      return {
        left: `${this.titleWidth}px`,
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
    backgroundStyles() {
      return { height: `${this.height}px` };
    },
    maskStyles() {
      return { left: `${this.titleWidth + 30}px`, height: `${this.height}px` };
    },
    contentStyles() {
      return {
        "font-size": `${this.fontSize}px`,
        padding: `5px ${this.contentRightMargin}px 0px ${this.contentLeftMargin}px`
      };
    },
    barStyles() {
      return { height: `${this.height + 3}px` };
    }
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
  z-index: 4;
}
.rectangle {
  background: linear-gradient(180deg, #66448e, 70%, #e7d6fa);
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 2;
}
.content a {
  text-decoration: none;
  color: white;
}
.triangle {
  top: 0px;
  position: absolute;
  z-index: 3;
  /* border-bottom: 1px rgb(0, 0, 0, 0.5) solid; */
}
</style>
