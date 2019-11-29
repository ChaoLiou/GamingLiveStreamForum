<template>
  <div class="f-news-relatives">
    <div class="news-relatives__item" v-for="(relative, index) in source" :key="index">
      <v-icon>arrow_right</v-icon>
      <a :href="relative.link" target="_blank">{{ relative.title }}</a>
    </div>
    <div class="keywords-row">
      <div>{{$t('fNewsRelatives.keywords')}}：</div>
      <div class="keywords-container">
        <div class="keywords-item" v-for="(keyword, index) in keywords" :key="index">
          <a :href="keyword.link" target="_blank">{{ keyword.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    source: {
      type: Array,
      default() {
        return [];
      }
    },
    keywords: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.f-news-relatives {
  margin-bottom: 40px;
}
.news-relatives__item {
  display: grid;
  grid-template-columns: 24px auto;
  padding: 8px 0px;
  font-size: 18px;
  border-bottom: 0.2px solid rgba(0, 0, 0, 0.5);
}
.news-relatives__item a {
  color: black;
  text-decoration: none;
}
.news-relatives__item:hover a {
  color: #0055aa;
  text-decoration: underline;
}
.keywords-row {
  display: grid;
  font-size: 18px;
  grid-template-columns: 75px auto;
}
.keywords-container {
  display: inline;
}
.keywords-item {
  display: inline;
  margin-right: 10px;
}
.keywords-item a {
  text-decoration: none;
}
.keywords-item:hover a {
  text-decoration: underline;
}
</style>
