<template>
  <div :class="['f-stream-preview', player ? 'player': '' ]">
    <iframe
      ref="frame"
      v-if="player"
      :src="streamSource"
      height="100%"
      width="100%"
      frameborder="0"
      scrolling="no"
      allowfullscreen="true"
    ></iframe>
    <template v-else>
      <a v-if="toExternal" :href="stream.externalLink" target="_blank">
        <v-img
          lazy
          :src="imageSource"
          contain
          :style="{ 'background-color': backgroundColor, 'border-radius': `${backgroundColor ? '15px' : undefined } ${backgroundColor ? '15px' : undefined } 0px 0px` }"
        >
          <div class="fixed-mask play-mask">
            <v-icon large>play_circle_outline</v-icon>
            <div class="fixed-mask play-mask__background"></div>
          </div>
          <div class="fixed-mask live-mask">Live</div>
          <div class="fixed-mask viewer-mask">
            <div class="viewer-mask__container">
              <div class="viewer-mask__content">{{viewers}}位觀眾</div>
              <div class="viewer-mask__background"></div>
            </div>
          </div>
        </v-img>
      </a>
      <nuxt-link v-else :to="streamLink" target="_blank">
        <v-img
          lazy
          :src="imageSource"
          contain
          :style="{ 'background-color': backgroundColor, 'border-radius': `${backgroundColor ? '15px' : undefined } ${backgroundColor ? '15px' : undefined } 0px 0px` }"
        >
          <div class="fixed-mask play-mask">
            <v-icon large>play_circle_outline</v-icon>
            <div class="fixed-mask play-mask__background"></div>
          </div>
          <div class="fixed-mask live-mask">Live</div>
          <div class="fixed-mask viewer-mask">
            <div class="viewer-mask__container">
              <div class="viewer-mask__content">{{viewers}}位觀眾</div>
              <div class="viewer-mask__background"></div>
            </div>
          </div>
        </v-img>
      </nuxt-link>
    </template>
    <div
      :style="{ 'background-color': backgroundColor, 'border-radius': `0px 0px  ${backgroundColor ? '15px' : undefined } ${backgroundColor ? '15px' : undefined }` }"
    >
      <div class="stream-brief">
        <v-avatar size="80px">
          <v-img :src="stream.streamer_image"></v-img>
        </v-avatar>
        <div class="stream-brief__content">
          <div v-if="!player" class="stream-brief__title text-truncate" :title="stream.title">
            <a v-if="toExternal" :href="stream.externalLink" target="_blank">{{stream.title}}</a>
            <nuxt-link v-else :to="streamLink" target="_blank">{{stream.title}}</nuxt-link>
          </div>
          <div class="stream-brief__name text-truncate" :title="stream.streamer_name">
            <a>{{stream.streamer_name}}</a>
          </div>
          <div class="stream-brief__game text-truncate" :title="game">
            <a>{{game}}</a>
          </div>
          <div class="stream-brief__platform text-truncate" :title="platform">
            <a>{{platform}}</a>
          </div>
          <div v-if="player" class="stream-brief__viewers">{{viewers}}位觀眾</div>
        </div>
      </div>
      <div class="stream-tags">
        <span class="tag" v-for="(tag, index) in tags.slice(0, player ? 2 : 2)" :key="index">{{tag}}</span>
      </div>
      <div v-if="player" class="stream-description">{{stream.description}}</div>
    </div>
  </div>
</template>
<script>
import formatter from "@/assets/utils/formatter";
import games from "@/assets/json/games";
import platforms from "@/assets/json/platforms";
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
    backgroundColor: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      streamer: {},
      rawTags: [],
      width: 530,
      height: 300
    };
  },
  computed: {
    viewers() {
      return formatter.fviewers(this.stream.viewers);
    },
    tags() {
      return this.stream.tags
        ? this.stream.tags
            .map(t =>
              t.localization_names ? t.localization_names["zh-tw"] : t
            )
            .filter(t => !!t)
        : [];
    },
    toExternal() {
      return this.stream.platform === "bilibili";
    },
    streamLink() {
      return `/stream/${this.stream.platform}/${this.stream.id}`;
    },
    imageSource() {
      return this.stream.preview
        ? this.stream.preview
            .replace("{width}", this.width)
            .replace("{height}", this.height)
        : "";
    },
    streamSource() {
      return this.stream.source;
    },
    game() {
      const target = games.find(x => x.id === this.stream.game);
      return target ? target.title : this.stream.game;
    },
    platform() {
      const target = platforms.find(x => x.id === this.stream.platform);
      return target ? target.title : this.stream.platform;
    }
  },
  mounted() {},
  methods: {
    turnPlayer(on) {
      this.$refs.frame.src = on ? this.streamSource : "about:blank";
    }
  }
};
</script>
<style scoped>
.f-stream-preview {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
}
.f-stream-preview.player {
  grid-template-columns: 53fr 20fr;
  grid-template-rows: 1fr;
}
.stream-brief {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.player .stream-brief {
  grid-template-columns: repeat(3, 1fr);
}
.stream-brief > div {
  margin: 5px;
}
.stream-tags {
  margin: 0px 10px 10px 10px;
}
.stream-description {
  margin: 10px;
  width: 180px;
}
.stream-brief .v-avatar {
  grid-column: 1/2;
  justify-self: center;
  align-self: center;
}
.stream-brief__content {
  font-size: 19px;
  grid-column: 2/-1;
}
.stream-brief__content > div {
  margin-bottom: 2px;
  height: 23px;
}
.stream-brief__content > div:first-child {
  height: 26px;
}
.stream-brief__content a {
  text-decoration: none;
}
.stream-description {
  max-height: 120px;
  overflow: hidden;
}
.stream-tags > .tag {
  font-size: 19px;
  padding: 0px 5px 2px 5px;
  border-radius: 3px;
  background: #55287e;
  color: white;
  margin: 0px 3px;
}
.player .stream-tags > .tag {
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: inherit;
  color: inherit;
  padding: 3px;
  border-radius: 3px;
  margin: 0px 3px;
}
.stream-brief a {
  font-weight: 500;
}
.v-image {
  cursor: pointer;
  position: relative;
}
.fixed-mask {
  position: absolute;
}
.play-mask {
  transition: all 0.1s ease-out;
  top: calc(50% - 36px);
  left: calc(50% - 36px);
  width: 72px;
  height: 72px;
  opacity: 0;
}
.v-image:hover .play-mask {
  opacity: 1;
}
.v-image:hover .play-mask .v-icon {
  opacity: 1;
  transform: scale(2);
}
.play-mask .v-icon {
  opacity: 0;
  transition: all 0.3s ease-out;
  transform: scale(3);
  color: rgba(255, 255, 255);
  width: 100%;
  height: 100%;
  z-index: 2;
  position: absolute;
}
.play-mask__background {
  top: 0px;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.4;
  z-index: 1;
  border-radius: 50%;
}
.live-mask {
  font-weight: bold;
  top: 0px;
  left: 0px;
  background: red;
  color: white;
  border: 2px black solid;
  border-radius: 5px;
  padding: 0px 5px;
  margin: 5px;
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
}
.viewer-mask__background {
  background: #b9b9b9;
  opacity: 0.8;
  z-index: 1;
  border-radius: 15px 0px 0px 0px;
}
.stream-brief__title a {
  font-weight: 900;
  font-size: 22px;
  color: #3e006f;
}
.stream-brief__name a,
.stream-brief__game a,
.stream-brief__platform a {
  color: #737277;
}
.player .stream-brief__name a,
.player .stream-brief__game a {
  color: #6f5ba3;
}
</style>
<style>
.f-stream-preview .v-image .v-image__image {
  transition: all 0.3s ease-out;
}
.f-stream-preview .v-image:hover .v-image__image {
  transform: scale(1.1);
}
</style>
