<template>
  <div class="f-score-center">
    <f-block
      :font-size="22"
      :line-height="0"
      :content-left-margin="10"
      :content-right-margin="30"
      :title="$t('fScoreCenter.score_center')"
      background-color="#eadbf8"
    ></f-block>
  </div>
</template>
<script>
import FBlock from "@/components/FBlock";
export default {
  components: {
    FBlock
  }
};
</script>
<style scoped>
</style>
