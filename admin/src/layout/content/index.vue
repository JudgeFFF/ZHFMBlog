<template>
  <a-layout-content class="layout-content">
    <div :style="{ padding: '1rem', background: '#fff', minHeight: '880px' }">
      <router-view v-slot="{ Component }" v-if="routerActive">
        <transition mode="out-in" name="fade-transform">
          <component :is="Component" />
        </transition>
      </router-view>
      <div class="layout-loading" v-else>
        <a-spin tip="数据加载中，请稍后..." />
      </div>
    </div>
  </a-layout-content>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const { getters } = useStore();

    const routerActive = computed(() => getters.routerActive);

    return { routerActive };
  },
};
</script>

<style lang="scss" scoped>
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.layout-content {
  margin: 15px 15px;
  .layout-loading {
    width: 100%;
    height: 100%;
    min-height: 30vh;
    padding-top: 30vh;
    text-align: center;
    background-color: transparent;
  }
}
</style>
