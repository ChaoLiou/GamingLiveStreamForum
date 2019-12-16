<template>
  <div class="f-stream-mobile">
    <div class="stream-frame">
      <f-link v-if="stream.externalLink" :link="stream.externalLink" external>
        <f-image-preview :image="stream.preview"></f-image-preview>
      </f-link>
      <iframe
        v-else
        :src="stream.source"
        height="100%"
        width="100%"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true"
      ></iframe>
    </div>
    <div class="stream-info">
      <div class="tabs" v-if="chatroomEnabled">
        <div
          :class="[selectedTab === 'chatroom' ? 'selected' : '']"
          @click="selectedTab = 'chatroom'"
        >
          {{ $t("fStream.chatroom") }}
        </div>
        <div
          :class="[selectedTab === 'streaminfo' ? 'selected' : '']"
          @click="selectedTab = 'streaminfo'"
        >
          {{ $t("fStream.streamer") }}
        </div>
      </div>
      <div class="tab-content">
        <div class="chatroom-frame" v-show="selectedTab === 'chatroom'">
          <iframe
            frameborder="0"
            scrolling="yes"
            :src="stream.chatSource"
            height="100%"
            width="100%"
          ></iframe>
        </div>
        <div class="stream-info__main" v-show="selectedTab === 'streaminfo'">
          <f-block-box
            :title="$t('account_type_subtype.streamer_info')"
            background-color="#f2ecf6"
          >
            <div v-html="stream.description"></div>
          </f-block-box>
          <f-block-box
            :title="$t('account_type_subtype.hot_recommend')"
            :second-title="$t('fStream.vod')"
            background-color="#f2ecf6"
            tab
            @click="switchTab"
          >
            <f-stream-container
              narrow
              :max-col="2"
              :streams="source"
              :available="selectedTab2 === 'tab-1' || source.length > 0"
              :msg="$t('account_type_subtype.no_vod_msg')"
              :type="selectedTab2 === 'tab-1' ? 'stream' : 'vod'"
            ></f-stream-container>
            <div v-if="source.length > 0">
              <v-btn
                :class="[moreEnabled ? 'theme' : '']"
                :dark="moreEnabled"
                block
                @click="loadMore"
                :disabled="!moreEnabled"
              >
                {{ $t("fFollowedStreams.load_more_streams") }}
              </v-btn>
            </div>
          </f-block-box>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FLink from "@/components/FLink";
import FBlockBox from "@/components/FBlockBox";
import FImagePreview from "@/components/FImagePreview";
import FStreamContainer from "@/components/FStreamContainer";
export default {
  components: {
    FLink,
    FImagePreview,
    FBlockBox,
    FStreamContainer
  },
  props: {
    stream: {
      type: Object,
      default() {
        return {};
      }
    },
    source: {
      type: Array,
      default() {
        return [];
      }
    },
    moreEnabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedTab: "chatroom",
      selectedTab2: "tab-1"
    };
  },
  computed: {
    chatroomEnabled() {
      return (
        this.stream.chatSource &&
        !(this.$vuetify.breakpoint.xs && this.stream.platform === "youtube")
      );
    }
  },
  watch: {
    stream(value) {
      if (!this.chatroomEnabled) {
        this.selectedTab = "streaminfo";
      }
    }
  },
  mounted() {},
  methods: {
    switchTab(tab) {
      this.selectedTab2 = tab;
      this.$emit("click", tab);
    },
    loadMore() {
      this.$emit("load-more");
    }
  }
};
</script>
<style scoped>
.stream-frame,
.f-image-preview {
  height: calc(100vw * 9 / 16);
  min-height: calc(100vw * 9 / 16);
}
.chatroom-frame {
  height: calc(100vh - 56px - (100vw * 9 / 16) - 35px);
}
.tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  font-size: 14px;
  justify-items: center;
  align-items: center;
  grid-column-gap: 3px;
  background: #55287e;
}
.tabs > div {
  border-radius: 5px 5px 0px 0px;
  padding: 7px 7px 4px 7px;
  color: white;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}
.tabs > div.selected {
  color: orange;
  border-bottom-color: orange;
}
.stream-info__main > div {
  margin-top: 10px;
}
</style>
