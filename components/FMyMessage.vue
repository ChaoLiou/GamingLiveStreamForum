<template>
  <div class="f-my-message">
    <f-block
      :font-size="22"
      :line-height="0"
      :content-left-margin="10"
      :content-right-margin="30"
      :title="$t('fMyMessage.my_msg')"
      background-color="#eadbf8"
    >
      <div class="chat-form">
        <div class="chat-form__history-area">
          <div class="history__tabs">
            <!-- <div :class="[selectedTab === 'msg' ? 'active' : '']" @click="selectedTab = 'msg'">
              <v-badge overlap right color="red">
                <template v-slot:badge>
                  <span v-if="newMessage"></span>
                </template>
                <span>{{$t('fMyMessage.private_msg')}}</span>
              </v-badge>
            </div>-->
            <div :class="[selectedTab === 'amt' ? 'active' : '']" @click="selectedTab = 'amt'">
              <v-badge overlap right color="red">
                <template v-slot:badge>
                  <span v-if="newAnnoucement"></span>
                </template>
                <span>{{$t('fMyMessage.official_msg')}}</span>
              </v-badge>
            </div>
          </div>
          <div :class="['history__list', scrollable.chat ? 'scrollable' : '']" ref="chatList">
            <template v-if="chatList.length > 0">
              <div
                :class="['history__item', selectedChat && chat.name === selectedChat.name ? 'selected' : '']"
                v-for="(chat, index) in chatList"
                :key="index"
                @click="selectedChat = chat"
              >
                <v-badge overlap right color="red">
                  <template v-slot:badge>
                    <span></span>
                  </template>
                  <v-avatar :color="chat.avatar ? 'white' : undefined">
                    <v-img :src="chat.avatar"></v-img>
                  </v-avatar>
                </v-badge>
                <div>
                  <div class="item__title">
                    <div class="item__title-name text-truncate" :title="chat.name">{{chat.name}}</div>
                    <div v-if="chat.status.online">
                      <span class="online-icon"></span>
                      {{$t('fMyMessage.online')}}
                    </div>
                    <div v-else>{{chat.status.lasttime}}</div>
                  </div>
                  <div
                    v-if="chat.histories.length > 0 "
                    class="item__content text-truncate"
                    :title="chat.histories[chat.histories.length - 1].content"
                  >{{chat.histories[chat.histories.length - 1].content}}</div>
                </div>
              </div>
            </template>
            <div v-else class="none-info__chat">{{$t('fMyMessage.no_any_msg')}}</div>
          </div>
          <!-- <div class="collapsed-drawer">
            <div>{{$t('fMyMessage.stranger')}} ＞</div>
          </div>
          <div class="collapsed-drawer">
            <div>{{$t('fMyMessage.blacklist')}} ＞</div>
          </div>-->
        </div>
        <div class="chat-form__room-area">
          <div class="contactor-info">
            <template v-if="selectedChat">
              <v-avatar :color="selectedChat.avatar ? 'white' : undefined">
                <v-img :src="selectedChat.avatar"></v-img>
              </v-avatar>
              <div>{{selectedChat.name}}</div>
            </template>
          </div>
          <div
            :class="['chat-content-container', scrollable.history ? 'scrollable' : '']"
            ref="chatContainer"
          >
            <template v-if="selectedChat && selectedChat.histories.length > 0">
              <div
                class="msg-content msg-content__from"
                v-for="(history, index) in selectedChat.histories"
                :key="index"
              >
                <div class="msg-content__main">{{history.content}}</div>
                <span class="msg-content__datetime">{{history.datetime}}</span>
              </div>
            </template>
            <div v-else class="none-info__history">{{$t('fMyMessage.select_one_contactor')}}</div>
          </div>
        </div>
      </div>
    </f-block>
  </div>
</template>
<script>
import FBlock from "@/components/FBlock";
import fakeAnnouncement from "@/assets/json/fake/announcement";
export default {
  components: {
    FBlock
  },
  data() {
    return {
      newMessage: false,
      newAnnoucement: true,
      selectedTab: "amt",
      fakeAnnouncement,
      selectedChat: undefined,
      scrollable: {
        chat: false,
        history: false
      }
    };
  },
  computed: {
    chatList() {
      return this.selectedTab === "amt" ? this.fakeAnnouncement : [];
    }
  },
  watch: {
    selectedTab() {
      this.selectedChat =
        this.chatList.length > 0 ? this.chatList[0] : undefined;
    }
  },
  updated() {
    this.scrollable.chat =
      this.$refs.chatList.scrollHeight > this.$refs.chatList.offsetHeight;
    this.scrollable.history =
      this.$refs.chatContainer.scrollHeight >
      this.$refs.chatContainer.offsetHeight;
    this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
  },
  mounted() {
    this.selectedChat = this.chatList[0];
  }
};
</script>
<style scoped>
.chat-form {
  display: grid;
  grid-template-columns: 320px auto;
  height: calc(100vh - 300px);
  margin: 0px 20px;
}
.chat-form__history-area {
  border-radius: 10px 0px 0px 10px;
  background: #8e75ae;
}
.chat-form__room-area {
  border-radius: 0px 10px 10px 0px;
  background: rgba(128, 128, 128, 0.3);
}
.history__tabs {
  display: grid;
  /* grid-template-columns: repeat(2, 1fr); */
  height: 65px;
  justify-items: center;
  align-items: center;
  font-size: 20px;
  color: #eadbf8;
  border-bottom: 3px solid #55287e;
}
.history__tabs > div {
  text-align: center;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 3px solid transparent;
  cursor: pointer;
}
.history__tabs > div.active {
  border-bottom: 3px solid orange;
  color: orange;
}
.history__list {
  margin-top: 4px;
  /* max-height: calc(100vh - 425px);
  min-height: calc(100vh - 425px); */
  max-height: calc(100vh - 345px);
  min-height: calc(100vh - 345px);
  overflow-x: hidden;
  overflow-y: hidden;
}
.history__list.scrollable {
  overflow-y: scroll;
}
.history__item {
  display: grid;
  padding: 15px;
  grid-column-gap: 10px;
  grid-template-columns: 48px 202px;
  cursor: pointer;
}
.history__item:hover,
.history__item.selected:hover {
  background: #9786ad;
}
.history__item.selected {
  background: #9786ad;
}
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
  max-height: calc(100vh - 360px);
  min-height: calc(100vh - 360px);
  overflow-x: hidden;
  overflow-y: hidden;
}
.chat-content-container.scrollable {
  overflow-y: scroll;
}
.msg-content {
  width: fit-content;
  max-width: 50%;
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
.none-info__chat,
.none-info__history {
  font-size: 18px;
  margin: auto;
  width: fit-content;
  line-height: 200px;
  vertical-align: middle;
}
.none-info__chat {
  color: #eadbf8;
}
.none-info__history {
  color: #8e75ae;
}
.collapsed-drawer {
  border-top: 3px solid #8e75ae;
  font-size: 18px;
  background: #55287e;
  color: #eadbf8;
  cursor: pointer;
}
.collapsed-drawer > div {
  padding: 5px;
  width: fit-content;
  margin: auto;
}
@media (max-width: 1264px) {
  .msg-content {
    max-width: 80%;
  }
}
</style>
<style>
.f-my-message .v-badge__badge {
  top: 0px;
  right: -4px;
  height: 11px;
  width: 11px;
}
</style>
