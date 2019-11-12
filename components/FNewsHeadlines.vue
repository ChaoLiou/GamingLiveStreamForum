<template>
  <div class="f-news-headlines">
    <div class="news-headline__item" v-for="(head, index) in source" :key="index">
      <v-img width="150px" :src="head.image"></v-img>
      <div class="news-headline__title">
        <a href="#">{{head.title}}</a>
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
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 10px;
  margin-bottom: 40px;
}
.news-headline__item {
  justify-items: center;
  display: grid;
  grid-template-rows: 150px auto;
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
