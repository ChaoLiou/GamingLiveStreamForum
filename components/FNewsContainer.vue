<template>
  <div class="f-news-container">
    <div>
      <template v-for="(item, index) in sourceGroupbyDate">
        <v-divider :key="`divider_${index}`"></v-divider>
        <div :key="`title_${index}`" class="date-title">{{fdate(item.key)}}</div>
        <template v-for="(jtem, jndex) in item.list">
          <v-divider :key="`divider_${index}_${jndex}`"></v-divider>
          <f-news-preview :key="`${index}_${jndex}`" :news="jtem"></f-news-preview>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import FNewsPreview from "@/components/FNewsPreview";
import helper from "@/assets/utils/helper";
import formatter from "@/assets/utils/formatter";
export default {
  components: {
    FNewsPreview
  },
  props: {
    source: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    sourceGroupbyDate() {
      return helper.groupby(this.source, "date");
    }
  },
  methods: {
    fdate: formatter.fdate
  }
};
</script>
<style scoped>
.f-news-container {
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 5px 10px;
}
.date-title {
  font-size: 25px;
  margin-top: 20px;
  color: #f79646;
  font-weight: bold;
}
</style>
