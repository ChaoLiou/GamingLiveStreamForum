<template>
  <div class="f-member-block">
    <v-avatar size="40px" v-if="member.avatar">
      <v-img contain :src="`${memberApiOrigin}${member.avatar}`"></v-img>
    </v-avatar>
    <div style="grid-template-rows:repeat(2, 1fr)">
      <div class="text-truncate" style="max-width:130px">
        {{ member.nickname }}
      </div>
      <div
        style="display:grid;grid-template-columns:repeat(3, 1fr);width:120px"
      >
        <nuxt-link to="/chatroom/alert">
          <v-img
            class="tooltip-icon"
            height="20px"
            width="20px"
            contain
            :src="noticeIcon"
          ></v-img>
        </nuxt-link>
        <nuxt-link to="/chatroom/system">
          <v-img
            class="tooltip-icon"
            height="20px"
            width="20px"
            contain
            :src="mailIcon"
          ></v-img>
        </nuxt-link>
        <nuxt-link to="#">
          <v-img
            class="tooltip-icon"
            height="20px"
            width="20px"
            contain
            :src="frdIcon"
          ></v-img>
        </nuxt-link>
      </div>
    </div>
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
    },
    messageRead: {
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
      return !this.messageRead.private ? "/icn_frd1.png" : "/icn_frd2.png";
    },
    mailIcon() {
      return !this.messageRead.system ? "/icn_mail1.png" : "/icn_mail2.png";
    },
    noticeIcon() {
      return !this.messageRead.alert ? "/icn_notice1.png" : "/icn_notice2.png";
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
  grid-column-gap: 10px;
}
.f-member-block > div {
  padding: 0px 0px 0px 8px;
}
@media (max-width: 600px) {
  .f-member-block {
    grid-template-columns: 40px auto;
    height: 60px;
    align-items: center;
  }
}
</style>
