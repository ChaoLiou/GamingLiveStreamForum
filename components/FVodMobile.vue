<template>
  <div class="f-vod-mobile">
    <div class="vod-frame">
      <f-link v-if="vod.externalLink" :link="vod.externalLink" external>
        <f-image-preview :image="vod.img"></f-image-preview>
      </f-link>
      <iframe
        v-else
        :src="vod.embeddedUrl"
        height="100%"
        width="100%"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true"
      ></iframe>
    </div>
    <div class="vod-info">
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
        <div class="chatroom-frame" v-show="selectedTab === 'chatroom'"></div>
        <div class="vod-info__main" v-show="selectedTab === 'streaminfo'">
          <f-block-box
            :title="$t('account_type_subtype.streamer_info')"
            background-color="#f2ecf6"
          >
            <div v-html="stream.title"></div>
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
    vod: {
      type: Object,
      default() {
        return {};
      }
    },
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
      return false;
    }
  },
  watch: {
    vod(value) {
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
.vod-frame,
.f-image-preview {
  height: calc(100vw * 9 / 16);
  min-height: calc(100vw * 9 / 16);
}
.chatroom-frame {
  height: 100vh;
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
.vod-info__main > div {
  margin-top: 10px;
}
</style>
