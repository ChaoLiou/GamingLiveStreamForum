<template>
  <v-app>
    <v-toolbar fixed height="78px">
      <v-toolbar-items>
        <nuxt-link to="/" class="home-link">
          <v-img class="logo" src="/logo.png" width="150px" height="70px"></v-img>
        </nuxt-link>
        <div class="nav-items">
          <nuxt-link to="/live/recommend">直播平台</nuxt-link>
          <nuxt-link to="/live/hot">熱門遊戲</nuxt-link>
        </div>
        <div class="search">
          <input type="text" class="search__text" />
          <v-btn icon class="search__action">
            <v-icon>search</v-icon>
          </v-btn>
        </div>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <div class="login-container" @click="dialog = true">
        <v-btn>登入/註冊</v-btn>
      </div>
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
        >{{rev.short}}</a>
        - build at {{rev.build_dt}}
      </div>
    </v-footer>
    <v-dialog v-model="dialog" width="500px" scrollable>
      <f-login-form @close="dialog = false"></f-login-form>
      <!-- <f-register-form @close="dialog = false"></f-register-form> -->
    </v-dialog>
  </v-app>
</template>
<script>
import rev from "@/build/rev";
import FLoginForm from "@/components/FLoginForm";
import FRegisterForm from "@/components/FRegisterForm";
export default {
  components: {
    FLoginForm,
    FRegisterForm
  },
  data() {
    return {
      dialog: false,
      rev
    };
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
</style>
<style>
.v-dialog__content {
  z-index: 1000 !important;
}
</style>
