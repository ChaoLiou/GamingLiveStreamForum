<template>
  <div class="f-score-center">
    <div class="manipulate-container">
      <div>
        <img
          style="display:inline;width:40px;height:40px;vertical-align:middle;margin-right:-15px"
          src="/misc_icons/Coin.png"
        />
        <span>{{ $t("fScoreCenter.holding_now") }}：{{ fgamepoint(gamepoint) }}{{ $t("fScoreCenter.unit") }}</span>
      </div>
      <div>
        <img
          style="display:inline;width:40px;height:40px;vertical-align:middle;margin-right:-15px"
          src="/misc_icons/Coin.png"
        />
        <span>{{ $t("fScoreCenter.account_accumulated") }}：{{ fgamepoint(accumulatedGamepoint)}}{{ $t("fScoreCenter.unit") }}</span>
      </div>
      <div style="display:grid;grid-template-columns:400px 300px;grid-column-gap:20px">
        <div style="display:grid;grid-template-columns:100px auto;align-items:center">
          {{ $t("fScoreCenter.manipulate_score") }}：
          <v-select
            dark
            dense
            background-color="#55287e"
            color="white"
            single-line
            hide-details
            outline
            :items="programOptions"
            v-model="selectedProgramId"
            :placeholder="$t('fScoreCenter.manipulate_score_input_placeholder')"
          ></v-select>
        </div>
        <div style="display:grid;grid-template-columns:60px 100px;align-items:center">
          {{ $t("fScoreCenter.amount") }}：
          <v-select
            dark
            dense
            background-color="#55287e"
            color="white"
            single-line
            hide-details
            outline
            :items="amountOfProgramOptions"
            v-model="selectedAmountOfProgram"
          ></v-select>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:100px 100px 130px;">
        <div>{{ $t("fScoreCenter.program_consumed") }}：</div>
        <div>{{ scores_cost }}{{ $t("fScoreCenter.unit") }}</div>
        <div
          v-if="isCurrntScoreShort"
          style="color:red;"
        >{{ $t("fScoreCenter.current_scores_short") }}</div>
      </div>
      <div style="display:grid;grid-template-columns:100px auto 100px;align-items:center">
        {{ $t("fScoreCenter.remarks") }}：
        <div>
          <div class="validation-message">{{ validationMessage.remarks }}</div>
          <v-text-field
            dark
            outline
            single-line
            hide-details
            :placeholder="$t('fScoreCenter.remarks_input_placeholder')"
            v-model="remarks"
            @keyup="validationMessage.remarks = ''"
          ></v-text-field>
        </div>
        <v-btn
          :disabled="!submitable"
          :class="[submitable ? 'theme' : '']"
          @click="submit"
        >{{ $t("fScoreCenter.submit_to_apply") }}</v-btn>
      </div>
    </div>
    <f-block
      :font-size="22"
      :line-height="0"
      :content-left-margin="10"
      :content-right-margin="30"
      :title="$t('fScoreCenter.manipulate_score_records')"
      background-color="rgb(206, 206, 206)"
    >
      <div class="all-filter__grid">
        <div class="date-range__grid">
          <div>{{ $t("fScoreCenter.time_filter") }}：</div>
          <v-menu
            v-model="datepickerMenu.dateFrom"
            :close-on-content-click="false"
            lazy
            offset-y
            nudge-left="14px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateFrom"
                dark
                single-line
                hide-details
                persistent-hint
                outline
                readonly
                v-on="on"
                class="date-range__input"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateFrom"
              locale="zh-cn"
              no-title
              @input="datepickerMenu.dateFrom = false"
            ></v-date-picker>
          </v-menu>
          <div>~</div>
          <v-menu
            v-model="datepickerMenu.dateTo"
            :close-on-content-click="false"
            lazy
            offset-y
            nudge-left="14px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateTo"
                dark
                single-line
                hide-details
                persistent-hint
                outline
                readonly
                v-on="on"
                class="date-range__input"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateTo"
              locale="zh-cn"
              no-title
              @input="datepickerMenu.dateTo = false"
            ></v-date-picker>
          </v-menu>
        </div>
        <div class="status-filter__grid">
          <div>{{ $t("fScoreCenter.process_status") }}：</div>
          <v-select
            class="status__select"
            dark
            dense
            background-color="#55287e"
            color="white"
            single-line
            hide-details
            outline
            :items="statusOptions"
            v-model="selectedStatus"
          ></v-select>
          <v-btn class="theme" @click="searchByDateRange">
            {{
            $t("fScoreCenter.search_in_range")
            }}
          </v-btn>
        </div>
        <div class="id-search__grid">
          <div>{{ $t("fScoreCenter.search_id") }}：</div>
          <v-text-field v-model="searchedId" dark single-line hide-details persistent-hint outline></v-text-field>
          <v-btn class="theme" @click="searchById">
            {{
            $t("fScoreCenter.search_id")
            }}
          </v-btn>
        </div>
      </div>
    </f-block>
    <div class="score__grid">
      <div class="score__grid-header">
        <div>{{ $t("fScoreCenter.manipulate_date") }}</div>
        <div>{{ $t("fScoreCenter.id") }}</div>
        <div>{{ $t("fScoreCenter.program") }}</div>
        <div>{{ $t("fScoreCenter.amount") }}</div>
        <div style="justify-self:end">{{ $t("fScoreCenter.scores_consumed") }}</div>
        <div>{{ $t("fScoreCenter.remarks") }}</div>
        <div>{{ $t("fScoreCenter.process_status") }}</div>
      </div>
      <div class="score__grid-row" v-for="(item, index) in list" :key="index">
        <div>{{ item.date }}</div>
        <div>{{ item.id }}</div>
        <div class="grid-row__content">{{ item.content }}</div>
        <div>{{ item.amount }}</div>
        <div class="grid-row__scores">
          <img
            style="display:inline;width:40px;height:40px;vertical-align:middle;margin-right:-15px"
            src="/misc_icons/Coin.png"
          />
          <span>{{ fgamepoint(item.scores * item.amount) }}{{ $t("fScoreCenter.unit") }}</span>
        </div>
        <div class="grid-row__remark">{{ item.remarks }}</div>
        <div
          :class="['grid-row__status', item.status]"
          @click="openDialog(item)"
        >{{ $t(`fScoreCenter.${item.status}`) }}</div>
      </div>
    </div>
    <v-dialog content-class="dialog-notification" max-width="500px" v-model="dialog">
      <v-card color="#eadbf8">
        <f-block
          :font-size="22"
          :line-height="0"
          :content-left-margin="10"
          :content-right-margin="10"
          :title="$t('fScoreCenter.status_info')"
          background-color="#eadbf8"
        ></f-block>
        <v-card-text>
          <div class="dialog__content" v-html="dialogContent"></div>
        </v-card-text>
        <v-card-actions>
          <v-btn class="theme" @click="dialog = false">
            {{
            $t("fScoreCenter.submit")
            }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import FBlock from "@/components/FBlock";
import fakeScore from "@/assets/json/fake/score";
import formatter from "@/assets/utils/formatter";
import helper from "@/assets/utils/helper";
import { _ } from "underscore";
export default {
  components: {
    FBlock
  },
  props: {
    gamepoint: {
      type: Number,
      default: 0
    },
    accumulatedGamepoint: {
      type: Number,
      default: 0
    }
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
      searchedId: "",
      dialogContent: ""
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
    openDialog(record) {
      this.dialog = true;
      const map = {
        processing: this.$t("fScoreCenter.status_info_msg_1"),
        finished: this.$t("fScoreCenter.status_info_msg_2"),
        failed: this.$t("fScoreCenter.status_info_msg_3")
      };
      this.dialogContent = map[record.status];
    },
    searchByDateRange() {},
    searchById() {},
    submit() {
      if (this.remarks.length > 15) {
        this.validationMessage.remarks = this.$t(
          "fScoreCenter.remarks_input_validation"
        );
        return;
      }
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
.manipulate-container {
  margin: 20px 15px;
  color: #55287e;
  font-weight: bold;
}
.manipulate-container > div {
  margin: 5px 0px;
}
.score__grid {
  margin: -20px 10px 10px 10px;
}
.score__grid > div {
  display: grid;
  grid-template-columns: 100px 100px 250px 50px 100px 1fr 100px;
  justify-items: center;
  align-items: center;
  padding: 8px 15px;
  grid-column-gap: 5px;
}
.score__grid-row {
  background: white;
  color: #55287e;
}
.score__grid-row:nth-child(even) {
  background: rgb(230, 230, 230);
}
.score__grid-header {
  border-radius: 5px 5px 0px 0px;
  color: white;
  background: #8e75ae;
}
.grid-row__content,
.grid-row__remark {
  justify-self: start;
}
.grid-row__status {
  text-align: center;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  width: 90px;
  border-radius: 5px;
  text-decoration: underline;
  cursor: pointer;
}
.grid-row__status.processing {
  color: orange;
}
.grid-row__status.finished {
  color: green;
}
.grid-row__status.failed {
  color: red;
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
.date-range__grid {
  grid-template-columns: 90px 140px 0px 18px 140px 0px;
}
.status-filter__grid {
  grid-template-columns: 90px 140px 100px;
}
.id-search__grid {
  grid-template-columns: 90px 140px 100px;
}
.date-range__input {
  width: 140px;
}
.status__select {
  width: 140px;
}
.all-filter__grid {
  color: #55287e;
  font-weight: bold;
  display: grid;
  grid-template-columns: 430px auto;
  margin-left: 20px;
}
.all-filter__grid > div {
  justify-items: center;
  align-items: center;
  grid-column-gap: 5px;
  display: grid;
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
