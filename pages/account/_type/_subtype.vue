<template>
  <div class="account">
    <f-tab :title="$t('account_type_subtype.account_center')" :tabs="tabs" from="account"></f-tab>
    <div class="content">
      <f-block-box :title="$t(`_tabs.account.${currentTab.type}`)">
        <div class="side-menu">
          <nuxt-link
            v-for="(item, index) in subtabs"
            :key="index"
            :class="[item.active ? 'active' : '']"
            :to="item.link"
          >{{ $t(`_tabs.account.${item.type}`) }}</nuxt-link>
        </div>
      </f-block-box>
      <div class="content__main">
        <f-my-data
          v-if="$route.params.subtype === 'mydata'"
          :member="member"
          :loading="loading"
          @save="save"
        ></f-my-data>
        <f-followed-streams v-else-if="$route.params.subtype === 'followedstreams'"></f-followed-streams>
        <f-my-message v-else-if="$route.params.subtype === 'mymessage'"></f-my-message>
        <f-live-stream v-else-if="$route.params.subtype === 'livestream'"></f-live-stream>
        <f-quest-center :gamepoint="member.gamepoint" v-else-if="$route.params.subtype === 'quest'"></f-quest-center>
        <f-score-center
          :gamepoint="member.gamepoint"
          :accumulated-gamepoint="member.gamepoint"
          v-else-if="$route.params.subtype === 'score'"
        ></f-score-center>
      </div>
    </div>
    <v-snackbar v-model="response.show" multi-line right :timeout="5000" top>
      {{ response.message }}
      <v-btn color="#eadbf8" flat @click="response.show = false">OK</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import accountTabs from "@/assets/json/tabs/account";
import FTab from "@/components/FTab";
import FBlockBox from "@/components/FBlockBox";
import FMyData from "@/components/FMyData";
import FFollowedStreams from "@/components/FFollowedStreams";
import FMyMessage from "@/components/FMyMessage";
import FLiveStream from "@/components/FLiveStream";
import FQuestCenter from "@/components/FQuestCenter";
import FScoreCenter from "@/components/FScoreCenter";
import FAccountInfoVue from "../../../components/FAccountInfo.vue";
export default {
  components: {
    FTab,
    FBlockBox,
    FMyData,
    FFollowedStreams,
    FMyMessage,
    FLiveStream,
    FQuestCenter,
    FScoreCenter
  },
  data() {
    return {
      response: {
        show: false,
        message: ""
      },
      tabs: [],
      subtabs: [],
      member: {},
      loading: false
    };
  },
  computed: {
    currentTab() {
      return accountTabs.find(x => this.$route.params.type === x.type);
    }
  },
  mounted() {
    if (this.currentTab && this.currentTab.subtabs) {
      this.subtabs = this.currentTab.subtabs.map(x => ({
        ...x,
        active: this.$route.params.subtype === x.type
      }));
    }
    this.tabs = accountTabs.map(x => ({
      ...x,
      active: this.$route.params.type === x.type
    }));
    this.getMemberByLoginuser().then(member => (this.member = member));
  },
  methods: {
    save() {
      this.loading = true;
      this.memberUpdate(this.member).then(member => {
        this.loading = false;
        this.response = { show: true, message: "更新成功!" };
        this.member = member ? member : this.member;
      });
    }
  }
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
@media (max-width: 1264px) {
  .content {
    margin-left: 0px;
    margin-right: 0px;
  }
}
</style>
