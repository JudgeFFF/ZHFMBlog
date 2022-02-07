<template>
  <a-layout-header class="layout-header">
    <div class="left-options">
      <span
        class="menu-fold"
        @click="() => $emit('update:collapsed', !collapsed)"
      >
        <component
          :is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'"
        />
      </span>
      <span class="menu-reload" @click="refresh">
        <component :is="routerActive ? 'ReloadOutlined' : 'LoadingOutlined'" />
      </span>
      <span class="menu-home" @click="home">
        <HomeOutlined />
      </span>
      <Breadcrumb />
    </div>

    <div class="right-options">
      <template v-for="item in iconList" :key="item.icon.name">
        <a-tooltip placement="bottom">
          <template #title>
            <span>{{ item.tips }}</span>
          </template>
          <component :is="item.icon" v-on="item.eventObject || {}" />
        </a-tooltip>
      </template>
      <component :is="fullscreenIcon" @click="toggleFullScreen" />
      <Avator />
    </div>
  </a-layout-header>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { HomeOutlined } from "@ant-design/icons-vue";
import Avator from "@/components/avator/index.vue";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import components from "./modules/components";

export default {
  components: { ...components, HomeOutlined, Avator, Breadcrumb },
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  emits: ["update:collapsed"],
  setup() {
    const { getters, commit } = useStore();
    const router = useRouter();

    const state = reactive({
      fullscreenIcon: "FullscreenOutlined",
    });

    const routerActive = computed(() => getters.routerActive);
    const refresh = async () => {
      commit("routes/SET_ROUTERACTIVE");
      setTimeout(() => {
        commit("routes/SET_ROUTERACTIVE");
      }, 500);
    };

    const home = () => {
      router.push("/workspace");
    };

    const toggleFullscreenIcon = () =>
      (state.fullscreenIcon =
        document.fullscreenElement !== null
          ? "FullscreenExitOutlined"
          : "FullscreenOutlined");
    document.addEventListener("fullscreenchange", toggleFullscreenIcon);
    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };

    const iconList = [
      {
        icon: "SearchOutlined",
        tips: "搜索",
      },
      {
        icon: "SettingOutlined",
        tips: "网站设置",
      },
      {
        icon: "LockOutlined",
        tips: "锁屏",
      },
    ];

    return {
      ...toRefs(state),
      toggleFullScreen,
      refresh,
      home,
      iconList,
      routerActive,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  height: 60px;
  padding: 0;
  background-color: #fff;
  justify-content: space-between;
  .left-options {
    display: flex;
    align-items: center;

    .menu-fold {
      font-size: 20px;
      padding: 0 25px;
      cursor: pointer;
      transition: color 0.5s;
    }

    .menu-fold:hover {
      color: #1890ff;
    }

    .menu-reload {
      font-size: 20px;
      padding: 0 25px 0 0;
      cursor: pointer;
      transition: color 0.5s;
    }

    .menu-reload:hover {
      color: #1890ff;
    }

    .menu-home {
      font-size: 20px;
      padding: 0 25px 0 0;
      cursor: pointer;
      transition: color 0.5s;
    }

    .menu-home:hover {
      color: #1890ff;
    }
  }

  .right-options {
    display: flex;
    align-items: center;
    > * {
      font-size: 20px;
      margin-right: 25px;
      cursor: pointer;
      transition: color 0.5s;
    }
    > *:hover {
      color: #1890ff;
    }
  }
}
</style>
