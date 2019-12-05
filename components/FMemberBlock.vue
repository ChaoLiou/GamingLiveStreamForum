<template>
  <div class="f-member-block">
    <v-img
      class="tooltip-icon"
      height="30px"
      width="30px"
      contain
      :src="frdIcon"
      @click="newFrd = !newFrd"
    ></v-img>
    <v-divider vertical></v-divider>
    <v-img
      class="tooltip-icon"
      height="30px"
      width="30px"
      contain
      :src="noticeIcon"
      @click="newNotice = !newNotice"
    ></v-img>
    <v-divider vertical></v-divider>
    <v-img
      class="tooltip-icon"
      height="30px"
      width="30px"
      contain
      :src="mailIcon"
      @click="newMail = !newMail"
    ></v-img>
    <v-divider vertical></v-divider>
    <v-menu
      content-class="member-content__menu"
      v-model="menu"
      bottom
      left
      :position-x="10"
      offset-y
      :close-on-click="false"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <div :class="['member-avatar__btn', menu ? 'active' : '']" v-on="on" @click="menu = !menu">
          <v-img height="45px" width="45px" contain :src="`${memberApiOrigin}${member.avatar}`"></v-img>
          <v-icon large>{{ menu ? "arrow_drop_up" : "arrow_drop_down" }}</v-icon>
        </div>
      </template>
      <v-card class="member-content" color="#8e75ae">
        <v-card-title class="member-content__header">
          <v-img height="80px" width="80px" contain :src="`${memberApiOrigin}${member.avatar}`"></v-img>
          <div class="member-content__header_info">
            <div class="member-content__header_title">{{ member.nickname }}</div>
            <div>ID：{{ member.id }}</div>
            <div>{{ $t("fMemberBlock.high_level_member") }}</div>
          </div>
        </v-card-title>
        <v-card-title class="member-content__body">
          <div class="member-content__body_title">
            <div>{{ $t("fMemberBlock.ur_score") }}</div>
            <!-- <v-btn>{{ $t("fMemberBlock.deposit") }}</v-btn> -->
          </div>
          <div class="member-content__body_coins">
            <div class="body__coin">
              <div class="body__coin_title">{{ $t("fMemberBlock.score") }}</div>
              <div class="body__coin_amount">{{fgamepoint(member.gamepoint)}}</div>
            </div>
            <div class="body__coin">
              <div class="body__coin_title">{{ $t("fMemberBlock.score") }}</div>
              <div class="body__coin_amount">{{fgamepoint(member.gamepoint)}}</div>
            </div>
            <div class="body__coin">
              <div class="body__coin_title">{{ $t("fMemberBlock.score") }}</div>
              <div class="body__coin_amount">{{fgamepoint(member.gamepoint)}}</div>
            </div>
            <div class="body__coin">
              <div class="body__coin_title">{{ $t("fMemberBlock.score") }}</div>
              <div class="body__coin_amount">{{fgamepoint(member.gamepoint)}}</div>
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <div @click="redirectToAccountView">{{ $t("fMemberBlock.account_center") }}</div>
          <v-divider vertical></v-divider>
          <div @click="logoutMember">{{ $t("fMemberBlock.logout") }}</div>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import formatter from "@/assets/utils/formatter";
export default {
  props: {
    member: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      newFrd: false,
      newMail: false,
      newNotice: false,
      menu: false
    };
  },
  computed: {
    frdIcon() {
      return this.newFrd ? "/icn_frd1.png" : "/icn_frd2.png";
    },
    mailIcon() {
      return this.newMail ? "/icn_mail1.png" : "/icn_mail2.png";
    },
    noticeIcon() {
      return this.newNotice ? "/icn_notice1.png" : "/icn_notice2.png";
    }
  },
  methods: {
    fgamepoint: formatter.fgamepoint,
    logoutMember() {
      this.menu = false;
      this.$emit("logout");
    },
    redirectToAccountView() {
      this.menu = false;
      this.$router.push(
        this.localePath({
          name: "account-type-subtype",
          params: { type: "info", subtype: "mydata" }
        })
      );
    }
  }
};
</script>
<style scoped>
.f-member-block {
  width: 280px;
  display: grid;
  grid-column-gap: 5px;
  grid-template-columns: 50px 10px 50px 10px 50px 10px 70px 10px;
  align-items: center;
  justify-items: center;
}
.f-member-block > div {
  padding: 8px 0px 4px 8px;
}
.v-divider {
  border-color: black;
  align-self: center;
  height: 30px;
  min-height: 30px;
}
.member-avatar__btn {
  display: grid;
  grid-template-columns: 45px 25px;
  cursor: pointer;

  border-radius: 15px 15px 0px 0px;
}
.member-avatar__btn.active {
  background: #8e75ae;
}
.member-content {
  border-radius: 15px 0px 15px 15px;
}
.member-content__header {
  display: grid;
  grid-template-columns: 80px auto;
  grid-column-gap: 15px;
}
.member-content__header_info {
  min-width: 165px;
  font-size: 16px;
  color: white;
}
.member-content__header_info .member-content__header_title {
  font-size: 20px;
}
.v-card__actions {
  display: grid;
  grid-template-columns: 145px 2px 145px;
  color: white;
  justify-items: center;
  font-size: 20px;
  border-top: 2px solid white;
  padding: 0px;
}
.v-card__actions > div {
  padding: 8px;
  cursor: pointer;
}
.v-card__actions > div:hover {
  color: orange;
}
.v-card__actions .v-divider {
  margin: 0px;
  border-width: 1px;
  border-color: white;
  height: 100%;
}
.member-content__body {
  color: white;
  display: grid;
  grid-template-rows: 30px auto;
}
.member-content__body_title {
  font-size: 18px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  margin-bottom: 20px;
}
.member-content__body_title button {
  width: 80px;
  height: 30px;
  font-size: 20px;
  font-weight: bold;
  color: orange;
  background: linear-gradient(135deg, #66448e, 20%, #dab4ff, 80%, #66448e);
  justify-self: end;
}
.member-content__body_coins {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  font-size: 16px;
}
.body__coin {
  display: grid;
  grid-template-columns: 40px 80px;
  justify-items: center;
}
.body__coin_amount {
  color: orange;
  font-weight: bold;
}
.member-content__menu.v-menu__content {
  border-radius: 15px 0px 15px 15px;
  top: 67px !important;
  z-index: 1000 !important;
}
</style>
