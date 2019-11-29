<template>
  <div :class="{ 'multiple-line': news.image, 'f-news-preview': true }">
    <nuxt-link :to="`/news/${news.type.value}/${news.id}`" target="_blank">
      <v-img v-if="news.image" width="180px" height="180px" :src="news.image"></v-img>
    </nuxt-link>
    <div class="news-content">
      <div class="news-title">
        <span class="news-type">{{ news.type.title }}</span>
        <nuxt-link :to="`/news/${news.type.value}/${news.id}`" target="_blank">{{ news.title }}</nuxt-link>
      </div>
      <div class="news-brief" v-html="news.brief ? news.brief.replace('繼續閱讀', '') : ''"></div>
      <div class="more-link" v-if="news.image">
        <nuxt-link
          :to="`/news/${news.type.value}/${news.id}`"
          target="_blank"
        >{{$t('fNewsPreview.continue_reading')}}</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    news: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style scoped>
.f-news-preview {
  margin: 10px 20px;
}
.f-news-preview.multiple-line {
  display: grid;
  grid-template-columns: 180px auto;
}
.news-content {
  margin-left: 20px;
  align-self: start;
}
.news-title {
  font-size: 16px;
  margin-bottom: 10px;
}
.multiple-line .news-title {
  font-size: 22px;
}
.news-title a {
  color: #0055aa;
  text-decoration: none;
}
.news-brief {
  font-size: 16px;
}
.news-title:hover a {
  text-decoration: underline;
}
.news-type {
  background-color: #dab4ff;
  color: #66448e;
  border-radius: 5px;
  padding: 0px 5px;
  width: 43px;
  height: 24px;
  font-weight: bold;
  text-align: center;
}
.more-link {
  float: right;
}
.more-link a {
  text-decoration: none;
  font-size: 18px;
}
</style>
