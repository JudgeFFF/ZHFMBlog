<template>
  <a-layout-content>
    <div :style="{ padding: '1rem', background: '#fff', minHeight: '1380px' }">
      <router-view v-slot="{ Component }" v-if="routerActive">
        <transition mode="out-in" name="fade-transform">
          <component :is="Component" />
        </transition>
      </router-view>
      <div class="layout-loading" v-else>
        <a-spin tip="数据搜索中，请稍后..." />
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
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateY(-100px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.layout-loading {
  width: 100%;
  height: 100%;
  padding-top: 35vh;
  text-align: center;
  background-color: transparent;
}
</style>
