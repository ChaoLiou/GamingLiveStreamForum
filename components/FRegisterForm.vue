<template>
  <v-card class="f-register-form" color="#eadbf8">
    <v-btn dark class="close-btn" icon color="#8e75ae" @click="$emit('close')">
      <v-icon>clear</v-icon>
    </v-btn>
    <v-card-title primary-title>
      <div class="form-title">
        {{ $t("fRegisterForm.fill_in_account_info") }}
      </div>
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
      <v-btn color="#8e75ae" dark @click="choose">{{
        $t("fRegisterForm.upload")
      }}</v-btn>
      <div class="validation-message">{{ validationMessage.avatar }}</div>
      <div class="upload-info">
        {{ $t("fRegisterForm.uploaded_file_limits") }}
      </div>
    </v-card-title>
    <v-card-text class="content">
      <div>
        <v-label>{{ $t("fRegisterForm.nickname") }}：</v-label>
        <v-text-field
          dark
          outline
          single-line
          hide-details
          v-model="nickname"
          :placeholder="$t('fRegisterForm.nickname_input_placeholder')"
          @input="nicknameInput"
        ></v-text-field>
        <div class="nickname-input__container">
          <div class="validation-message">{{ validationMessage.nickname }}</div>
          <div
            :class="[
              'nickname-counter',
              isNicknameOutOfLimit ? 'validation-message' : ''
            ]"
          >
            {{ nicknameCounter }} / {{ nicknameCounterLimits }}
          </div>
        </div>
      </div>
      <div>
        <v-label>{{ $t("fRegisterForm.gender") }}：</v-label>
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
        <v-btn block color="#8e75ae" dark @click="register">{{
          $t("fRegisterForm.finish")
        }}</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import genderOptions from "@/assets/json/options/gender";
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      nickname: "",
      gender: "",
      avatar: undefined,
      validationMessage: {
        nickname: "",
        avatar: ""
      },
      selectedGender: 1,
      genders: genderOptions,
      otpFailed: false,
      memberUpdated: true,
      nicknameCounter: 0,
      nicknameCounterLimits: 16
    };
  },
  computed: {
    isNicknameOutOfLimit() {
      return this.nicknameCounter > this.nicknameCounterLimits;
    }
  },
  methods: {
    nicknameInput(value) {
      this.validationMessage.nickname = "";
      let counter = 0;
      [...value].forEach(char => {
        if (/[\u4e00-\u9fa5\u3105-\u3129]/.test(char)) {
          counter += 2;
        } else {
          counter++;
        }
      });
      this.nicknameCounter = counter;
    },
    async register() {
      if (!this.nickname) {
        this.validationMessage.nickname = this.$t(
          "fRegisterForm.nickname_input_vaildation_1"
        );
        return;
      } else if (this.isNicknameOutOfLimit) {
        this.validationMessage.nickname = this.$t(
          "fRegisterForm.nickname_input_vaildation_2"
        );
      }

      let response = {};
      try {
        response = await this.$axios.post(
          `${this.memberApiPrefix}/user/LoginOrRegister/`,
          { ...this.data }
        );
      } catch (err) {
        this.otpFailed =
          err.response.status === 403 &&
          err.response.data === "otp auth failed!";
        console.dir(err);
      }

      if (!this.otpFailed && response && response.data) {
        this.setCookie(response.data.token, "token");
        this.setCookie(response.data.username, "username");
        this.setCookie(response.data.id, "id");

        try {
          const formData = new FormData();
          if (this.avatar) {
            formData.append("avatar", this.avatar);
          }
          formData.append("nickname", this.nickname);
          formData.append("gender", this.selectedGender);
          const { data } = await this.$axios.put(
            `${this.memberApiPrefix}/user/${response.data.id}/`,
            formData
          );
        } catch (err) {
          this.memberUpdated = false;
          console.dir(err);
        }

        if (this.memberUpdated) {
          this.$emit("register", true);
        }
      } else {
        console.log("otp auth failed!");
        console.log({ ...this.data });
      }
    },
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
          this.validationMessage.avatar = "";
        } else {
          this.validationMessage.avatar = this.$t(
            "fRegisterForm.avatar_input_vaildation_1"
          );
        }
      } else {
        this.validationMessage.avatar = this.$t(
          "fRegisterForm.avatar_input_vaildation_2"
        );
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

.nickname-input__container {
  margin-top: 5px !important;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.nickname-counter {
  font-size: 16px;
  font-weight: bold;
  justify-self: end;
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
