<template>
  <v-card class="f-login-form" color="#eadbf8">
    <v-btn dark class="close-btn" icon color="#8e75ae" @click="$emit('close')">
      <v-icon>clear</v-icon>
    </v-btn>
    <v-card-title primary-title>
      <div class="form-title">登入牽手直播</div>
    </v-card-title>
    <v-card-text class="tab-header">
      <div class="tab-title">登入/註冊</div>
    </v-card-text>
    <v-card-text class="content">
      <div class="phone-container">
        <v-label>手機號碼</v-label>
        <v-select
          class="area-code__select"
          dark
          dense
          background-color="#55287e"
          color="white"
          single-line
          hide-details
          outline
          :items="areaCodes"
          v-model="selectedAreaCode"
        ></v-select>
        <v-text-field
          dark
          outline
          single-line
          hide-details
          v-model="phoneNumber"
          placeholder="請輸入手機號碼"
          @keyup="validationMessage.phoneNumber = ''"
        ></v-text-field>
        <div class="validation-message">
          {{ validationMessage.phoneNumber }}
        </div>
      </div>
      <div class="captcha-container">
        <v-label>圖文驗證碼</v-label>
        <div class="captcha-grid">
          <v-text-field
            dark
            single-line
            hide-details
            outline
            v-model="captchaInput"
            placeholder="請輸入圖片內文字及數字"
            @keyup="validationMessage.captchaInput = ''"
          ></v-text-field>
          <f-identify
            :identify-code="captchaKey"
            @refresh="$emit('refresh-captcha')"
          ></f-identify>
        </div>
        <div class="validation-message">
          {{ validationMessage.captchaInput }}
        </div>
      </div>
      <div class="sms-validation-container">
        <v-label>簡訊驗證碼</v-label>
        <div class="sms-validation-grid">
          <v-text-field
            dark
            single-line
            hide-details
            outline
            v-model="smsValidationInput"
            placeholder="請輸入簡訊驗證碼"
            @keyup="validationMessage.smsValidationInput = ''"
          ></v-text-field>
          <v-btn color="#8e75ae" dark @click="smsValidation">取得驗證碼</v-btn>
          <div class="validation-message">
            {{ validationMessage.smsValidationInput }}
          </div>
        </div>
      </div>
      <div class="login-container">
        <div class="options-grid">
          <v-checkbox
            hide-details
            height="24px"
            v-model="rememberPhoneNumber"
            label="記住手機號碼"
          ></v-checkbox>
          <v-checkbox
            hide-details
            height="24px"
            v-model="remainLoginStatus"
            label="保持登入狀態"
          ></v-checkbox>
        </div>
        <div class="login-tips">公用電腦請記得登出，或開啟無痕模式</div>
        <div class="validation-message">{{ validationMessage.login }}</div>
        <v-btn block color="#8e75ae" dark @click="login">登入</v-btn>
      </div>
      <!-- <div class="divider-container">
        <div class="line"></div>
        <div>或是</div>
        <div class="line"></div>
      </div>
      <div class="oauth-container">
        <div>微信登入</div>
        <div>QQ登入</div>
      </div>-->
      <div>
        <div class="login-claims">
          登入後即代表您同意牽手論壇
          <a>服務條款</a>
          及
          <a>隱私權政策</a>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import FIdentify from "@/components/FIdentify";
export default {
  components: {
    FIdentify
  },
  props: {
    captchaKey: {
      type: String,
      default: ""
    },
    rememberPhoneNumber: {
      type: Boolean,
      default: false
    },
    remainLoginStatus: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      areaCodes: [
        { text: "CN+86", value: "+86" },
        { text: "TW+886", value: "+886" }
      ],
      selectedAreaCode: "+86",
      phoneNumber: "",
      captchaInput: "",
      smsValidationInput: "",
      validationMessage: {
        phoneNumber: "",
        captchaInput: "",
        smsValidationInput: "",
        login: ""
      },
      uuid: ""
    };
  },
  computed: {
    trimmedPhoneNumber() {
      return this.phoneNumber.startsWith("0")
        ? this.phoneNumber.slice(1)
        : this.phoneNumber;
    },
    fullPhoneNumber() {
      return `${this.selectedAreaCode}${this.trimmedPhoneNumber}`;
    }
  },
  watch: {
    captchaKey(value) {
      this.captchaInput = value;
    },
    username(value) {
      const res = /^\+(886|86)(.*?)$/.exec(value);
      if (res && res.length === 3) {
        this.selectedAreaCode = `+${res[1]}`;
        this.phoneNumber = `0${res[2]}`;
      } else {
        this.selectedAreaCode = this.areaCodes[0].value;
        this.phoneNumber = "";
      }
    }
  },
  mounted() {
    this.captchaInput = this.captchaKey;
  },
  methods: {
    async login() {
      if (this.inputValidation()) {
        const data = {
          uuid: this.uuid,
          otp: this.smsValidationInput,
          username: this.fullPhoneNumber
        };
        this.setCookie(this.rememberPhoneNumber, "rememberPhoneNumber");
        this.setCookie(this.remainLoginStatus, "remainLoginStatus");
        if (await this.checkUserExists()) {
          let response = {};
          let otpFailed = false;
          try {
            response = await this.$axios.post(
              `${this.memberApiPrefix}/user/LoginOrRegister/`,
              { ...data }
            );
          } catch (err) {
            otpFailed =
              err.response.status === 403 &&
              err.response.data === "otp auth failed!";
            console.dir(err);
          }

          if (!otpFailed && response && response.data) {
            this.setCookie(response.data.token, "token");
            this.setCookie(response.data.username, "username");
            this.setCookie(response.data.id, "id");
            this.$emit("loggedin", response.data.id);
          } else {
            console.log("otp auth failed!");
            console.log({ ...this.data });
          }
        } else {
          this.$emit("redirect-register", data);
        }
      }
    },
    inputValidation() {
      let success = true;
      if (!this.phoneNumber) {
        this.validationMessage.phoneNumber = "手機號碼不能為空";
        success = false;
      }
      if (!this.captchaInput) {
        this.validationMessage.captchaInput = "圖文驗證碼不能為空";
        success = false;
      }
      if (!this.smsValidationInput) {
        this.validationMessage.smsValidationInput = "簡訊驗證碼不能為空";
        success = false;
      }
      if (!success) {
        return false;
      }

      if (this.captchaInput !== this.captchaKey) {
        this.validationMessage.login = "圖文驗證碼錯誤";
        return false;
      }

      return true;
    },
    async checkUserExists() {
      let response = {};
      try {
        response = await this.$axios.get(
          `${this.memberApiPrefix}/user/check/${this.fullPhoneNumber}`
        );
        return response.data === "User exist";
      } catch (err) {
        return !(
          err.response.status === 404 &&
          err.response.data === "User does not exist"
        );
      }
    },
    async smsValidation() {
      const { data } = await this.$axios.post(
        `${this.memberApiPrefix}/otp/generate/`,
        {
          username: this.fullPhoneNumber,
          time: 90 * 2
        }
      );
      if (data && data.uuid) {
        this.smsValidationInput = data.otp;
        this.uuid = data.uuid;
      }
    }
  }
};
</script>
<style scoped>
.f-login-form {
  border-radius: 5px;
  position: relative;
}
.close-btn {
  position: absolute;
  right: 0px;
  border-radius: 50% !important;
}
.form-title {
  font-size: 20px;
  font-weight: bold;
  width: fit-content;
  margin: auto;
}
.v-card__title {
  padding-bottom: 0px;
}
.v-card__text {
  padding-top: 0px;
}
.tab-header {
  min-height: 32px;
  padding-bottom: 0px;
  border-bottom: 1px solid black;
  padding-left: 0px;
  padding-right: 0px;
  margin-left: 16px;
  margin-right: 16px;
  width: calc(100% - 32px);
}
.tab-title {
  padding: 0px 8px;
  font-size: 18px;
  font-weight: bold;
  width: fit-content;
  border-bottom: 4px solid black;
}
.content .v-label {
  font-size: 16px;
  color: black;
  font-weight: bold;
}
.content > div {
  margin-top: 15px;
}
.area-code__select {
  width: 200px;
  height: 32px;
}
.content > div > * {
  margin-top: 10px;
}
.sms-validation-grid,
.captcha-grid {
  display: grid;
  grid-template-columns: auto 150px;
}
.v-btn {
  border-radius: 5px;
}
.sms-validation-grid .v-btn {
  height: 35px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
}
.f-identify {
  margin-left: 8px;
}
.login-container {
  margin-top: 5px !important;
}
.options-grid {
  display: grid;
  grid-template-columns: 150px 150px;
}
.options-grid > div {
  margin-top: 0px;
}
.login-tips {
  font-size: 16px;
  color: #55287e;
}
.divider-container {
  font-size: 20px;
  display: grid;
  grid-template-columns: auto 60px auto;
}
.divider-container > div {
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #55287e;
  font-weight: bold;
}
.divider-container .line {
  border-bottom: 2px solid #55287e;
  height: 10px;
}
.oauth-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
}
.oauth-container > div {
  font-size: 20px;
  padding: 10px 50px;
  border: 1px solid black;
}
.login-claims {
  font-size: 16px;
  margin: auto;
  width: fit-content;
  color: #8e75ae;
}
.login-claims > a {
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  color: #55287e;
}
</style>
