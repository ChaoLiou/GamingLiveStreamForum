<template>
  <div :class="['f-tab', fixed ? 'fixed' : '']">
    <div class="f-tab__tabs" :style="tabStyles" v-if="title">
      <div
        :class="['f-tab__tab-item', tab.active ? 'active' : '']"
        v-for="(tab, index) in [{title, link}, ...tabs]"
        :key="index"
      >
        <nuxt-link v-if="tab.link" :to="tab.link">
          <div>{{tab.title}}</div>
        </nuxt-link>
        <div v-else>{{tab.title}}</div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "Page"
    },
    link: {
      type: String,
      default: undefined
    },
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    fixed: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    tabStyles() {
      return {
        "grid-template-columns": `repeat(${this.tabs.length + 1}, 120px)`
      };
    }
  }
};
</script>
<style scoped>
.f-tab {
  width: 100vw;
  background-color: #e7d6fa;
  display: grid;
  justify-items: center;
  height: 50px;
}
.f-tab__tabs {
  display: grid;
  justify-items: center;
}
.f-tab__tab-item {
  border-bottom: 5px solid transparent;
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 0px 5px;
  width: 80%;
}
.f-tab__tab-item:nth-child(1) {
  width: 100%;
  background-color: #55287e;
}
.f-tab__tab-item.active {
  border-bottom-color: #55287e;
}
.f-tab__tab-item * {
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
}
.f-tab__tab-item a {
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
}
.f-tab.fixed {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  position: fixed;
  top: 64px;
  z-index: 999;
}
</style>
