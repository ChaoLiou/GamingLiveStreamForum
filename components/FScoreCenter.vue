<template>
  <div class="f-score-center">
    <f-block
      :font-size="22"
      :line-height="0"
      :content-left-margin="!$vuetify.breakpoint.xs ? undefined : 10"
      :content-right-margin="30"
      :title="$t('fScoreCenter.score_center')"
      background-color="#eadbf8"
    >
      <div class="content">
        <div class="tabs">
          <div
            :class="[selectedTab === 'myscores' ? 'selected' : '']"
            @click="selectedTab = 'myscores'"
          >{{ $t("fScoreCenter.my_scores") }}</div>
          <div
            :class="[selectedTab === 'accountinfo' ? 'selected' : '']"
            @click="selectedTab = 'accountinfo'"
          >{{ $t("fScoreCenter.account_info") }}</div>
        </div>
        <div class="tab-content">
          <f-my-score v-if="selectedTab === 'myscores'"></f-my-score>
          <f-account-info v-else-if="selectedTab === 'accountinfo'"></f-account-info>
        </div>
      </div>
    </f-block>
  </div>
</template>
<script>
import FBlock from "@/components/FBlock";
import FMyScore from "@/components/FMyScore";
import FAccountInfo from "@/components/FAccountInfo";
import fakeScore from "@/assets/json/fake/score";
import formatter from "@/assets/utils/formatter";
import helper from "@/assets/utils/helper";
import { _ } from "underscore";
export default {
  components: {
    FBlock,
    FMyScore,
    FAccountInfo
  },
  data() {
    return {
      dateFrom: "",
      dateTo: "",
      datepickerMenu: {
        dateFrom: false,
        dateTo: false
      },
      selectedTab: "myscores",
      scores: 800,
      remaingTime: "",
      dialog: false,
      selectedProgramId: "",
      selectedAmountOfProgram: undefined,
      scores_cost: "----",
      remarks: "",
      validationMessage: {
        remarks: ""
      },
      selectedStatus: "",
      searchedId: ""
    };
  },
  computed: {
    statusOptions() {
      return ["processing", "finished", "failed"].map(x => ({
        text: this.$t(`fScoreCenter.${x}`),
        value: x
      }));
    },
    isCurrntScoreShort() {
      return this.scores_cost > this.scores;
    },
    submitable() {
      return (
        this.selectedProgramId &&
        this.selectedAmountOfProgram &&
        !this.isCurrntScoreShort
      );
    },
    list() {
      return _.sortBy(fakeScore, "date").reverse();
    },
    programOptions() {
      return this.list.map(x => ({
        text: x.content,
        value: x.id
      }));
    },
    amountOfProgramOptions() {
      const target = this.list.find(x => x.id === this.selectedProgramId);
      if (target) {
        return Array.from({ length: target.amount }).map((x, i) => ++i);
      }
    }
  },
  watch: {
    selectedProgramId(value) {
      const target = this.list.find(x => x.id === value);
      this.selectedAmountOfProgram = target ? 1 : undefined;
    },
    selectedAmountOfProgram(value) {
      const target = this.list.find(x => x.id === this.selectedProgramId);
      this.scores_cost = target ? target.scores * value : "----";
    }
  },
  mounted() {
    this.initCountDown();
  },
  methods: {
    searchByDateRange() {},
    searchById() {},
    submit() {
      if (this.remarks.length > 15) {
      }
      this.validationMessage.remarks = this.$t(
        "fScoreCenter.remarks_input_validation"
      );
      return;
    },

    clickStatusButton(status) {
      if (status === "finishable") {
        this.dialog = true;
      }
    },
    initCountDown() {
      const { hour, minute } = this.countdown();
      this.remaingTime = `${hour ? hour : ""}${this.$t(
        "fscoreCenter.hour"
      )}${minute}${this.$t("fscoreCenter.minute")}`;
    },
    countdown: helper.countdown,
    fgamepoint: formatter.fgamepoint
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
  background: rgb(206, 206, 206);
  max-height: 900px;
  border-radius: 0px 5px 5px 5px;
  font-size: 18px;
}
</style>
