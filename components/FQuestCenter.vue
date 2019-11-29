<template>
  <div class="f-quest-center">
    <f-block
      :font-size="22"
      :line-height="0"
      :content-left-margin="10"
      :content-right-margin="30"
      :title="$t('fQuestCenter.quest_center')"
      background-color="#eadbf8"
    >
      <div class="content">
        <div class="tabs">
          <div
            :class="[selectedTab === 'daily' ? 'selected': '']"
            @click="selectedTab = 'daily'"
          >{{$t('fQuestCenter.daily_quest')}}</div>
          <div
            :class="[selectedTab === 'series' ? 'selected': '']"
            @click="selectedTab = 'series'"
          >{{$t('fQuestCenter.series_quest')}}</div>
        </div>
        <div class="tab-content">
          <div
            class="scores-info"
          >{{$t('fQuestCenter.holding_now')}}：{{fscores(scores)}}{{$t('fQuestCenter.unit')}}</div>
          <div class="quest__grid">
            <div class="quest__grid-header">
              <div>{{$t('fQuestCenter.quest_name')}}</div>
              <div>{{$t('fQuestCenter.quest_content')}}</div>
              <div>{{$t('fQuestCenter.remaing_time')}}</div>
              <div>{{$t('fQuestCenter.score_reward')}}</div>
              <div>{{$t('fQuestCenter.finished_or_not')}}</div>
            </div>
            <div class="quest__grid-row" v-for="(item, index) in list" :key="index">
              <div>{{item.name}}</div>
              <div class="grid-row__content">{{item.content}}</div>
              <div>{{item.finished === 1 ? '--:--' : remaingTime}}</div>
              <div>{{item.rewards}}</div>
              <div
                :class="['grid-row__status', item.status]"
                @click="clickStatusButton(item.status)"
              >{{$t(`fQuestCenter.${item.status}`)}}</div>
            </div>
          </div>
        </div>
        <v-dialog content-class="dialog-notification" max-width="500px" v-model="dialog">
          <v-card color="#eadbf8">
            <f-block
              :font-size="22"
              :line-height="0"
              :content-left-margin="10"
              :content-right-margin="10"
              :title="$t('fQuestCenter.quest_finished')"
              background-color="#eadbf8"
            ></f-block>
            <v-card-text>
              <div class="dialog__content" v-html="$t('fQuestCenter.quest_finished_msg')"></div>
            </v-card-text>
            <v-card-actions>
              <v-btn class="theme" @click="dialog = false">{{$t('fQuestCenter.submit')}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </f-block>
  </div>
</template>
<script>
import FBlock from "@/components/FBlock";
import quest from "@/assets/json/fake/quest";
import formatter from "@/assets/utils/formatter";
import helper from "@/assets/utils/helper";
export default {
  components: {
    FBlock
  },
  data() {
    return {
      selectedTab: "daily",
      scores: 9999999,
      remaingTime: "",
      dialog: true
    };
  },
  computed: {
    list() {
      return quest.filter(x => x.type === this.selectedTab);
    }
  },
  mounted() {
    this.initCountDown();
  },
  methods: {
    clickStatusButton(status) {
      if (status === "finishable") {
        this.dialog = true;
      }
    },
    initCountDown() {
      const { hour, minute } = this.countdown();
      this.remaingTime = `${hour ? hour : ""}${this.$t(
        "fQuestCenter.hour"
      )}${minute}${this.$t("fQuestCenter.minute")}`;
    },
    countdown: helper.countdown,
    fscores: formatter.fscores
  }
};
</script>
<style scoped>
.content {
  margin: 0px 20px;
}
.tabs {
  display: grid;
  grid-template-columns: 100px 100px;
  font-size: 18px;
  justify-items: center;
  align-items: center;
  grid-column-gap: 3px;
}
.tabs > div {
  border-radius: 5px 5px 0px 0px;
  padding: 8px 14px;
  background: #8e75ae;
  color: white;
  cursor: pointer;
}
.tabs > div.selected {
  background: #55287e;
  color: orange;
}
.tab-content {
  background: rgba(128, 128, 128, 0.3);
  height: 500px;
  border-radius: 0px 5px 5px 5px;
  font-size: 18px;
}
.scores-info {
  color: #55287e;
  font-weight: bold;
  margin: 20px 15px;
}
.quest__grid {
  margin: 0px 10px;
}
.quest__grid > div {
  display: grid;
  grid-template-columns: 140px auto 100px 100px 100px;
  justify-items: center;
  align-items: center;
  padding: 8px 15px;
}
.quest__grid-row {
  background: white;
  color: #55287e;
}
.quest__grid-row:nth-child(even) {
  background: rgb(230, 230, 230);
}
.quest__grid-header {
  border-radius: 5px 5px 0px 0px;
  color: white;
  background: #8e75ae;
}
.grid-row__content {
  justify-self: start;
}
.grid-row__status {
  text-align: center;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  width: 90px;
  color: white;
  border-radius: 5px;
}
.grid-row__status.finished {
  background: linear-gradient(
    135deg,
    orange,
    30%,
    rgba(255, 166, 0, 0.5),
    70%,
    orange
  );
}
.grid-row__status.finishable {
  background: linear-gradient(135deg, #66448e, 30%, #67448e77, 70%, #66448e);
  cursor: pointer;
}
.grid-row__status.unfinished {
  background: linear-gradient(
    135deg,
    grey,
    30%,
    rgba(128, 128, 128, 0.459),
    70%,
    grey
  );
}
.dialog__title {
  font-size: 22px;
}
.dialog__content {
  font-size: 18px;
  background: white;
  padding: 15px;
  margin: 0px 10px;
  border-radius: 5px;
}
</style>
<style>
.dialog-notification .v-card__text {
  padding-top: 0px;
}
.dialog-notification .v-card__actions {
  justify-content: center;
}
.dialog-notification .f-block .content {
  padding: 0px;
  margin: 0px;
}
</style>
