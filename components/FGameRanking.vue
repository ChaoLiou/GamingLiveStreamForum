<template>
  <div
    class="f-game-ranking"
    :style="{ display: 'grid', 'grid-template-columns': 'repeat(6, 1fr)', 'grid-gap': '15px' }"
  >
    <v-card
      v-for="(item, index) in games"
      color="#eadbf8"
      :key="index"
      :style="{ 'border-radius': '5px', display: 'grid' }"
      :to="`/live/hot/${item.game.name}`"
    >
      <v-img :src="item.game.box.large"></v-img>
      <div
        :style="{ padding:'10px', color:'#6540a7', 'justify-self': 'center', 'align-self': 'center', 'text-align': 'center', 'font-weight': 'bold', height: '60px' }"
      >{{item.game.name}}</div>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    games: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>
