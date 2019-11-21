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
          single-line
          hide-details
          outline
          v-model="phoneNumber"
          placeholder="請輸入手機號碼"
        ></v-text-field>
        <div class="validation-message">{{validationMessage}}</div>
      </div>
      <div class="captcha-container">
        <v-label>圖文驗證碼</v-label>
        <v-text-field
          dark
          single-line
          hide-details
          outline
          v-model="captchaInput"
          placeholder="請輸入圖片內文字及數字"
        ></v-text-field>
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
          ></v-text-field>
          <v-btn color="#8e75ae" dark>取得驗證碼</v-btn>
        </div>
      </div>
      <div class="login-container">
        <div class="options-grid">
          <v-checkbox hide-details height="24px" v-model="rememberPhoneNumber" label="記住手機號碼"></v-checkbox>
          <v-checkbox hide-details height="24px" v-model="remainLoginStatus" label="保持登入狀態"></v-checkbox>
        </div>
        <div class="login-tips">公用電腦請記得登出，或開啟無痕模式</div>
        <v-btn block color="#8e75ae" dark>登入</v-btn>
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
export default {
  data() {
    return {
      areaCodes: ["CN+86"],
      selectedAreaCode: "CN+86",
      phoneNumber: "0928123456",
      captchaInput: "jw62K",
      smsValidationInput: "123qwe",
      validationMessage: "手機號碼不能為空",
      rememberPhoneNumber: false,
      remainLoginStatus: false
    };
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
  margin-top: 5px;
}
.phone-container .validation-message {
  margin-top: 5px;
  color: red;
}
.sms-validation-grid {
  display: grid;
  grid-template-columns: auto 110px;
}
.v-btn {
  border-radius: 5px;
}
.sms-validation-grid .v-btn {
  height: 30px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
}
.login-container {
  margin-top: 5px !important;
}
.options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
<style>
.f-login-form .v-text-field .v-input__control {
  background: #55287e;
  border-radius: 5px;
}
.f-login-form .v-select__selections input {
  margin: 0px !important;
  padding: 0px !important;
}
.f-login-form .v-input__slot,
.f-login-form .v-select__selections {
  min-height: auto !important;
  max-height: 32px !important;
  border-radius: 5px !important;
  border-color: #55287e !important;
}
.f-login-form .v-input__slot:hover {
  border-color: #55287e !important;
}
.f-login-form .v-input__append-inner {
  margin-top: 0px !important;
}
.f-login-form .v-text-field__slot input {
  margin: 0px !important;
  padding: 3px 0px !important;
}
.v-menu__content .v-list {
  background: #55287e;
  border-radius: 5px !important;
}
.v-menu__content .v-list__tile__title {
  font-size: 16px;
}
.v-select-list.v-card {
  background: transparent !important;
}
.f-login-form .v-btn__content {
  font-size: 16px;
}
</style>
