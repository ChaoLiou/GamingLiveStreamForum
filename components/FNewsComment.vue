<template>
  <div class="f-news-comment">
    <v-btn @click="allComments = !allComments">
      <v-icon>{{allComments ? 'expand_more' : 'expand_less'}}</v-icon>
      {{expandCommentButtonText}}
    </v-btn>
    <div v-for="(item, index) in filterSource" :key="index">
      <div class="news-comment__item">
        <v-img width="40px" height="40px" :src="item.avatar"></v-img>
        <div>
          <span class="news-comment__commentator">{{item.name}}：</span>
          <span class="news-comment__content">{{item.message.join('\t')}}</span>
        </div>
        <v-btn small class="report-btn">檢舉</v-btn>
      </div>
    </div>
    <div class="news-comment__input">
      <v-text-field
        placeholder="發表新聞評語...（限50字）"
        outline
        single-line
        hide-details
        append-outer-icon="send"
        clearable
        @click:append-outer="() => {}"
      ></v-text-field>
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
    showNews: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      allComments: false
    };
  },
  computed: {
    expandCommentButtonText() {
      return this.allComments
        ? `縮減至 ${this.showNews} 則評語`
        : `顯示所有 ${this.source.length} 則評語`;
    },
    filterSource() {
      return this.allComments
        ? this.source
        : this.source.slice(this.source.length - this.showNews);
    }
  }
};
</script>
<style scoped>
.news-comment__item {
  display: grid;
  grid-template-columns: 50px auto 50px;
  padding: 5px;
  margin-bottom: 5px;
  background-color: #e7d6fa;
}
.news-comment__input {
  margin: 10px 5px 0px 5px;
}
.report-btn {
  min-width: 40px;
}
.news-comment__commentator {
  color: #0055aa;
}
.news-comment__content {
  color: #737277;
}
</style>
