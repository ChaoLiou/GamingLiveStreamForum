<template>
  <v-card class="f-register-form" color="#eadbf8">
    <v-btn dark class="close-btn" icon color="#8e75ae" @click="$emit('close')">
      <v-icon>clear</v-icon>
    </v-btn>
    <v-card-title primary-title>
      <div class="form-title">填寫個人資料</div>
    </v-card-title>
    <v-card-title class="avatar-container">
      <div>
        <img v-show="avatar" ref="img" @click="choose" />
        <div class="default-image" v-show="!avatar" @click="choose"></div>
        <input
          ref="fileInput"
          v-show="false"
          type="file"
          @change="change"
          accept="image/jpeg, image/jpg, image/png"
        />
      </div>
      <v-btn color="#8e75ae" dark @click="choose">上傳</v-btn>
      <div class="validation-message">{{validationMessage}}</div>
      <div class="upload-info">檔案格式：JPG﹑PNG(500KB 以內)</div>
    </v-card-title>
    <v-card-text class="content">
      <div>
        <v-label>暱稱：</v-label>
        <v-text-field
          dark
          outline
          v-model="nickname"
          placeholder="取個讓人印象深刻的暱稱吧"
          counter="16"
          :rules="[v => !!v || '暱稱不能為空', v => v.length <= 16 || '超過字數']"
        ></v-text-field>
      </div>
      <div>
        <v-label>性別：</v-label>
        <v-select
          class="gender__select"
          dark
          dense
          background-color="#55287e"
          color="white"
          single-line
          hide-details
          outline
          :items="genders"
          v-model="selectedGender"
        ></v-select>
      </div>
      <div class="register-container">
        <v-btn block color="#8e75ae" dark>完成</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      nickname: "",
      gender: "",
      avatar: undefined,
      validationMessage: "",
      selectedGender: "1",
      genders: [
        { text: "男生", value: "1" },
        { text: "女生", value: "0" },
        { text: "你猜猜", value: "-1" }
      ]
    };
  },
  methods: {
    async change() {
      const types = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.fileInput.files[0];
      const limitSizeBytes = 500 * 1024;
      if (file && types.includes(file.type)) {
        if (file.size <= limitSizeBytes) {
          this.avatar = file;
          const img = this.$refs.img;
          const reader = new FileReader();
          reader.onload = function(e) {
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
          this.validationMessage = "";
        } else {
          this.validationMessage = "檔案大小超過 500 KB";
        }
      } else {
        this.validationMessage = "檔案類型不是 JPG 或 PNG";
      }
    },
    choose() {
      this.$refs.fileInput.click();
    }
  }
};
</script>
<style scoped>
.f-register-form {
  border-radius: 5px;
  position: relative;
}
.v-card__title {
  padding-bottom: 0px;
}
.v-card__text {
  padding-top: 0px;
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
.v-btn {
  border-radius: 5px;
}
.avatar-container {
  display: grid;
  justify-items: center;
}
img {
  object-fit: cover;
}
.default-image,
img {
  cursor: pointer;
  height: 150px;
  width: 150px;
  border-radius: 10px;
  background: linear-gradient(45deg, #8e75ae, 30%, #8e75ae3d, 70%, #8e75ae);
}
.upload-info {
  font-size: 16px;
  color: #8e75ae;
  font-weight: bold;
}
.content {
  display: grid;
}
.content .v-label {
  font-size: 16px;
  color: black;
  font-weight: bold;
}
.content > div {
  margin-top: 15px;
}
.content > div > * {
  margin-top: 5px;
}
.validation-message {
  margin-top: 5px;
  color: red;
}
.gender__select {
  width: 200px;
  height: 32px;
}
</style>
<style>
.f-register-form .v-btn__content {
  font-size: 16px;
}
.f-register-form .v-text-field .v-input__control {
  background: #55287e;
  border-radius: 5px;
}
.f-register-form .v-select__selections input {
  margin: 0px !important;
  padding: 0px !important;
}
.f-register-form .v-input__slot,
.f-register-form .v-select__selections {
  min-height: auto !important;
  max-height: 32px !important;
  border-radius: 5px !important;
  border-color: #55287e !important;
}
.f-register-form .v-input__slot:hover {
  border-color: #55287e !important;
}
.f-register-form .v-input__append-inner {
  margin-top: 0px !important;
}
.f-register-form .v-text-field__slot input {
  margin: 5px 0px !important;
  padding: 3px 0px !important;
}
.v-menu__content .v-list {
  background: #55287e;
  border-radius: 5px !important;
}
.v-menu__content .v-list__tile__title {
  font-size: 16px;
  color: white !important;
}
.v-select-list.v-card {
  background: transparent !important;
}
.f-register-form .v-btn__content {
  font-size: 16px;
}
.f-register-form .v-messages__message,
.f-register-form .v-counter {
  font-size: 16px;
}
</style>
