<template>
  <div class="f-news-headlines">
    <div class="news-headline__item" v-for="(head, index) in source" :key="index">
      <a :href="head.link" target="_blank">
        <v-img width="180px" :src="head.image"></v-img>
      </a>
      <div class="news-headline__title">
        <a :href="head.link" target="_blank">{{head.title}}</a>
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
    }
  }
};
</script>
<style scoped>
.f-news-headlines {
  display: grid;
  grid-template-columns: repeat(5, 180px);
  grid-column-gap: 15px;
  margin-bottom: 40px;
}
.news-headline__item {
  justify-items: center;
  grid-row-gap: 10px;
  display: grid;
  grid-template-rows: 180px auto;
}
.news-headline__title {
  font-size: 16px;
}
.news-headline__title a {
  color: black;
  text-decoration: none;
}
.news-headline__title:hover a {
  color: #0055aa;
  text-decoration: underline;
}
</style>
