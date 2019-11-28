<template>
  <v-card color="#eadbf8">
    <v-btn dark class="close-btn" icon color="#8e75ae" @click="$emit('close')">
      <v-icon>clear</v-icon>
    </v-btn>
    <v-card-title primary-title>
      <div class="form-title">轉播設定</div>
    </v-card-title>
    <v-card-text class="content">
      <div>
        <v-label>實況平台</v-label>
        <v-select
          dark
          dense
          background-color="#55287e"
          color="white"
          single-line
          hide-details
          outline
          :items="platformOptions"
          v-model="selectedPlatform"
        ></v-select>
      </div>
      <div>
        <v-label>平台ID</v-label>
        <v-text-field
          dark
          single-line
          hide-details
          outline
          v-model="platformIdInput"
          placeholder="請輸入平台ID"
          @keyup="validationMessage.platformIdInput = ''"
        ></v-text-field>
        <div class="validation-message">
          {{ validationMessage.platformIdInput }}
        </div>
      </div>
      <div>
        <v-label>實況分級</v-label>
        <v-select
          dark
          dense
          background-color="#55287e"
          color="white"
          single-line
          hide-details
          outline
          :items="ratingOptions"
          v-model="selectedRating"
        ></v-select>
      </div>
      <div>
        <v-label>遊戲分類</v-label>
        <v-select
          dark
          dense
          background-color="#55287e"
          color="white"
          single-line
          hide-details
          outline
          :items="gameOptions"
          v-model="selectedGame"
        ></v-select>
      </div>
      <div>
        <v-label>實況同步</v-label>
        <v-checkbox
          hide-details
          v-model="streamSyncEnabled"
          label="同步到OO實況若不符合規範請取消勾選"
        ></v-checkbox>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="tos-block">
      <div>實況規範：</div>
      <div>
        <ol>
          <li>本服務僅提供遊戲實況使用。</li>
          <li>使用者需持有手機及電子支付認證。</li>
          <li>近期因站上違規被處分者，會被限期禁止使用本服務。</li>
          <li>設定關聯作品須遵守該社區版規，違規可能被禁止於該版宣傳。</li>
          <li>標題與圖像需與實況內容相關。</li>
          <li>內容須由本人經營，不可盜用他人實況。</li>
          <li>內容不得涉及謾罵、人身攻擊。</li>
          <li>無論分級為何，直播時皆須避免不必要的色情、血腥鏡頭。</li>
          <li>對於違反規範者，站方有權力中止其使用權限。</li>
        </ol>
      </div>
      <div class="agree-actions">
        <v-checkbox
          hide-details
          v-model="tosAgreed"
          label="我同意並遵守上述規範"
        ></v-checkbox>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outline @click="$emit('close')">取消</v-btn>
      <v-btn
        :disabled="!tosAgreed"
        color="#55287e"
        :dark="tosAgreed"
        @click="submit"
        >確認送出</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import platforms from "@/assets/json/platforms";
import games from "@/assets/json/games";
export default {
  data() {
    return {
      selectedPlatform: "",
      selectedRating: 1,
      selectedGame: "",
      platformIdInput: "",
      validationMessage: {
        platformIdInput: ""
      },
      ratingOptions: [
        {
          text: "需滿18歲觀看",
          value: 0
        },
        {
          text: "沒有年齡限制",
          value: 1
        }
      ],
      streamSyncEnabled: false,
      tosAgreed: false
    };
  },
  computed: {
    gameOptions() {
      return games.map(x => ({ value: x.id, text: x.title }));
    },
    platformOptions() {
      return platforms.map(x => ({ value: x.id, text: x.title }));
    }
  },
  mounted() {
    this.selectedPlatform = this.platformOptions[0].value;
    this.selectedGame = this.gameOptions[0].value;
  },
  methods: {
    submit() {
      if (!this.platformIdInput) {
        this.validationMessage.platformIdInput = "平台ID不得能為空";
        return;
      }
    }
  }
};
</script>
<style scoped>
.close-btn {
  position: absolute;
  right: 0px;
  border-radius: 50% !important;
}
.form-title {
  font-size: 20px;
  color: #55287e;
}
.content > div {
  margin-bottom: 10px;
}
.content .v-label {
  font-size: 16px;
  color: black;
  font-weight: bold;
}
.tos-block {
  font-size: 16px;
}
.agree-actions {
  width: fit-content;
  margin: auto;
}
</style>
