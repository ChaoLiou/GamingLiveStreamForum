<template>
  <div class="f-news-relatives">
    <div class="news-relatives__item" v-for="(relative, index) in source" :key="index">
      <v-icon left>arrow_right</v-icon>
      <a href="#">{{relative}}</a>
    </div>
    <div class="news-relatives__item">
      <div></div>
      <div>
        關鍵字：
        <a href="#">{{keyword}}</a>
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
    keyword: {
      type: String,
      default: ""
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
</style>
