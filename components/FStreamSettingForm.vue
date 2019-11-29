<template>
  <v-card color="#eadbf8">
    <v-btn dark class="close-btn" icon color="#8e75ae" @click="$emit('close')">
      <v-icon>clear</v-icon>
    </v-btn>
    <v-card-title primary-title>
      <div class="form-title">{{ $t("fStreamSettingForm.stream_setup") }}</div>
    </v-card-title>
    <v-card-text class="content">
      <div>
        <v-label>{{ $t("fStreamSettingForm.stream_platform") }}</v-label>
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
        <v-label>{{ $t("fStreamSettingForm.platform_id") }}</v-label>
        <v-text-field
          dark
          single-line
          hide-details
          outline
          v-model="platformIdInput"
          :placeholder="$t('fStreamSettingForm.platform_id_input_placeholder')"
          @keyup="validationMessage.platformIdInput = ''"
        ></v-text-field>
        <div class="validation-message">{{ validationMessage.platformIdInput }}</div>
      </div>
      <div>
        <v-label>{{ $t("fStreamSettingForm.stream_rating") }}</v-label>
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
        <v-label>{{ $t("fStreamSettingForm.game_category") }}</v-label>
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
        <v-label>{{ $t("fStreamSettingForm.sync_with_stream") }}</v-label>
        <v-checkbox
          hide-details
          v-model="streamSyncEnabled"
          :label="$t('fStreamSettingForm.sync_with_stream_enabled_text')"
        ></v-checkbox>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="tos-block">
      <div>{{ $t('fStreamSettingForm.stream_rules_title') }}：</div>
      <div v-html="$t('fStreamSettingForm.stream_rules_content')"></div>
      <div class="agree-actions">
        <v-checkbox
          hide-details
          v-model="tosAgreed"
          :label="$t('fStreamSettingForm.agreed_all_rules')"
        ></v-checkbox>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outline @click="$emit('close')">{{ $t('fStreamSettingForm.cancel') }}</v-btn>
      <v-btn
        :disabled="!tosAgreed"
        color="#55287e"
        :dark="tosAgreed"
        @click="submit"
      >{{ $t('fStreamSettingForm.submit') }}</v-btn>
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
          text: this.$t("fStreamSettingForm.rating_above_18y"),
          value: 0
        },
        {
          text: this.$t("fStreamSettingForm.rating_all"),
          value: 1
        }
      ],
      streamSyncEnabled: false,
      tosAgreed: false
    };
  },
  computed: {
    gameOptions() {
      return games.map(x => ({ value: x.id, text: this.$t(`_games.${x.id}`) }));
    },
    platformOptions() {
      return platforms.map(x => ({
        value: x.id,
        text: this.$t(`_platforms.${x.id}`)
      }));
    }
  },
  mounted() {
    this.selectedPlatform = this.platformOptions[0].value;
    this.selectedGame = this.gameOptions[0].value;
  },
  methods: {
    submit() {
      if (!this.platformIdInput) {
        this.validationMessage.platformIdInput = this.$t(
          "fStreamSettingForm.platform_id_input_validation"
        );
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
