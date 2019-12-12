<template>
  <div class="f-news-comment">
    <v-btn @click="allComments = !allComments" v-if="source.length > showNews">
      <v-icon>{{ allComments ? "expand_more" : "expand_less" }}</v-icon>
      {{ expandCommentButtonText }}
    </v-btn>
    <div v-for="(item, index) in filterSource" :key="index">
      <div class="news-comment__item">
        <v-img width="40px" height="40px" :src="item.avatar"></v-img>
        <div>
          <span class="news-comment__commentator">{{ item.name }}：</span>
          <span class="news-comment__content">
            <span>{{ item.message }}</span>
            <span class="news-comment__time">{{ item.time }}</span>
          </span>
        </div>
        <!-- <v-btn small class="report-btn">{{$t('fNewsComment.report')}}</v-btn> -->
      </div>
    </div>
    <div class="news-comment__input">
      <v-text-field
        :placeholder="$t('fNewsComment.comment_it')"
        outline
        dark
        single-line
        hide-details
        clearable
      ></v-text-field>
      <v-btn icon>
        <v-icon>send</v-icon>
      </v-btn>
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
        ? `${this.$t("fNewsComment.collapse_to")} ${this.showNews} ${this.$t(
            "fNewsComment.comments_unit"
          )}`
        : `${this.$t("fNewsComment.expand_all")} ${
            this.source.length
          } ${this.$t("fNewsComment.comments_unit")}`;
    },
    filterSource() {
      return this.source.length < this.showNews || this.allComments
        ? this.source
        : this.source.slice(this.source.length - this.showNews);
    }
  }
};
</script>
<style scoped>
.news-comment__item {
  display: grid;
  grid-template-columns: 50px auto;
  padding: 5px;
  margin-bottom: 5px;
  background-color: #e7d6fa;
}
.news-comment__input {
  margin: 10px 5px 0px 5px;
  display: grid;
  grid-template-columns: auto 52px;
}
.report-btn {
  min-width: 40px;
}
.news-comment__commentator {
  color: #0055aa;
  font-size: 16px;
}
.news-comment__content {
  color: #737277;
  font-size: 16px;
}
.news-comment__time {
  margin-left: 16px;
}
</style>
