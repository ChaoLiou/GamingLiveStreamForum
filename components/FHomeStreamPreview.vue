<template>
  <div class="f-home-stream-preview">
    <v-card class="stream-preview__container">
      <iframe
        v-show="frameLoaded && player"
        ref="frame"
        :src="streamSource"
        height="100%"
        width="100%"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true"
      ></iframe>
      <v-img width="100%" height="100%" :src="imageSource">
        <nuxt-link
          class="stream-link"
          :to="streamLink"
          target="_blank"
          :style="{ right: right ? '0px' : undefined }"
        >
          <v-avatar tile>
            <v-img :src="logoImageSource"></v-img>
          </v-avatar>
        </nuxt-link>
      </v-img>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    stream: {
      type: Object,
      default() {
        return {};
      }
    },
    player: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    right: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      frameLoaded: false
    };
  },
  computed: {
    streamLink() {
      return `/stream/${this.stream.platform}/${this.stream.id}`;
    },
    streamSource() {
      return this.stream.source;
    },
    imageSource() {
      return this.stream.preview
        ? this.stream.preview
            .replace("{width}", this.width)
            .replace("{height}", this.height)
        : "";
    },
    logoImageSource() {
      return this.stream.streamer_image;
    }
  },
  watch: {
    player(value) {
      this.frameLoaded = !value;
      if (this.$refs && this.$refs.frame) {
        this.$refs.frame.src = value ? this.streamSource : "about:blank";
      }
    }
  },
  mounted() {
    if (this.$refs && this.$refs.frame) {
      this.$refs.frame.onload = () => {
        this.frameLoaded = true;
      };
    }
  }
};
</script>
<style scoped>
.stream-preview__container {
  background: linear-gradient(0deg, #d6d5d5, white);
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 15px;
}
.stream-preview__container > * {
  border-radius: 15px;
  position: absolute;
  left: 0;
  top: 0;
}
.stream-preview__container iframe {
  border-radius: 15px;
  z-index: 2;
}
.stream-link {
  position: absolute;
}
.stream-link .v-image {
  z-index: 1;
}
.stream-link .v-avatar {
  margin: 10px;
}
</style>
