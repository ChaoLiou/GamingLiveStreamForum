<template>
  <v-app>
    <v-btn
      v-if="loggedin"
      icon
      label
      :class="['expander-btn', drawer ? '' : 'collapsed']"
      @click="drawer = !drawer"
    >
      <v-icon large>{{ drawer ? "keyboard_arrow_left" : "keyboard_arrow_right" }}</v-icon>
    </v-btn>
    <v-navigation-drawer v-if="member" v-model="drawer" clipped temporary fixed app>
      <v-list dark>
        <v-list-group active-class="white--text" prepend-icon="star">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title class="drawer-title">{{ $t("default.hot_streamers") }}</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile
            class="stream-preview-tile"
            v-for="(stream, index) in streams"
            :key="`a-${index}`"
          >
            <f-stream-inline-preview :stream="stream"></f-stream-inline-preview>
          </v-list-tile>
        </v-list-group>
        <v-list-group active-class="white--text" prepend-icon="remove_red_eye" :value="true">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title class="drawer-title">{{ $t("default.followed_streams") }}</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile
            class="stream-preview-tile"
            v-for="(stream, index) in streams"
            :key="`b-${index}`"
          >
            <f-stream-inline-preview :stream="stream"></f-stream-inline-preview>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed height="78px">
      <v-toolbar-items>
        <a class="home-link" @click="reload">
          <v-img class="logo" src="/logo.png" width="150px" height="70px"></v-img>
        </a>
        <div class="nav-items">
          <nuxt-link to="/live/recommend">
            {{
            $t("default.stream_platform")
            }}
          </nuxt-link>
          <nuxt-link to="/live/hot">{{ $t("default.hot_games") }}</nuxt-link>
        </div>
        <div class="search">
          <input type="text" class="search__text" />
          <v-btn icon class="search__action">
            <v-icon>search</v-icon>
          </v-btn>
        </div>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <!-- <div>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn dark v-on="on">{{$t('default.locale')}}</v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in $i18n.locales"
              :key="index"
              :to="switchLocalePath(item)"
              target="_blank"
            >
              <v-list-tile-title>{{ $t(`default.${item}`) }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>-->
      <!-- <div class="login-container">
        <f-member-block v-if="loggedin" :member="member" @logout="logoutMember"></f-member-block>
        <v-btn v-else @click="openLoginForm">
          {{
          $t("default.loginout")
          }}
        </v-btn>
      </div>-->
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer color="#025266" dark>
      <v-spacer></v-spacer>
      <div>
        version:
        <a
          href="https://github.com/ChaoLiou/GamingLiveStreamForum/commits/master"
          target="_blank"
        >{{ rev.short }}</a>
        - build at {{ rev.build_dt }}
      </div>
    </v-footer>
    <v-dialog content-class="dialog-form" v-model="dialog" width="500px" scrollable>
      <f-register-form
        :data="data"
        v-if="needRegisteration"
        @close="closeRegisterForm"
        @register="closeRegisterForm"
      ></f-register-form>
      <f-login-form
        v-else
        :captcha-key="captchaKey"
        :remember-phone-number="rememberPhoneNumber"
        :remain-login-status="remainLoginStatus"
        :username="username"
        @close="closeLoginForm"
        @redirect-register="redirectRegister"
        @loggedin="closeLoginForm"
        @refresh-captcha="generateCaptchaKey"
      ></f-login-form>
    </v-dialog>
  </v-app>
</template>
<script>
import rev from "@/build/rev";
import FLoginForm from "@/components/FLoginForm";
import FRegisterForm from "@/components/FRegisterForm";
import FMemberBlock from "@/components/FMemberBlock";
import FStreamInlinePreview from "@/components/FStreamInlinePreview";
import helper from "@/assets/utils/helper";
export default {
  components: {
    FLoginForm,
    FRegisterForm,
    FMemberBlock,
    FStreamInlinePreview
  },
  data() {
    return {
      drawer: false,
      dialog: false,
      rev,
      needRegisteration: false,
      captchaKey: "",
      data: {},
      loggedin: false,
      member: undefined,
      streams: [],
      rememberPhoneNumber: false,
      remainLoginStatus: false,
      username: undefined
    };
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.username = undefined;
      } else {
        this.rememberPhoneNumber =
          this.getCookie("rememberPhoneNumber") === "true";
        this.remainLoginStatus = this.getCookie("remainLoginStatus") === "true";
        if (this.rememberPhoneNumber) {
          this.username = this.getCookie("username");
        }
      }
    }
  },
  mounted() {
    this.generateCaptchaKey();
    this.getMemberByLoginuser().then(member => {
      this.member = member;
      this.loggedin = !!member;
    });
    this.getStreams(0, 4).then(streams => this.streams.push(...streams));
  },
  methods: {
    reload() {
      if (this.$route.name.startsWith("index___")) {
        location.reload();
      } else {
        this.$router.push(this.localePath({ name: "index" }));
      }
    },
    redirectRegister(data) {
      this.needRegisteration = true;
      this.data = data;
    },
    openLoginForm() {
      this.dialog = !this.dialog;
      if (this.dialog) {
        this.generateCaptchaKey();
      }
    },
    generateCaptchaKey() {
      this.captchaKey = helper.randomString(5, "aA#");
    },
    closeRegisterForm(loggedin) {
      this.dialog = false;
      this.needRegisteration = false;
      this.loggedin = loggedin;
      this.drawer = loggedin;
    },
    closeLoginForm(id) {
      this.dialog = false;
      this.loggedin = !!id;
      if (this.loggedin) {
        this.login(id).then(member => {
          this.member = member;
          this.loggedin = true;
          this.drawer = true;
        });
      }
    },
    logoutMember() {
      this.loggedin = false;
      this.logout();
    }
  }
};
</script>
<style scoped>
.v-toolbar {
  z-index: 999;
  background: linear-gradient(180deg, #dab4ff, #eadbf8);
  height: 86px;
}
.v-toolbar__items {
  height: 100%;
  margin-top: 8px;
}
.v-content {
  margin-top: 86px;
}
.logo {
  margin-right: 50px;
}
.nav-items {
  display: grid;
  margin-right: 20px;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  grid-column-gap: 20px;
  height: 100%;
}
.nav-items > a {
  color: #55287e;
  text-decoration: none;
  font-weight: bold;
  font-size: 24px;
}
.v-btn {
  background: linear-gradient(45deg, #6540a7, 40%, #dab4ff, 60%, #6540a7);
  color: white;
  font-size: 24px;
}
.search {
  margin-left: 20px;
  display: grid;
  grid-template-columns: 5fr 1fr;
  align-items: center;
  height: inherit;
}
.search__text {
  background: white;
  padding: 5px 15px;
  border-radius: 15px 0px 0px 15px;
  outline-color: transparent;
  height: 43px;
  width: 450px;
}
.search__action {
  border-radius: 0px 15px 15px 0px;
  justify-self: start;
  height: 43px;
  width: 60px;
  margin-left: 0px;
}
.login-container {
  height: 100%;
  display: grid;
  align-items: center;
}
.v-navigation-drawer {
  margin-top: 86px !important;
  background: #8e75ae;
  z-index: 1000;
}
.expander-btn {
  top: 86px;
  position: fixed;
  transform: translateX(300px);
  border-radius: 10px;
  width: 50px;
  height: 50px;
  z-index: 1000;
  transition: 0.2s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.expander-btn.collapsed {
  transform: translateX(0px);
}
.drawer-title {
  font-size: 22px;
}
.stream-preview-tile {
  height: 70px;
}
</style>
