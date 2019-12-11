<template>
  <div class="f-live-stream">
    <f-block
      :font-size="22"
      :line-height="0"
      :content-left-margin="10"
      :content-right-margin="30"
      :title="$t('fLiveStream.my_stream')"
      background-color="#eadbf8"
    >
      <div>
        <div class="toolbar">
          <v-btn class="theme" @click="dialog = true">{{
            $t("fLiveStream.apply_streamer")
          }}</v-btn>
        </div>
        <div class="table-headers user-select_none">
          <div>
            <v-btn icon>
              <v-icon large color="white">delete_forever</v-icon>
            </v-btn>
          </div>
          <v-divider vertical></v-divider>
          <div @click="sortCol('platform')">
            <v-btn icon class="sorter-btn">
              <v-icon color="white">
                {{ sort.col === "platform" ? sortIcon : "remove" }}
              </v-icon>
            </v-btn>
            {{ $t("fLiveStream.platform") }}
          </div>
          <v-divider vertical></v-divider>
          <div>{{ $t("fLiveStream.stream_title") }}</div>
          <v-divider vertical></v-divider>
          <div @click="sortCol('date')">
            <v-btn icon class="sorter-btn">
              <v-icon color="white">
                {{ sort.col === "date" ? sortIcon : "remove" }}
              </v-icon>
            </v-btn>
            {{ $t("fLiveStream.date") }}
          </div>
          <v-divider vertical></v-divider>
          <div @click="sortCol('viewers')">
            <v-btn icon class="sorter-btn">
              <v-icon color="white">
                {{ sort.col === "viewers" ? sortIcon : "remove" }}
              </v-icon>
            </v-btn>
            {{ $t("fLiveStream.popularity") }}
          </div>
        </div>
        <template v-if="vodList.length > 0">
          <div class="vod-item" v-for="(vod, index) in vodList" :key="index">
            <div class="vod-item__checkbox">
              <v-checkbox hide-details v-model="vod.checkbox"></v-checkbox>
            </div>
            <div class="vod-item__platform">{{ vod.platform }}</div>
            <div class="vod-item__content">
              <v-img
                width="160px"
                height="90px"
                :src="vod.item.preview"
              ></v-img>
              <div class="main-content">
                <div class="main-content__title text-truncate">
                  {{ vod.item.title }}
                </div>
                <div class="main-content__description">
                  {{ vod.item.description }}
                </div>
              </div>
            </div>
            <div class="vod-item__date">{{ vod.date }}</div>
            <div class="vod-item__viewers">{{ fviewers(vod.viewers) }}</div>
          </div>
          <div class="pagination-container">
            <v-pagination
              v-model="page"
              :length="maxPage"
              :total-visible="7"
            ></v-pagination>
          </div>
        </template>
        <div v-else class="none-info">
          <div>{{ $t("fLiveStream.not_streamer_default_text_1") }}</div>
          <div>{{ $t("fLiveStream.not_streamer_default_text_2") }}</div>
        </div>
      </div>
    </f-block>
    <v-dialog v-model="dialog" max-width="500px" content-class="dialog-form">
      <f-stream-setting-form @close="dialog = false"></f-stream-setting-form>
    </v-dialog>
  </div>
</template>
<script>
import FBlock from "@/components/FBlock";
import FStreamSettingForm from "@/components/FStreamSettingForm";
import fakeVod from "@/assets/json/fake/vod";
import formatter from "@/assets/utils/formatter";
import platforms from "@/assets/json/platforms";
import { _ } from "vue-underscore";
export default {
  components: {
    FBlock,
    FStreamSettingForm
  },
  data() {
    return {
      dialog: false,
      sort: {
        asc: false,
        col: "date"
      },
      page: 1,
      size: 10,
      fakeVod
    };
  },
  computed: {
    maxPage() {
      return (
        this.fakeVod.length / this.size +
        (this.fakeVod.length % this.size === 0 ? 0 : 1)
      );
    },
    vodList() {
      let sortedList = this.fakeVod;
      if (this.sort.col) {
        sortedList = _.sortBy(this.fakeVod, this.sort.col);
      }
      if (!this.sort.asc) {
        sortedList = sortedList.reverse();
      }
      return sortedList
        .slice((this.page - 1) * this.size, this.page * this.size)
        .map(x => {
          const target = platforms.find(y => y.id === x.platform);
          return {
            ...x,
            platform: target ? this.$t(`_platforms.${target.id}`) : x.platform,
            checkbox: false
          };
        });
    },
    sortIcon() {
      return this.sort.asc ? "arrow_drop_up" : "arrow_drop_down";
    }
  },
  methods: {
    fviewers: formatter.fviewers,
    sortCol(col) {
      if (this.sort.col === col) {
        this.sort.asc = !this.sort.asc;
      } else {
        this.sort = { asc: true, col };
      }
    }
  }
};
</script>
<style scoped>
.f-live-stream {
  position: relative;
}
.toolbar {
  background: #8e75ae;
}
.table-headers {
  background: #6540a7;
  color: white;
  font-size: 18px;
  display: grid;
  grid-template-columns: 80px 1px 120px 1px auto 1px 100px 1px 100px;
  justify-items: center;
  align-items: center;
}
.table-headers > div {
  cursor: pointer;
}
.table-headers .v-divider {
  border-color: white;
  border-width: 1px;
  min-height: 20px;
  max-height: 20px;
  align-self: center;
}
.sorter-btn {
  width: 18px !important;
  height: 18px !important;
  margin: 0px !important;
}
.none-info {
  margin: 40px 0px;
  font-size: 18px;
}
.none-info > div {
  margin: 10px auto;
  width: fit-content;
}
.vod-item {
  display: grid;
  grid-template-columns: 80px 120px auto 100px 100px;
  grid-column-gap: 1px;
  justify-items: center;
  align-items: center;
  padding: 10px 0px;
  background: white;
}
.vod-item:nth-child(even) {
  background: rgb(230, 230, 230);
}
.vod-item__checkbox {
  margin-left: 10px;
}
.vod-item__platform {
  font-size: 18px;
  color: #6540a7;
}
.vod-item__content {
  justify-self: start;
  display: grid;
  grid-template-columns: 180px minmax(180px, auto);
  height: 110px;
}
.vod-item__content .v-image {
  justify-self: center;
  align-self: center;
}
.main-content__title {
  font-size: 20px;
  font-weight: bold;
}
.main-content__description {
  font-size: 16px;
  margin-top: 5px;
  max-height: 70px;
  overflow: hidden;
}
.vod-item__date,
.vod-item__viewers {
  font-size: 14px;
  color: #6540a7;
}
.pagination-container {
  width: fit-content;
  margin: 20px auto;
}
@media (max-width: 1264px) and (min-width: 960px) {
  .vod-item__content .v-image {
    justify-self: start;
  }
  .vod-item__content {
    grid-template-columns: 1fr;
    height: fit-content;
    max-width: calc(100vw - 220px - 80px - 120px - 100px - 100px);
  }
  .main-content {
    max-width: calc(100vw - 220px - 80px - 120px - 100px - 100px);
  }
}
</style>
<style>
.f-live-stream .sorter-btn .v-btn__content {
  height: 18px !important;
}
</style>
