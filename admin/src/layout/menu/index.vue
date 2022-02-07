<template>
  <a-menu
    theme="dark"
    mode="inline"
    v-model:open-keys="openKeys"
    v-model:selected-keys="selectedKeys"
    :collapsed="collapsed"
    @click="handleClick"
    class="menu-container"
  >
    <template v-for="menu in menus" :key="menu.path">
      <SubMenu v-if="!menu.hidden" :item="menu"></SubMenu>
    </template>
  </a-menu>
</template>

<script>
import { reactive, computed, watch, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import SubMenu from "./modules/SubMenu.vue";

export default {
  components: {
    SubMenu,
  },
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const getOpenKeys = () => [route.matched[1]?.name];

    const state = reactive({
      menus: "",
      openKeys: getOpenKeys(),
      selectedKeys: [route.name],
    });

    if (localStorage.isAdmin > 0) {
      state.menus = computed(() => store.getters["routes/GET_CAROUTES"]);
    } else {
      state.menus = computed(() => store.getters["routes/GET_CROUTES"]);
    }

    watch(
      () => props.collapsed,
      (newVal) => {
        state.openKeys = newVal ? [] : getOpenKeys();
        state.selectedKeys = [route.name];
      }
    );

    watch(
      () => route.fullPath,
      () => {
        if (route.name == "login" || props.collapsed) return;
        state.openKeys = getOpenKeys();
        state.selectedKeys = [route.name];
      }
    );

    const handleClick = ({ key }) => {
      router.push({ name: key });
    };

    return {
      ...toRefs(state),
      handleClick,
    };
  },
};
</script>

<style></style>
