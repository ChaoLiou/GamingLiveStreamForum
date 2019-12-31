<template>
  <div class="f-temp-ad">
    <div v-for="(ad, index) in ads" :key="index">
      <a :href="ad.link" target="_blank" :title="ad.name">
        <img :alt="ad.name" border="0" :src="ad.src" />
      </a>
    </div>
  </div>
</template>
<script>
import ads from "@/assets/json/fake/ad.json";
export default {
  data() {
    return {
      ads
    };
  }
};
</script>
<style scoped>
.f-temp-ad,
.f-temp-ad img {
  width: 20vw;
}
</style>
