<template>
  <div class="f-account-info">
    <div v-html="$t('fScoreCenter.account_info_claims')"></div>
    <div class="account-info__grid">
      <div>
        <div>
          {{ $t("fScoreCenter.import_location") }}
          <span class="info-required_mark">*</span>：
        </div>
        <v-select
          dark
          dense
          background-color="#55287e"
          color="white"
          single-line
          hide-details
          outline
          :items="locationOptions"
          v-model="accountInfo.location"
        ></v-select>
      </div>
      <div>
        <div>
          {{ $t("fScoreCenter.bank_fullname")
          }}<span class="info-required_mark">*</span>：
        </div>
        <v-text-field
          dark
          outline
          single-line
          hide-details
          v-model="accountInfo.bankFullname"
        ></v-text-field>
      </div>
      <div>
        <div>
          {{ $t("fScoreCenter.bank_account")
          }}<span class="info-required_mark">*</span>：
        </div>
        <v-text-field
          dark
          outline
          single-line
          hide-details
          v-model="accountInfo.bankAccount"
        ></v-text-field>
      </div>
      <div>
        <div>
          {{ $t("fScoreCenter.acoount_name")
          }}<span class="info-required_mark">*</span>：
        </div>
        <v-text-field
          dark
          outline
          single-line
          hide-details
          v-model="accountInfo.accountName"
        ></v-text-field>
      </div>
      <div>
        <div>{{ $t("fScoreCenter.bank_swift_code") }}：</div>
        <v-text-field
          dark
          outline
          single-line
          hide-details
          v-model="accountInfo.bankSwiftCode"
        ></v-text-field>
      </div>
      <div>
        <div>
          {{ $t("fScoreCenter.open_bank_location")
          }}<span class="info-required_mark">*</span>：
        </div>
        <v-text-field
          dark
          outline
          single-line
          hide-details
          v-model="accountInfo.openBankLocation"
        ></v-text-field>
      </div>
      <div>
        <div>
          {{ $t("fScoreCenter.bank_belongs_city")
          }}<span class="info-required_mark">*</span>：
        </div>
        <v-text-field
          dark
          outline
          single-line
          hide-details
          v-model="accountInfo.bankBelongsCity"
        ></v-text-field>
      </div>
      <div>
        <div>
          {{ $t("fScoreCenter.check_company_account_or_not")
          }}<span class="info-required_mark">*</span>：
        </div>
        <v-radio-group v-model="accountInfo.isCompanyAccout">
          <v-radio
            v-for="v in [0, 1]"
            :key="v"
            :label="v ? '是' : '否'"
            :value="v"
            color="#55287e"
          ></v-radio>
        </v-radio-group>
      </div>
      <div>
        <div class="save-btn-container">
          <v-btn
            :class="[saveBtnDisabled ? '' : 'theme']"
            :disabled="saveBtnDisabled"
            >{{ $t("fScoreCenter.save_settings") }}</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      accountInfo: {
        location: 1,
        bankFullname: "",
        bankAccount: "",
        bankBelongsCity: "",
        openBankLocation: "",
        bankSwiftCode: "",
        openBankLocation: "",
        bankBelongsCity: "",
        isCompanyAccout: 0
      },
      optionals: ["bankSwiftCode"]
    };
  },
  computed: {
    saveBtnDisabled() {
      return Object.keys(this.accountInfo)
        .filter(x => !this.optionals.includes(x))
        .some(
          x => this.accountInfo[x] === undefined || this.accountInfo[x] === ""
        );
    },
    locationOptions() {
      return [
        { text: this.$t("fScoreCenter.china"), value: 1 },
        { text: this.$t("fScoreCenter.taiwan"), value: 2 },
        { text: this.$t("fScoreCenter.hongkong"), value: 3 }
      ];
    }
  }
};
</script>
<style scoped>
.f-account-info {
  margin: 20px;
  color: #8e75ae;
}
.account-info__grid {
  color: #55287e;
}
.account-info__grid {
  display: grid;
  grid-row-gap: 20px;
}
.account-info__grid > div {
  display: grid;
  grid-template-columns: 180px 400px;
  grid-column-gap: 10px;
  align-items: center;
}
.account-info__grid > div > div:first-child {
  justify-self: end;
}
.info-required_mark {
  color: red;
  font-weight: bold;
}
.v-input--radio-group {
  justify-self: center;
  align-self: center;
  margin: 0px;
  height: 32px;
  margin-top: 12px;
}
.v-radio {
  margin-bottom: 0px !important;
}
.save-btn-container {
  grid-column: 1/-1 !important;
}
</style>
<style>
.f-account-info .v-input--radio-group__input {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
