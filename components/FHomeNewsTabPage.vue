<template>
  <div class="f-home-news-tab-page">
    <f-block-title
      background-color="#e7d6fa"
      :text="$t('fHomeNewsTabPage.newsletter')"
      :content-left-margin="10"
      :content-right-margin="0"
      :font-size="$vuetify.breakpoint.xs ? 16 : 22"
      :line-height="3"
      :tabs="newsTypes"
      @tab-change="tabChange"
    ></f-block-title>
    <div class="news-container">
      <template v-for="(item, index) in filteredSource">
        <div class="news-item" :key="index">
          <div class="news-tag">{{ item.type.title }}</div>
          <div class="news-title">
            <nuxt-link
              target="_blank"
              :to="`/news/${item.type.value}/${item.id}`"
              >{{ item.title }}</nuxt-link
            >
          </div>
        </div>
        <v-divider :key="`divider-${index}`"></v-divider>
      </template>
    </div>
    <div class="more-link">
      <nuxt-link to="/news">{{ $t("fHomeNewsTabPage.more_info") }}></nuxt-link>
    </div>
  </div>
</template>
<script>
import FBlockTitle from "@/components/FBlock/FBlockTitle";
import newsTypes from "@/assets/json/news-types";
export default {
  components: {
    FBlockTitle
  },
  props: {
    source: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      newsTypes: newsTypes.map(x => x.title),
      selectedType: -1
    };
  },
  computed: {
    filteredSource() {
      return this.source
        .filter(
          x =>
            !this.newsTypes[this.selectedType] ||
            x.type.title === this.newsTypes[this.selectedType]
        )
        .slice(0, 6);
    }
  },
  methods: {
    tabChange(index) {
      this.selectedType = index;
    }
  }
};
</script>
<style scoped>
.news-item {
  background-color: #f2e9fc;
  display: grid;
  grid-template-columns: 60px auto;
  font-size: 16px;
}
.news-tag {
  background-color: #dab4ff;
  justify-self: center;
  align-self: center;
  color: #66448e;
  border-radius: 5px;
  padding: 0px 5px;
  width: 43px;
  height: 24px;
  font-weight: bold;
  text-align: center;
}
.news-title {
  height: 48px;
  font-weight: bold;
  width: 95%;
  display: grid;
  align-items: center;
}
.news-title > a {
  text-decoration: none;
  color: inherit;
  max-height: 48px;
  overflow: hidden;
}
.more-link {
  display: grid;
  justify-items: end;
  margin: 0px 10px;
}
.more-link a {
  font-size: 18px;
  color: #67458f;
  font-weight: bold;
  text-decoration: none;
}
</style>
