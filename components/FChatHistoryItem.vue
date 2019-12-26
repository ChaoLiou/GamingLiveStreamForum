<template>
  <div class="f-chat-history-item" @click="clickItem">
    <v-badge overlap right color="red" :value="!chatRead">
      <template v-slot:badge>
        <span></span>
      </template>
      <v-avatar :color="avatar ? 'white' : undefined">
        <v-img :src="avatar"></v-img>
      </v-avatar>
    </v-badge>
    <div>
      <div class="item__title">
        <div class="item__title-name text-truncate" :title="nickname">
          {{ nickname }}
        </div>
        <div v-if="true">
          <span class="online-icon"></span>
          {{ $t("fMyMessage.online") }}
        </div>
        <div v-else></div>
      </div>
      <div
        v-if="chat.message"
        class="item__content text-truncate"
        :title="chat.message"
      >
        {{ chat.message }}
      </div>
    </div>
  </div>
</template>
<script>
import oms from "@/assets/json/official-member";
export default {
  props: {
    chat: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      oms,
      chatRead: false
    };
  },
  computed: {
    avatar() {
      return this.chat.sender && this.chat.sender.avatar
        ? this.chat.sender.avatar
        : "";
    },
    nickname() {
      return this.chat.sender ? this.chat.sender.nickname : "";
    }
  },
  mounted() {
    this.chatRead = this.chat.is_read;
  },
  methods: {
    clickItem() {
      this.doReadTheMessage(this.chat.id).then(res => {
        this.chatRead = true;
        this.$store.commit("setMessageRead", {
          system:
            this.chat.mtype === 1
              ? true
              : this.$store.getters["message_read"].system,
          alert:
            this.chat.mtype === 2
              ? true
              : this.$store.getters["message_read"].alert,
          private:
            this.chat.mtype === 0
              ? true
              : this.$store.getters["message_read"].private
        });
        console.log({ item: this.$store.getters["message_read"] });
      });
      this.$emit("click");
    }
  }
};
</script>
<style scoped>
.item__title {
  color: white;
  display: grid;
  font-size: 18px;
  grid-template-columns: 120px auto;
  justify-items: end;
}
.online-icon {
  width: 15px;
  height: 15px;
  margin-right: 10px;
  border-radius: 50%;
  display: inline-block;
  background: green;
}
.item__title-name {
  width: 100%;
  justify-self: start;
}
.item__content {
  font-size: 18px;
  color: #55287e;
}
</style>
