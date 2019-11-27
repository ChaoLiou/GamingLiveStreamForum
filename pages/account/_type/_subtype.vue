<template>
  <div class="account">
    <f-tab title="個人中心" :tabs="tabs"></f-tab>
    <div class="content">
      <f-block-box title="個人資訊">
        <div class="side-menu">
          <nuxt-link
            v-for="(item, index) in subtabs"
            :key="index"
            :class="[item.active ? 'active' : '']"
            :to="item.link"
          >{{ item.title }}</nuxt-link>
        </div>
      </f-block-box>
      <div class="content__main">
        <f-my-data v-if="$route.params.subtype === 'mydata'" :member="member"></f-my-data>
        <f-followed-streams v-else-if="$route.params.subtype === 'followedstreams'"></f-followed-streams>
        <f-my-message v-else-if="$route.params.subtype === 'mymessage'"></f-my-message>
      </div>
    </div>
  </div>
</template>
<script>
import accountTabs from "@/assets/json/tabs/account";
import FTab from "@/components/FTab";
import FBlockBox from "@/components/FBlockBox";
import FMyData from "@/components/FMyData";
import FFollowedStreams from "@/components/FFollowedStreams";
import FMyMessage from "@/components/FMyMessage";
export default {
  components: {
    FTab,
    FBlockBox,
    FMyData,
    FFollowedStreams,
    FMyMessage
  },
  data() {
    return {
      tabs: [],
      subtabs: [],
      member: {
        avatar: "/nobody.jpg",
        id: "08949527",
        nickname: "User",
        score: 999,
        level: "資深老司機",
        gender: 1,
        birthday: "2019-08-08",
        location: 0,
        email: "JJharden080@qq.com",
        phone: "168455998542",
        wechat: "85698542",
        qq: "85698542",
        weibo: "https://tw.weibo.com/divajody",
        intro:
          "臣本布衣，躬耕於南陽，苟全性命於亂世，不求聞達於諸侯。先帝不以臣卑鄙，猥自枉屈，三顧臣於草廬之中，諮臣以當世之事，由是感激，遂許先帝以驅馳。後值傾覆，受任於敗軍之際，奉命於危難之間，爾來二十有一年矣！先帝知臣謹慎，故臨崩寄臣以大事也。受命以來，夙夜憂勤，恐託付不效，以傷先帝之明。故五月渡瀘，深入不毛。今南方已定，兵甲已足，當獎率三軍，北定中原，庶竭駑鈍，攘除奸凶，興復漢室，還於舊都；此臣所以報先帝而忠陛下之職分也。"
      }
    };
  },
  mounted() {
    const currentTab = accountTabs.find(
      x => this.$route.params.type === x.type
    );
    if (currentTab && currentTab.subtabs) {
      this.subtabs = currentTab.subtabs.map(x => ({
        ...x,
        active: this.$route.params.subtype === x.type
      }));
    }
    this.tabs = accountTabs.map(x => ({
      ...x,
      active: this.$route.params.type === x.type
    }));
    // this.getMemberByLoginuser().then(member => (this.member = member));
  },
  methods: {}
};
</script>
<style scoped>
.content {
  display: grid;
  grid-template-columns: 200px auto;
  margin: 40px;
  padding-top: 70px;
}
.side-menu {
  font-size: 18px;
}
.side-menu > a {
  padding: 10px 15px;
  text-decoration: none;
  color: black;
  display: block;
}
.side-menu > a.active {
  background: #eadbf8;
  border-radius: 5px;
}
.content__main {
  background: #eadbf8;
  margin: 0px 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
}
</style>
