<template>
  <div :class="['f-vod', vod.chatSource && !vod.externalLink ? '' : 'no-chat']">
    <div class="f-vod__main">
      <div class="f-vod__title-info">
        <v-avatar size="30px">
          <v-img :src="stream.streamer_image"></v-img>
        </v-avatar>
        <div class="f-vod__title">
          {{ vod.title }}
        </div>
      </div>
      <div class="f-vod__title-video">
        <f-link v-if="vod.externalLink" :link="vod.externalLink" external>
          <f-image-preview :image="vod.img"></f-image-preview>
        </f-link>
        <iframe
          v-else
          :src="vod.embeddedUrl"
          height="100%"
          width="100%"
          frameborder="0"
          scrolling="no"
          allowfullscreen="true"
        ></iframe>
      </div>
      <div class="f-vod__grid">
        <div class="f-vod__voder">
          <span>{{ $t("fStream.streamer") }}:</span>
          <a>{{ stream.streamer_name }}</a>
        </div>
        <div class="f-vod__viewer">
          {{ viewers }}{{ $t("fStream.viewers_unit") }}
        </div>
        <div>
          <v-btn depressed to="/live/recommend">{{
            $t("fStream.back_to_streams_overview")
          }}</v-btn>
          <v-btn depressed>{{ $t("fStream.relative_products") }}</v-btn>
          <v-btn depressed icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </div>
        <div
          :style="{
            'justify-self': 'end',
            'align-self': 'center',
            display: 'grid',
            'grid-template-columns': '1fr 1fr',
            'grid-gap': '15px'
          }"
        >
          <div class="vod-info">
            <div class="vod-info__title">{{ $t("fStream.like") }}</div>
            <div class="vod-info__content">642</div>
          </div>
          <div class="vod-info">
            <div class="vod-info__title">{{ $t("fStream.subscribe") }}</div>
            <div class="vod-info__content">887</div>
          </div>
        </div>
      </div>
    </div>
    <div class="f-vod__chat"></div>
  </div>
</template>
<script>
import formatter from "@/assets/utils/formatter";
import FLink from "@/components/FLink";
import FImagePreview from "@/components/FImagePreview";
export default {
  components: {
    FLink,
    FImagePreview
  },
  props: {
    vod: {
      type: Object,
      default() {
        return {};
      }
    },
    stream: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    viewers() {
      return formatter.fviewers(this.vod.viewNum);
    }
  }
};
</script>
<style scoped>
.f-vod {
  display: grid;
  grid-template-columns: calc((100vw - 435px - 100px)) 340px;
  height: 100%;
}
.f-vod__main {
  height: inherit;
}
.f-vod__title-info {
  display: grid;
  grid-template-columns: 40px auto;
  margin: 5px 0px;
}
.f-vod__title {
  justify-self: start;
  font-size: 20px;
}
.f-vod__grid {
  display: grid;
  grid-template-columns: auto 200px;
  margin: 10px;
}
.f-vod__viewer {
  justify-self: end;
}
.f-vod__voder a {
  color: #3e006f;
}
.f-vod__chat {
  position: fixed;
  top: 138px;
  right: 0px;
  width: 340px;
  height: calc(100% - 174px);
}
.vod-info {
  display: grid;
  grid-template-columns: 45px auto;
}
.vod-info > div {
  padding: 2px 8px;
}
.vod-info__title {
  background-color: #1d7dcc;
  color: white;
}
.vod-info__content {
  background-color: #fafafa;
}
.f-link {
  height: 100%;
}
@media (min-width: 1905px) {
  .f-vod {
    grid-template-columns: calc((100vw - 435px - 100px)) 435px;
  }
  .f-vod__title-video {
    width: calc((100vw - 435px - 100px));
    height: calc((100vw - 435px - 100px) * 9 / 16);
    margin: auto;
  }
  .f-vod__chat {
    width: 415px;
  }
}
@media (max-width: 1904px) and (min-width: 1265px) {
  .f-vod__title-video {
    width: calc(100vw - 200px - 340px);
    height: calc((100vw - 200px - 340px) * 9 / 16);
  }
}
@media (max-width: 1264px) {
  .f-vod {
    grid-template-columns: 1fr;
    width: calc(100vw - 200px);
  }
  .f-vod.no-chat {
    grid-template-rows: 1fr 0px;
  }
  .vod-below-info,
  .vod-comment {
    width: calc(100%);
  }
  .f-vod__main {
    width: calc(100vw - 200px);
    height: calc((100vw - 200px) * 9 / 16 + 150px);
  }
  .f-vod__title-video {
    width: calc(100vw - 200px);
    height: calc((100vw - 200px) * 9 / 16);
  }
  .no-chat .f-vod__chat {
    display: none;
  }
  .f-vod__chat,
  .f-vod__chat iframe {
    position: relative;
    height: 400px;
    top: 0px;
    width: calc(100vw - 200px);
  }
}
</style>
