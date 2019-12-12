<template>
  <nuxt-link class="f-stream-inline-preview" :to="streamLink">
    <v-avatar size="40px">
      <v-img :src="stream.streamer_image"></v-img>
    </v-avatar>
    <div>
      <div class="inline-preview__title">
        <div class="text-truncate">{{ stream.streamer_name }}</div>
        <div class="viewers-info">
          <span class="rec-icon"></span>
          {{ viewers }}
        </div>
      </div>
      <div class="inline-preview__content text-truncate">
        {{ stream.title }}
      </div>
    </div>
  </nuxt-link>
</template>
<script>
import helper from "@/assets/utils/helper";
import formatter from "@/assets/utils/formatter";
export default {
  props: {
    stream: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    viewers() {
      return formatter.fviewers(
        this.stream.viewers
          ? this.stream.viewers
          : Math.floor(this.random(1800, 3100))
      );
    },
    streamLink() {
      return `/stream/${this.stream.platform}/${this.stream.id}`;
    }
  },
  methods: {
    random: helper.random
  }
};
</script>
<style scoped>
.f-stream-inline-preview {
  display: grid;
  font-size: 16px;
  grid-template-columns: 40px auto;
  grid-column-gap: 10px;
  width: 268px;
  text-decoration: none;
}
.inline-preview__title {
  display: grid;
  grid-template-columns: 138px 80px;

  color: white;
}
.inline-preview__content {
  width: 218px;
  color: #55287e;
}
.rec-icon {
  width: 14px;
  height: 14px;
  background: red;
  border-radius: 50%;
  display: inline-block;
}
.viewers-info {
  justify-self: end;
}
</style>
