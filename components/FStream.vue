<template>
  <div class="f-stream">
    <div class="f-stream__main">
      <div class="f-stream__title-info">
        <v-avatar size="30px">
          <v-img :src="stream.streamer_image"></v-img>
        </v-avatar>
        <div class="f-stream__title">{{ stream.title }}</div>
      </div>
      <div class="f-stream__title-video">
        <f-link v-if="stream.externalLink" :link="stream.externalLink" external>
          <f-image-preview :image="stream.preview"></f-image-preview>
        </f-link>
        <iframe
          v-else
          :src="stream.source"
          height="100%"
          width="100%"
          frameborder="0"
          scrolling="no"
          allowfullscreen="true"
        ></iframe>
      </div>
      <div class="f-stream__grid">
        <div class="f-stream__streamer">
          <span>{{ $t("fStream.streamer") }}:</span>
          <a>{{ stream.streamer_name }}</a>
        </div>
        <div class="f-stream__viewer">
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
          <div class="stream-info">
            <div class="stream-info__title">{{ $t("fStream.like") }}</div>
            <div class="stream-info__content">642</div>
          </div>
          <div class="stream-info">
            <div class="stream-info__title">{{ $t("fStream.subscribe") }}</div>
            <div class="stream-info__content">887</div>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="['f-stream__chat', stream.externalLink ? 'external-link' : '']"
    >
      <div v-if="stream.externalLink"></div>
      <!-- <f-temp-ad v-if="stream.externalLink"></f-temp-ad> -->
      <iframe
        v-else
        frameborder="0"
        scrolling="yes"
        :src="stream.chatSource"
        height="100%"
        width="100%"
      ></iframe>
    </div>
  </div>
</template>
<script>
import formatter from "@/assets/utils/formatter";
import FLink from "@/components/FLink";
import FImagePreview from "@/components/FImagePreview";
import FTempAd from "@/components/FTempAd";
export default {
  components: {
    FLink,
    FImagePreview
    // FTempAd
  },
  props: {
    stream: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    viewers() {
      return formatter.fviewers(this.stream.viewers);
    }
  }
};
</script>
<style scoped>
.f-stream {
  display: grid;
  grid-template-columns: minmax(680px, auto) 340px;
  height: 100%;
}
.f-stream__main {
  height: inherit;
}
.f-stream__title-info {
  display: grid;
  grid-template-columns: 40px auto;
  margin: 5px 0px;
}
.f-stream__title {
  justify-self: start;
  font-size: 20px;
}
.f-stream__grid {
  display: grid;
  grid-template-columns: auto 200px;
  margin: 10px;
}
.f-stream__viewer {
  justify-self: end;
}
.f-stream__streamer a {
  color: #3e006f;
}
.f-stream__chat {
  position: fixed;
  top: 138px;
  right: 0px;
  width: 340px;
  height: calc(100% - 174px);
}
.stream-info {
  display: grid;
  grid-template-columns: 45px auto;
}
.stream-info > div {
  padding: 2px 8px;
}
.stream-info__title {
  background-color: #1d7dcc;
  color: white;
}
.stream-info__content {
  background-color: #fafafa;
}
.f-link {
  height: 100%;
}
@media (min-width: 1905px) {
  .f-stream {
    grid-template-columns: minmax(1280px, auto) 435px;
    height: 100vh;
  }
  .f-stream__title-video {
    width: calc((100vh - 180px) * 16 / 9);
    height: calc(100vh - 180px);
    margin: auto;
  }
  .f-stream__chat {
    width: 435px;
  }
}
@media (max-width: 1904px) and (min-width: 1265px) {
  .f-stream__title-video {
    width: calc(100vw - 200px - 340px);
    height: calc((100vw - 200px - 340px) * 9 / 16);
  }
}
@media (max-width: 1264px) {
  .stream-below-info,
  .stream-comment {
    width: calc(100%);
  }
  .f-stream {
    grid-template-columns: 1fr;
  }
  .f-stream__main,
  .f-stream__title-video {
    width: calc(100vw - 200px);
    height: calc((100vw - 200px) * 9 / 16);
  }
  .f-stream__chat.external-link {
    display: none;
  }
  .f-stream__chat,
  .f-stream__chat iframe {
    position: relative;
    height: 400px;
    top: 0px;
    width: calc(100vw - 200px);
  }
}
</style>
