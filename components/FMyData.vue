<template>
  <div>
    <f-block
      :font-size="22"
      :line-height="0"
      :content-left-margin="10"
      :content-right-margin="30"
      :title="$t('fMyData.my_avatar')"
      background-color="#eadbf8"
    >
      <div class="avatar-container">
        <img ref="img" v-show="member.avatar || avatar" :src="member.avatar" @click="choose" />
        <div class="default-image" v-show="!member.avatar && !avatar" @click="choose"></div>
        <input
          ref="fileInput"
          v-show="false"
          type="file"
          @change="change"
          accept="image/jpeg, image/jpg, image/png"
        />
        <div class="avatar-actions">
          <v-btn dark color="#8e75ae" @click="choose">{{$t('fMyData.update')}}</v-btn>
          <div>{{$t('fMyData.uploaded_file_limits')}}</div>
          <div class="validation-message">{{ validationMessage.avatar }}</div>
        </div>
      </div>
    </f-block>
    <f-block
      :font-size="22"
      :line-height="0"
      :content-left-margin="10"
      :content-right-margin="30"
      :title="$t('fMyData.basic_info')"
      background-color="#eadbf8"
    >
      <div class="member-cols-container">
        <div class="member-col">
          <div></div>
          <div></div>
          <div></div>
          <div :style="{ 'text-align': 'center', color: '#8e75ae' }">{{$t('fMyData.public')}}</div>
        </div>
        <div class="member-col" v-for="(col, index) in memberCols" :key="index">
          <div>{{ $t(`_memberCols.${col.key}`) }}：</div>
          <v-text-field
            v-if="col.type === 'input'"
            outline
            dark
            single-line
            hide-details
            v-model="member[col.key]"
          ></v-text-field>
          <v-select
            dark
            dense
            outline
            single-line
            hide-details
            v-else-if="col.type === 'select'"
            :items="optionGroups[col.key]"
            v-model="member[col.key]"
          ></v-select>
          <v-menu
            v-else-if="col.type === 'datepicker'"
            v-model="datepickerMenu"
            :close-on-content-click="false"
            lazy
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="member[col.key]"
                dark
                single-line
                hide-details
                persistent-hint
                outline
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="member[col.key]"
              locale="zh-cn"
              no-title
              @input="datepickerMenu = false"
            ></v-date-picker>
          </v-menu>
          <div v-else>{{ member[col.key] }}</div>
          <div class="public-switch-container">
            <v-switch color="#8e75ae" v-if="col.switch" single-line hide-details></v-switch>
          </div>
        </div>
      </div>
    </f-block>
    <f-block
      :font-size="22"
      :line-height="0"
      :content-left-margin="10"
      :content-right-margin="30"
      :title="$t('fMyData.my_intro')"
      background-color="#eadbf8"
    >
      <div class="intro-container">
        <div class="intro-col">
          <div>{{$t('fMyData.brief_intro')}}：</div>
          <v-textarea outline hide-details auto-grow dark v-model="member.intro"></v-textarea>
          <div class="intro-input-info">{{$t('fMyData.brief_intro_textarea_info')}}</div>
        </div>
      </div>
    </f-block>
    <div class="save-all-btn">
      <v-btn block color="#8e75ae" dark>{{$t('fMyData.save')}}</v-btn>
    </div>
  </div>
</template>
<script>
import genderOptions from "@/assets/json/options/gender";
import locationOptions from "@/assets/json/options/location";
import memberCols from "@/assets/json/member-cols";
import FBlock from "@/components/FBlock";
export default {
  components: {
    FBlock
  },
  props: {
    member: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      avatar: undefined,
      validationMessage: {
        avatar: ""
      },
      memberCols,
      optionGroups: {
        gender: genderOptions,
        location: locationOptions
      },
      datepickerMenu: false
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
          this.validationMessage.avatar = "";
        } else {
          this.validationMessage.avatar = this.$t(
            "fMyData.avatar_input_validation_1"
          );
        }
      } else {
        this.validationMessage.avatar = this.$t(
          "fMyData.avatar_input_validation_2"
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
.avatar-container {
  display: grid;
  grid-template-columns: 190px auto;
}
.avatar-actions {
  font-size: 18px;
  align-self: end;
}
.avatar-actions button {
  font-size: 18px;
  margin: 0px 0px 10px 0px;
}
img {
  object-fit: cover;
}
.default-image,
img {
  margin: 0px 20px;
  cursor: pointer;
  height: 150px;
  width: 150px;
  border-radius: 10px;
}
.default-image {
  background: linear-gradient(45deg, #8e75ae, 30%, #8e75ae3d, 70%, #8e75ae);
}

.member-cols-container,
.intro-container {
  margin: 0px 15px;
}
.member-col {
  font-size: 20px;
  display: grid;
  grid-template-columns: 200px 400px minmax(auto, 0px) 70px;
  align-items: center;
  margin-bottom: 8px;
}
.public-switch-container {
  margin-left: 20px;
}
.intro-col {
  font-size: 20px;
  display: grid;
  grid-template-columns: 200px auto 100px;
}
.intro-input-info {
  grid-column: 2/3;
  grid-row: 2/3;
}
.save-all-btn {
  margin: 0px 30px 20px 30px;
}
</style>
