<template>
  <v-app>
    <v-toolbar fixed>
      <v-toolbar-items>
        <nuxt-link to="/" class="home-link">
          <v-img class="logo" src="/logo.png" width="120px" height="56px"></v-img>
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
      <v-btn>登入/註冊</v-btn>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer color="#025266" dark>
      <v-spacer></v-spacer>
      version: {{rev.version}} - build at {{rev.build_dt}}
    </v-footer>
  </v-app>
</template>
<script>
import rev from "@/build/rev";
export default {
  data() {
    return {
      rev
    };
  }
};
</script>
<style scoped>
.v-toolbar {
  z-index: 9999;
  background: linear-gradient(180deg, #dab4ff, #eadbf8);
}
.v-content {
  margin-top: 56px;
}
.logo {
  margin-right: 20px;
}
.nav-items {
  display: grid;
  margin-right: 20px;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  grid-column-gap: 20px;
}
.nav-items > a {
  color: #55287e;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
}
.v-btn {
  background: linear-gradient(45deg, #6540a7, 40%, #dab4ff, 60%, #6540a7);
  color: white;
  font-size: 16px;
}
.search {
  display: grid;
  grid-template-columns: 5fr 1fr;
  align-items: center;
}
.search__text {
  background: white;
  padding: 5px 15px;
  border-radius: 15px 0px 0px 15px;
  outline-color: transparent;
  height: 24px;
  justify-self: end;
}
.search__action {
  border-radius: 0px 15px 15px 0px;
  justify-self: start;
  height: 24px;
  margin-left: 0px;
}
</style>
