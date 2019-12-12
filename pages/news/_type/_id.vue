<template>
  <div class="news-type-id">
    <f-tab
      :title="$t('news_type_id.newsletter')"
      :tabs="tabs"
      link="/news"
      from="news"
    ></f-tab>
    <div class="content-grid">
      <div class="content-grid__main">
        <template v-if="$route.params.id">
          <f-news-detail :news="newsDetail"></f-news-detail>
          <f-block-box :title="$t('news_type_id.news_comments')">
            <f-news-comment :source="newsDetail.comments"></f-news-comment>
          </f-block-box>
          <f-block-box :title="$t('news_type_id.news_relatives')">
            <f-news-relatives
              :keywords="newsDetail.keywords"
              :source="newsDetail.relatives"
            ></f-news-relatives>
            <div class="more-link">
              <a href="#">{{ $t("news_type_id.more") }}</a>
            </div>
          </f-block-box>
          <f-block-box :title="$t('news_type_id.news_headline')">
            <f-news-headlines :source="newsDetail.heads"></f-news-headlines>
            <div class="more-link">
              <a href="#">{{ $t("news_type_id.more") }}</a>
            </div>
          </f-block-box>
        </template>
        <f-home-news-carousel
          v-show="!$route.params.id"
          :source="carouselSource"
          :interval-seconds="10"
          :height="$vuetify.breakpoint.xs ? 'calc(100vw * 9 / 16)' : undefined"
        ></f-home-news-carousel>
        <f-news-container
          v-show="!$route.params.id"
          :source="fnews"
          @more="loadMore"
        ></f-news-container>
      </div>
      <div class="content-grid__side">
        <f-temp-ad></f-temp-ad>
      </div>
    </div>
  </div>
</template>
<script>
import FTab from "@/components/FTab";
import FHomeNewsCarousel from "@/components/FHomeNewsCarousel";
import FTempAd from "@/components/FTempAd";
import FNewsContainer from "@/components/FNewsContainer";
import FNewsDetail from "@/components/FNewsDetail";
import FNewsComment from "@/components/FNewsComment";
import FNewsHeadlines from "@/components/FNewsHeadlines";
import FNewsRelatives from "@/components/FNewsRelatives";
import FBlockBox from "@/components/FBlockBox";
import newsTabs from "@/assets/json/tabs/news";
import newsTypes from "@/assets/json/news-types";
export default {
  components: {
    FTab,
    FHomeNewsCarousel,
    FTempAd,
    FNewsContainer,
    FNewsDetail,
    FNewsComment,
    FNewsHeadlines,
    FNewsRelatives,
    FBlockBox
  },
  data() {
    return {
      tabs: [],
      news: [],
      newsDetail: {},
      pageIndex: 0
    };
  },
  computed: {
    carouselSource() {
      return this.fnews
        .filter(x => !!x.image)
        .slice(0, 7)
        .map(x => ({
          ...x,
          image: x.image ? x.image.replace("/S/", "/B/") : ""
        }));
    },
    mainTitle() {
      return this.$route.params.type
        ? newsTabs.find(x => this.$route.params.type === x.type).title
        : "";
    },
    fnews() {
      return this.news.filter(
        x =>
          !this.$route.params.type || x.type.value === this.$route.params.type
      );
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getNewsById(this.$route.params.id).then(
        res => (this.newsDetail = res)
      );
    } else {
      this.getNews(this.pageIndex, 50).then(
        res =>
          (this.news = res.map((x, index) => ({
            ...x,
            type: newsTypes[index % 4]
          })))
      );
    }
    this.tabs = newsTabs.map((x, index) => ({
      ...x,
      active: this.$route.params.type === x.type
    }));
  },
  methods: {
    loadMore() {
      this.pageIndex++;
      this.getNews(this.pageIndex, 50).then(res =>
        this.news.push(
          ...res.map((x, index) => ({
            ...x,
            type: newsTypes[index % 4]
          }))
        )
      );
    }
  }
};
</script>
<style scoped>
.content-grid {
  display: grid;
  grid-template-columns: auto 20vw;
  margin-top: 70px;
}
.content-grid__main {
  margin: 0px 30px;
}
.content-grid__main > div {
  margin-bottom: 20px;
}
.content-grid__main > .f-home-news-area {
  margin-bottom: 45px;
}
.more-link {
  float: right;
  font-size: 18px;
  margin-top: -20px;
}
.more-link a {
  color: black;
  text-decoration: none;
}
.more-link:hover a {
  color: #0055aa;
  text-decoration: underline;
}
@media (max-width: 1264px) {
  .content-grid__side {
    display: none;
  }
  .content-grid__main {
    margin-left: 20px;
    margin-right: 20px;
    width: calc(100vw - 40px);
  }
}
@media (max-width: 600px) {
  .f-tab.fixed {
    top: 56px;
    height: 40px;
  }
  .content-grid__side {
    display: none;
  }
  .content-grid {
    margin-top: 110px;
    grid-template-columns: 1fr;
  }
  .content-grid__main {
    margin: 0px 5px;
    width: calc(100vw - 10px);
  }
}
</style>
<style>
@media (max-width: 600px) {
  .news-type-id .f-tab__tabs {
    width: 100vw;
    grid-template-columns: repeat(5, 1fr) !important;
    height: 40px;
  }
  .news-type-id .f-tab__tabs a > div {
    font-size: 14px;
  }
}
</style>
