<template>
  <div class="f-home-stream-carousel-mobile">
    <div class="carousel-grid">
      <f-home-stream-preview-mobile
        v-for="(item, index) in fstreams"
        :key="index"
        :player="item.player"
        :stream="item"
      ></f-home-stream-preview-mobile>
    </div>
  </div>
</template>
<script>
import FHomeStreamPreviewMobile from "@/components/FHomeStreamPreviewMobile";
export default {
  components: {
    FHomeStreamPreviewMobile
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
      fstreams: []
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
    }
  }
};
</script>
<style scoped>
.f-home-stream-carousel-mobile {
  max-width: 100vw;
  overflow-x: scroll;
  overflow-y: hidden;
}
.carousel-grid {
  display: grid;
  grid-template-columns: repeat(5, calc(100vw - 60px));
  grid-gap: 10px;
  height: calc((100vw - 60px) * 9 / 16);
}
</style>
