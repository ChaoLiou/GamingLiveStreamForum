<template>
  <div class="chatroom-type chat-form__room-area">
    <div class="contactor-info">
      <template v-if="chat">
        <v-avatar :color="chat.sender.avatar ? 'white' : undefined">
          <v-img :src="chat.sender.avatar ? chat.sender.avatar : ''"></v-img>
        </v-avatar>
        <div>{{ chat.sender.nickname }}</div>
      </template>
    </div>
    <div
      :class="[
        'chat-content-container',
        scrollable.history ? 'scrollable' : ''
      ]"
      ref="chatContainer"
    >
      <template v-if="chat">
        <div
          class="msg-content msg-content__from"
          v-for="(message, index) in messages"
          :key="index"
        >
          <div class="msg-content__main">{{ message.message }}</div>
          <span class="msg-content__datetime">{{
            fdatetime(message.timestamp)
          }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { _ } from "underscore";
import formatter from "@/assets/utils/formatter";
import oms from "@/assets/json/official-member";
export default {
  data() {
    return {
      allMTypeMessages: [],
      oms,
      scrollable: {
        chat: false,
        history: false
      }
    };
  },
  computed: {
    chat() {
      const target = this.oms.find(x => x.alias === this.$route.params.type);
      const message = this.allMTypeMessages
        .filter(x => x.length > 0)
        .map(x => x[0])
        .find(x => x.mtype !== 0 && x.mtype === target.id);
      if (message) {
        return {
          ...message,
          sender: {
            avatar: target ? target.avatar : "",
            nickname: target ? target.name : ""
          },
          mtype_name: target.alias
        };
      }
    },
    messages() {
      let list = [];
      if (this.chat.mtype === 1) {
        list = this.allMTypeMessages[0];
      } else if (this.chat.mtype === 2) {
        list = this.allMTypeMessages[1];
      }
      return _.sortBy(list, "timestamp");
    }
  },
  watch: {
    chat(value) {
      if (value) {
        const target = this.oms.find(x => x.alias === this.$route.params.type);
        this.doReadTheMessage(this.chat.id).then(res => {
          this.$store.commit("setMessageRead", {
            system:
              target.id === 1
                ? true
                : this.$store.getters["message_read"].system,
            alert:
              target.id === 2
                ? true
                : this.$store.getters["message_read"].alert,
            private:
              target.id === 0
                ? true
                : this.$store.getters["message_read"].private
          });
          console.log({ "chatroom-type": this.$store.getters["message_read"] });
        });
      }
    }
  },
  updated() {
    this.scrollable.history =
      this.$refs.chatContainer.scrollHeight >
      this.$refs.chatContainer.offsetHeight;
    this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
  },
  mounted() {
    const id = this.getCookie("id");
    if (!!id) {
      this.getChatHistory(id).then(res => {
        this.allMTypeMessages = res;
      });
    }
  },
  methods: {
    fdatetime: formatter.fdatetime
  }
};
</script>
<style scoped>
.chatroom-type {
  margin-top: 56px;
}
.chat-form__room-area {
  border-radius: 0px 10px 10px 0px;
  background: rgba(128, 128, 128, 0.3);
}
.contactor-info {
  display: grid;
  grid-template-columns: 48px auto;
  grid-column-gap: 20px;
  height: 65px;
  border-bottom: 3px solid #55287e;
  padding: 8px 20px;
  color: #55287e;
  font-size: 18px;
  align-items: center;
}
.chat-content-container {
  padding: 0px 20px;
  margin-top: 20px;
  max-height: calc(100vh - 56px - 36px - 65px - 20px);
  min-height: calc(100vh - 56px - 36px - 65px - 20px);
  overflow-x: hidden;
  overflow-y: hidden;
}
.chat-content-container.scrollable {
  overflow-y: scroll;
}
.msg-content {
  width: fit-content;
  max-width: 80%;
  background: white;
  font-size: 16px;
  padding: 10px;
  border: 1.5px solid #55287e;
  margin-bottom: 10px;
}
.msg-content__from {
  border-radius: 0px 15px 15px 15px;
}
.msg-content__to {
  border-radius: 15px 0px 15px 15px;
}
.msg-content__main {
  display: inline-block;
}
.msg-content__datetime {
  display: block;
  font-weight: bold;
  color: #55287e;
}
</style>
