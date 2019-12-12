<template>
  <v-app class="default">
    <v-btn
      v-if="!$vuetify.breakpoint.xs && loggedin"
      icon
      label
      :class="['expander-btn', drawer ? '' : 'collapsed']"
      @click="drawer = !drawer"
    >
      <v-icon large>
        {{ drawer ? "keyboard_arrow_left" : "keyboard_arrow_right" }}
      </v-icon>
    </v-btn>
    <v-navigation-drawer
      v-if="
        !$vuetify.breakpoint.xs &&
          ($store.getters['member'] ? $store.getters['member'] : false)
      "
      v-model="drawer"
      clipped
      temporary
      fixed
      app
    >
      <v-list dark>
        <v-list-group active-class="white--text" prepend-icon="star">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title class="drawer-title">
                {{ $t("default.hot_streamers") }}
              </v-list-tile-title>
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
        <v-list-group
          active-class="white--text"
          prepend-icon="remove_red_eye"
          :value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title class="drawer-title">
                {{ $t("default.followed_streams") }}
              </v-list-tile-title>
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
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.xs"
      class="mobile-side-menu"
      v-model="toolbarDrawer"
      clipped
      temporary
      right
      fixed
      app
      :width="200"
    >
      <v-list dark dense>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              <f-member-block-mobile
                v-if="loggedin"
                :member="$store.getters['member']"
                @logout="logoutMember"
              ></f-member-block-mobile>
              <v-btn v-else class="loginout-btn" @click="openLoginForm">{{
                $t("default.loginout")
              }}</v-btn>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="reload">
          <v-list-tile-content>
            <v-list-tile-title>{{ $t("default.homepage") }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/news">
          <v-list-tile-content>
            <v-list-tile-title>{{ $t("default.hot_news") }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/live/recommend">
          <v-list-tile-content>
            <v-list-tile-title>{{
              $t("default.stream_platform")
            }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/live/hot">
          <v-list-tile-content>
            <v-list-tile-title>{{ $t("default.hot_games") }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="loggedin">
          <v-list-tile-content>
            <v-list-tile-title @click="logoutMember">{{
              $t("fMemberBlock.logout")
            }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar v-if="$vuetify.breakpoint.xs" fixed height="56px">
      <v-toolbar-items>
        <a class="home-link" @click="reload">
          <v-img
            class="logo"
            src="/logo.png"
            width="100px"
            height="45px"
          ></v-img>
        </a>
        <v-toolbar-side-icon @click="toolbarDrawer = !toolbarDrawer"
          ><v-icon>{{
            toolbarDrawer ? "clear" : "menu"
          }}</v-icon></v-toolbar-side-icon
        >
      </v-toolbar-items>
    </v-toolbar>
    <v-toolbar v-else fixed height="78px">
      <v-toolbar-items
        :class="[
          searchInputFocused ? 'search-focused' : '',
          loggedin ? 'loggedin' : ''
        ]"
      >
        <a class="home-link" @click="reload">
          <v-img
            class="logo"
            src="/logo.png"
            width="150px"
            height="70px"
          ></v-img>
        </a>
        <div class="nav-items">
          <nuxt-link to="/live/recommend">{{
            $t("default.stream_platform")
          }}</nuxt-link>
          <nuxt-link to="/live/hot">
            {{ $t("default.hot_games") }}
          </nuxt-link>
        </div>
        <div :class="['search']">
          <input
            type="text"
            class="search__text"
            @focus="searchInputFocused = true"
            @blur="searchInputFocused = false"
          />
          <v-btn icon class="search__action">
            <v-icon>search</v-icon>
          </v-btn>
        </div>
        <!-- <div>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn dark v-on="on">{{ $t("default.locale") }}</v-btn>
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
        <div class="login-container">
          <f-member-block
            v-if="loggedin"
            :member="$store.getters['member']"
            @logout="logoutMember"
          ></f-member-block>
          <v-btn v-else class="loginout-btn" @click="openLoginForm">{{
            $t("default.loginout")
          }}</v-btn>
        </div>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer color="#025266" dark>
      <div>
        version:
        <a
          href="https://github.com/ChaoLiou/GamingLiveStreamForum/commits/master"
          target="_blank"
          >{{ rev.short }}</a
        >
        - build at {{ rev.build_dt }}
      </div>
    </v-footer>
    <v-dialog
      content-class="dialog-form"
      v-model="dialog"
      width="500px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xs"
    >
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
import FMemberBlockMobile from "@/components/FMemberBlockMobile";
import FStreamInlinePreview from "@/components/FStreamInlinePreview";
import helper from "@/assets/utils/helper";
export default {
  components: {
    FLoginForm,
    FRegisterForm,
    FMemberBlock,
    FMemberBlockMobile,
    FStreamInlinePreview
  },
  data() {
    return {
      toolbarDrawer: false,
      searchInputFocused: false,
      drawer: false,
      dialog: false,
      rev,
      needRegisteration: false,
      captchaKey: "",
      data: {},
      loggedin: false,
      streams: [],
      rememberPhoneNumber: false,
      remainLoginStatus: false,
      username: undefined
    };
  },
  watch: {
    member(value) {
      console.log(value);
    },
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
      this.$store.commit("setMember", member);
      this.loggedin = !!member;
      this.drawer = !!member;
      // this.toolbarDrawer = !!member;
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
      this.toolbarDrawer = false;
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
      // this.toolbarDrawer = loggedin;
    },
    closeLoginForm(id) {
      this.dialog = false;
      this.loggedin = !!id;
      if (this.loggedin) {
        this.login(id).then(member => {
          this.$store.commit("setMember", member);
          this.loggedin = true;
          this.drawer = true;
          // this.toolbarDrawer = true;
        });
      }
    },
    logoutMember() {
      this.loggedin = false;
      this.logout();
      this.$router.push(this.localePath({ name: "index" }));
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
  margin-right: 40px;
  display: grid;
  grid-template-columns: 180px 240px auto 130px;
  width: calc(100vw - 60px);
}
.v-toolbar__items.loggedin {
  grid-template-columns: 180px 240px auto 290px;
}
.v-content {
  margin-top: 86px;
}
.login-container {
  display: grid;
  justify-items: end;
  align-items: center;
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
  grid-template-columns: auto 80px;
  align-items: center;
  height: inherit;
}
.search__text {
  background: white;
  padding: 5px 15px;
  border-radius: 15px 0px 0px 15px;
  outline-color: transparent;
  height: 43px;
  width: 100%;
}
.search__action {
  border-radius: 0px 15px 15px 0px;
  justify-self: start;
  height: 43px;
  width: 60px;
  margin-left: 0px;
}
.v-navigation-drawer {
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
@media (min-width: 600px) {
  .v-navigation-drawer {
    margin-top: 86px !important;
  }
}
@media (max-width: 1264px) {
  .v-toolbar__items.search-focused {
    grid-template-columns: 170px calc(100vw - 170px - 30px);
  }
  .search-focused .search {
    margin-left: 0px;
  }
  .search-focused .nav-items,
  .search-focused .login-container {
    display: none;
  }
}
@media (max-width: 600px) {
  .v-content {
    margin-top: 0px;
  }
  .v-toolbar__items {
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 10px;
    width: calc(100vw - 26px);
    grid-template-columns: repeat(2, 1fr);
  }
  .home-link {
    align-self: center;
  }
  .v-toolbar__side-icon {
    justify-self: end;
    background: transparent;
    color: black;
  }
  .v-toolbar {
    height: 56px;
  }
  .v-navigation-drawer {
    margin-top: 56px !important;
  }
}
</style>
<style>
.default .v-text-field .v-input__control {
  background: #55287e;
  border-radius: 5px;
  font-size: 18px;
}
.default .v-select__selections input {
  margin: 0px !important;
  padding: 0px !important;
}
.default .v-text-field .v-input__slot,
.default .v-select__selections {
  border-radius: 5px !important;
  border-color: #55287e !important;
}
.default .v-text-field--single-line .v-input__slot,
.default .v-select__selections {
  min-height: 38px !important;
  height: 38px !important;
}
.default .v-input__slot:hover {
  border-color: #55287e !important;
}
.default .v-input__append-inner {
  margin-top: 4px !important;
}
.default .v-text-field__slot input {
  margin: 0px !important;
  padding: 3px 0px !important;
}
.default .v-menu__content .v-list {
  background: #55287e;
  border-radius: 5px !important;
}
.default .v-menu__content .v-list__tile__title {
  font-size: 16px;
  color: white !important;
}
.default .v-select-list.v-card {
  background: transparent !important;
}
.default .v-btn__content {
  font-size: 16px;
}
.default .v-messages__message,
.default .v-counter {
  font-size: 16px;
}
.default .v-input--selection-controls {
  margin: auto;
  padding: 0px;
}
.default .v-btn.theme {
  background: linear-gradient(45deg, #6540a7, 40%, #dab4ff, 60%, #6540a7);
  color: white;
  font-size: 24px;
}
.default .user-select_none {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Likely future */
}
.default .v-dialog__content {
  z-index: 1000 !important;
}
.default .validation-message {
  margin-top: 5px !important;
  color: red;
}
.default .v-toolbar__content {
  display: grid;
  grid-template-columns: auto 300px;
}
.loginout-btn .v-btn__content {
  font-size: 22px !important;
}
@media (max-width: 600px) {
  .loginout-btn {
    height: 30px;
    width: 118px;
    margin-right: 0px;
    margin-left: 0px;
  }
  .loginout-btn .v-btn__content {
    font-size: 12px !important;
    height: 30px;
  }
  .mobile-side-menu .v-list {
    padding: 0px;
  }
  .mobile-side-menu .v-list .v-list__tile__title {
    font-size: 22px !important;
    margin: auto;
    width: fit-content;
    line-height: 60px;
  }
  .mobile-side-menu .v-list .v-list__tile,
  .mobile-side-menu .v-list .v-list__tile__content,
  .mobile-side-menu .v-list .v-list__tile__title {
    height: inherit;
  }
  .mobile-side-menu .v-list > div {
    height: 60px;
  }
  .mobile-side-menu .v-list > div:first-child {
    background: #55287e;
    height: 80px;
  }
  .mobile-side-menu .v-list > div:first-child .v-list__tile,
  .mobile-side-menu .v-list > div:first-child .v-list__tile__title,
  .mobile-side-menu .v-list > div:first-child .v-list__tile__content {
    height: 100%;
  }
  .mobile-side-menu .v-list > div:first-child .v-list__tile__title {
    display: grid;
    align-items: center;
    justify-items: center;
  }
}
</style>
