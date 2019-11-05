<template>
  <div class="news-type-id">
    <f-tab title="今日新聞" :tabs="tabs"></f-tab>
  </div>
</template>
<script>
import FTab from "@/components/FTab";
import newsTabs from "@/assets/json/tabs/news";
export default {
  components: {
    FTab
  },
  data() {
    return { tabs: [] };
  },
  computed: {
    mainTitle() {
      return this.$route.params.type
        ? newsTabs.find(x => this.$route.params.type === x.type).title
        : newsTabs[0].title;
    }
  },
  mounted() {
    this.tabs = newsTabs.map((x, index) => ({
      ...x,
      active: this.$route.params.type === x.type
    }));
  }
};
</script>
<style scoped>
</style>
