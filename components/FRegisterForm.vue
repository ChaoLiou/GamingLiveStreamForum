<template>
  <v-card class="f-register-form" color="#eadbf8">
    <v-btn dark class="close-btn" icon color="#8e75ae" @click="$emit('close')">
      <v-icon>clear</v-icon>
    </v-btn>
    <v-card-title primary-title>
      <div class="form-title">填寫個人資料</div>
    </v-card-title>
  </v-card>
</template>
<script>
export default {};
</script>
<style scoped>
.f-register-form {
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
</style>
