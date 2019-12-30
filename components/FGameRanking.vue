<template>
  <div class="f-game-ranking">
    <v-card
      v-for="(item, index) in sortedRanking"
      class="game-ranking__game-board"
      color="#eadbf8"
      :key="index"
      :to="`/live/hot/${item.game.id}`"
    >
      <v-img
        :title="$t(`_games.${item.game.id}`)"
        :src="item.game.image"
      ></v-img>
      <div class="game-board__title">{{ $t(`_games.${item.game.id}`) }}</div>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      ranking: []
    };
  },
  computed: {
    sortedRanking() {
      const temp = this.ranking.map(x => x);
      return temp
        .sort((a, b) => a.index - b.index)
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 6);
    }
  },
  mounted() {
    this.getStreamsByGame().then(promises => {
      promises.forEach(p => {
        p.then(res => this.ranking.push(res));
      });
    });
  },
  methods: {
    getTitle(totalAmount, proportionSource) {
      return totalAmount
        ? `${totalAmount} (${this.getProportion(proportionSource)})`
        : "0";
    },
    getProportion(source) {
      return source.map(x => `${x.platform} : ${x.amount}`).join(" ; ");
    }
  }
};
</script>
<style scoped>
.f-game-ranking {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 15px;
}
.game-ranking__game-board {
  border-radius: 5px;
  display: grid;
}
.game-ranking__game-board:hover {
  box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.5);
}
.game-board__title {
  font-size: 18px;
  padding: 5px 10px;
  color: #6540a7;
  justify-self: center;
  align-self: center;
  text-align: center;
  font-weight: bold;
  height: 60px;
}
@media (max-width: 1264px) and (min-width: 600px) {
  .f-game-ranking {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 600px) {
  .f-game-ranking {
    margin: 0px 0px 0px 10px;
    grid-template-columns: repeat(6, 120px);
    max-width: calc(100vw - 10px);
    overflow-x: scroll;
    overflow-y: hidden;
    grid-gap: 10px;
  }
  .f-game-ranking > a {
    margin-bottom: 10px;
  }
  .game-board__title {
    font-size: 14px;
  }
}
</style>
