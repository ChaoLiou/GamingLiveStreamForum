<template>
  <v-app class="secret-layout">
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          :to="item.link"
          active-class="black--text"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>後台</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: "首頁", icon: "home", link: "/dashboard" },
        { title: "任務", icon: "flag", link: "/dashboard/quest" }
      ]
    };
  }
};
</script>
<style>
.secret-layout * {
  font-size: 1.5rem !important;
}
</style>
