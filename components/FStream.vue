<template>
  <div class="f-stream">
    <div class="f-stream__main">
      <div class="f-stream__title-info">
        <v-avatar size="30px">
          <v-img :src="stream.streamer_image"></v-img>
        </v-avatar>
        <div class="f-stream__title">{{stream.title}}</div>
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
          <span>實況主:</span>
          <a>{{stream.streamer_name}}</a>
        </div>
        <div class="f-stream__viewer">{{viewers}}人觀看</div>
        <div>
          <v-btn depressed to="/live/recommend">回實況總覽</v-btn>
          <v-btn depressed>關聯商品</v-btn>
          <v-btn depressed icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </div>
        <div
          :style="{ 'justify-self': 'end', 'align-self': 'center', display: 'grid', 'grid-template-columns': '1fr 1fr', 'grid-gap': '15px' }"
        >
          <div class="stream-info">
            <div class="stream-info__title">喜歡</div>
            <div class="stream-info__content">642</div>
          </div>
          <div class="stream-info">
            <div class="stream-info__title">訂閱</div>
            <div class="stream-info__content">887</div>
          </div>
        </div>
      </div>
    </div>
    <div class="f-stream__chat">
      <iframe frameborder="0" scrolling="yes" :src="stream.chatSource" height="100%" width="100%"></iframe>
    </div>
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
.f-stream__title-video {
  height: 382.5px;
}
.f-stream__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
@media (min-width: 1900px) {
  .f-stream {
    grid-template-columns: minmax(1280px, auto) 435px;
    height: 100vh;
  }
  .f-stream__title-video {
    height: calc(100% - 300px);
  }
  .f-stream__chat {
    width: 435px;
  }
}
</style>
