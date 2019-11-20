<template>
  <div class="f-home-stream-preview">
    <v-card class="stream-preview__container">
      <div class="stream-frame__block" v-show="frameLoaded && player">
        <div class="stream-frame__shadow"></div>
        <f-link :link="streamLink">
          <div class="stream-frame__info stream-brief">
            <v-avatar size="96px" tile>
              <v-img :src="logoImageSource"></v-img>
            </v-avatar>
            <div class="stream-brief__content">
              <div class="stream-brief__title text-truncate" :title="stream.title">
                <a>{{ stream.title }}</a>
              </div>
              <div class="stream-brief__name text-truncate" :title="stream.streamer_name">
                <a>{{ stream.streamer_name }}</a>
              </div>
              <div class="stream-brief__game text-truncate" :title="stream.game">
                <a>{{ stream.game }}</a>
              </div>
              <div class="stream-brief__platform text-truncate" :title="stream.platform">
                <a>{{ stream.platform }}</a>
              </div>
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
          <f-link
            class="stream-link"
            :link="streamLink"
            :style="{ right: right ? '0px' : undefined }"
          >
            <v-avatar tile>
              <v-img :src="logoImageSource"></v-img>
            </v-avatar>
          </f-link>
        </f-image-preview>
      </f-link>
    </v-card>
  </div>
</template>
<script>
import FLink from "@/components/FLink";
import FImagePreview from "@/components/FImagePreview";
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
.v-avatar {
  margin: 10px;
}
.stream-frame__shadow {
  width: 100%;
  height: 125px;
  position: absolute;
  z-index: 3;
  background: linear-gradient(180deg, black, 80%, transparent);
  opacity: 0.5;
  border-radius: 15px 15px 0px 0px;
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
  grid-template-columns: 116px calc(100% - 116px);
}
.stream-brief > div {
  margin: 5px;
}
.stream-brief__title a {
  font-weight: 900;
  font-size: 22px;
  color: white;
}
.stream-brief__name a,
.stream-brief__game a,
.stream-brief__platform a {
  font-size: 19px;
  color: white;
}
.stream-brief__content a {
  text-decoration: none;
}
.stream-brief__content > div {
  margin-bottom: 2px;
  height: 23px;
}
.stream-brief__content > div:first-child {
  height: 26px;
}
.stream-frame__info,
.stream-frame__shadow {
  display: none;
}
.stream-frame__block:hover .stream-frame__info,
.stream-frame__block:hover .stream-frame__shadow {
  display: grid;
}
.f-link {
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
}
.f-image-preview {
  border-radius: 15px;
}
</style>
