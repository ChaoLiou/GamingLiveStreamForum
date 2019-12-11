<template>
  <div class="f-home-stream-preview-mobile">
    <v-card class="stream-preview__container">
      <div class="stream-frame__block">
        <div class="stream-frame__shadow"></div>
        <f-link :link="streamLink">
          <div class="stream-frame__info stream-brief">
            <v-avatar size="40px">
              <v-img :src="logoImageSource"></v-img>
            </v-avatar>
            <div class="stream-brief__content">
              <div
                class="stream-brief__title text-truncate"
                :title="stream.title"
              >
                <a>{{ stream.title }}</a>
              </div>
              <div
                class="stream-brief__name text-truncate"
                :title="stream.streamer_name"
              >
                <a>{{ stream.streamer_name }}</a>
              </div>
              <!-- <div
                class="stream-brief__game text-truncate"
                :title="stream.game"
              >
                <a>{{ stream.game }}</a>
              </div> -->
              <!-- <div
                class="stream-brief__platform text-truncate"
                :title="stream.platform"
              >
                <a>{{ stream.platform }}</a>
              </div> -->
            </div>
          </div>
        </f-link>
      </div>
      <iframe
        v-show="frameLoaded && player && !stream.externalLink"
        ref="frame"
        :src="streamSource"
        height="100%"
        width="100%"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true"
      ></iframe>
      <f-link :link="streamLink">
        <f-image-preview :image="imageSource">
          <f-link class="stream-link" :link="streamLink">
            <v-avatar tile>
              <v-img :src="logoImageSource"></v-img>
            </v-avatar>
          </f-link>
          <div class="fixed-mask viewer-mask">
            <div class="viewer-mask__container">
              <div class="viewer-mask__content">
                {{ viewers }}{{ $t("fStreamPreview.viewers_unit") }}
              </div>
              <div class="viewer-mask__background"></div>
            </div>
          </div>
        </f-image-preview>
      </f-link>
    </v-card>
  </div>
</template>
<script>
import FLink from "@/components/FLink";
import FImagePreview from "@/components/FImagePreview";
import formatter from "@/assets/utils/formatter";
import helper from "@/assets/utils/helper";
export default {
  components: {
    FLink,
    FImagePreview
  },
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
      default: 300
    },
    height: {
      type: Number,
      default: 169
    }
  },
  data() {
    return {
      frameLoaded: false
    };
  },
  computed: {
    viewers() {
      return formatter.fviewers(
        this.stream.viewers
          ? this.stream.viewers
          : Math.floor(helper.random(1800, 3100))
      );
    },
    streamLink() {
      return `/stream/${this.stream.platform}/${this.stream.id}`;
    },
    streamSource() {
      return this.player ? this.stream.source : "about:blank";
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
  border-radius: 5px;
}
.stream-preview__container > * {
  border-radius: 5px;
  position: absolute;
  left: 0;
  top: 0;
}
.stream-preview__container iframe {
  border-radius: 5px;
  z-index: 2;
}
.stream-link {
  position: absolute;
}
.stream-link .v-image {
  z-index: 1;
}
.v-avatar {
  margin: 10px;
}
.stream-frame__shadow {
  width: 100%;
  height: 50px;
  position: absolute;
  z-index: 3;
  background: linear-gradient(180deg, black, 80%, transparent);
  opacity: 0.8;
  border-radius: 5px 5px 0px 0px;
}
.stream-frame__info {
  width: 100%;
  height: 125px;
  position: absolute;
  z-index: 4;
}
.stream-frame__block {
  width: 100%;
  height: 125px;
  position: absolute;
  z-index: 4;
  cursor: pointer;
}
.stream-brief {
  display: grid;
  grid-template-columns: 50px calc(100% - 50px);
  justify-self: center;
}
.stream-brief > div {
  margin: 5px;
}
.stream-brief__title a {
  font-weight: 900;
  font-size: 14px;
  color: white;
}
.stream-brief__name a,
.stream-brief__game a,
.stream-brief__platform a {
  font-size: 12px;
  color: white;
}
.stream-brief__content a {
  text-decoration: none;
}
.stream-brief__content > div {
  margin-bottom: 2px;
  height: 14px;
}
.stream-brief__content > div:first-child {
  height: 16px;
}
.stream-frame__info,
.stream-frame__shadow {
  display: grid;
}
.f-link {
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
}
.f-image-preview {
  border-radius: 5px;
}
.fixed-mask {
  position: absolute;
}
.viewer-mask {
  right: 0px;
  bottom: 0px;
}
.viewer-mask__container {
  position: relative;
  width: 110px;
  height: 25px;
}
.viewer-mask__container > div {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.viewer-mask__content {
  padding: 2px 10px;
  z-index: 2;
  color: black;
  font-size: 12px;
}
.viewer-mask__background {
  background: #b9b9b9;
  opacity: 0.8;
  z-index: 1;
  border-radius: 10px 0px 0px 0px;
}
</style>
