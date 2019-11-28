<template>
  <div
    class="f-home-stream-carousel"
    :style="{
      width: `${(streams.length - 1) * gap + width}px`,
      height: `${height}px`,
      'margin-top': $vuetify.breakpoint.xl ? '-80px' : '0px'
    }"
  >
    <v-btn
      large
      icon
      class="slide-btn slide-btn__prev"
      dark
      @click="moveTo(false)"
    >
      <v-icon large>keyboard_arrow_left</v-icon>
    </v-btn>
    <v-btn
      large
      icon
      class="slide-btn slide-btn__next"
      dark
      @click="moveTo(true)"
    >
      <v-icon large>keyboard_arrow_right</v-icon>
    </v-btn>
    <div class="stream-preview__container">
      <f-home-stream-preview
        ref="streams"
        :style="{
          left: getLeftStyle(item.index),
          'z-index': getZIndexStyle(item.index),
          width: getWidthStyle(item.index),
          height: getHeightStyle(item.index),
          top: getTopStyle(item.index)
        }"
        v-for="(item, index) in fstreams"
        :key="index"
        :player="item.player"
        :stream="item"
        :width="width"
        :height="height"
        :right="item.index > middleIndex"
      ></f-home-stream-preview>
    </div>
  </div>
</template>
<script>
import FHomeStreamPreview from "@/components/FHomeStreamPreview";
export default {
  components: {
    FHomeStreamPreview
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
      fstreams: [],
      gap: 60,
      width: this.$vuetify.breakpoint.xl ? 1092 : 764,
      height: this.$vuetify.breakpoint.xl ? 615 : 430
    };
  },
  computed: {
    weights() {
      return this.streams.map((x, i) =>
        i <= this.middleIndex ? i : this.streams.length - i - 1
      );
    },
    middleIndex() {
      return Math.floor(this.streams.length / 2);
    },
    sequence() {
      let result = [1];
      for (let i = 0; i < this.middleIndex; i++) {
        result = this.computedSequence(result);
      }
      return result;
    }
  },
  watch: {
    streams(value) {
      const fstreams = Array.apply(null, {
        length: this.sequence.length
      }).map(x => ({}));
      const sequence = this.sequence;
      value
        .map((x, i) => ({
          ...x,
          index: i
        }))
        .forEach(x => {
          const index = sequence[x.index] - 1;
          return (fstreams[index] = {
            ...x,
            index,
            player: index === this.middleIndex
          });
        });
      this.fstreams = fstreams;
    }
  },
  methods: {
    computedSequence(sequence) {
      let result = sequence.map((x, i) => x + 1);
      result.push(1);
      result.push(sequence.length + 2);
      return result;
    },
    getZIndexStyle(index) {
      return this.weights.map(x => ++x)[index];
    },
    getLeftStyle(index) {
      return index <= this.middleIndex
        ? `${index * this.gap}px`
        : `${index * this.gap +
            this.getWidth(this.middleIndex) -
            this.getWidth(index)}px`;
    },
    getHeightStyle(index) {
      return `${this.getHeight(index)}px`;
    },
    getHeight(index) {
      return Math.ceil(
        this.height - (Math.abs(this.middleIndex - index) * 2 * this.gap) / 3
      );
    },
    getWidthStyle(index) {
      return `${this.getWidth(index)}px`;
    },
    getWidth(index) {
      return Math.ceil((this.getHeight(index) * this.width) / this.height);
    },
    getTopStyle(index) {
      return `${((this.middleIndex - this.weights[index]) * this.gap) / 3}px`;
    },
    moveTo(prev) {
      this.fstreams.forEach(x => {
        if (prev && x.index === 0) {
          x.index = this.fstreams.length - 1;
        } else if (!prev && x.index === this.fstreams.length - 1) {
          x.index = 0;
        } else {
          x.index += prev ? -1 : 1;
        }
        x.player = x.index === this.middleIndex;
      });
    }
  }
};
</script>
<style scoped>
.f-home-stream-carousel {
  position: relative;
  height: 100%;
}
.slide-btn {
  position: absolute;
  top: calc(50% - 22px);
  background-color: #b498f0;
  z-index: 1;
}
.slide-btn__prev {
  left: 0px;
  margin-left: -66px;
}
.slide-btn__next {
  right: 0px;
  margin-right: -66px;
}
.stream-preview__container > div {
  -webkit-transition: all 0.45s cubic-bezier(0.25, 0.8, 0.5, 1);
  -moz-transition: all 0.45s cubic-bezier(0.25, 0.8, 0.5, 1);
  -o-transition: all 0.45s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: all 0.45s cubic-bezier(0.25, 0.8, 0.5, 1);
  position: absolute;
}
</style>
