<template>
  <div class="work-div">
    <img src="@/assets/analysis.svg" />
    <a-skeleton
      :loading="loading"
      :title="false"
      :paragraph="{ rows: 5 }"
      active
    >
      <a-page-header title="ZH-Food-Blog Management System" class="work-header">
        <template #extra>
          <template v-for="menu in menus" :key="menu.path">
            <Button v-if="!menu.hidden" :item="menu" />
          </template>
        </template>
        <div class="content">
          <div class="title">
            {{ period }}，欢迎『 {{ username }} 』进入
            <span v-if="isAdmin > 0"> 后台管理系统 </span>
            <span v-else> 文章创作中心 </span>
          </div>
          <div class="sub-title">
            本系统已运行 {{ days }} 天 {{ hours }} 小时 {{ minutes }} 分
            {{ seconds }} 秒
          </div>
        </div>
        <div class="extra">
          <span
            :style="{
              display: 'flex',
              width: 'max-content',
              justifyContent: 'flex-end',
            }"
          >
            <Statistic />
          </span>
        </div>
      </a-page-header>
    </a-skeleton>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import Button from "./modules/button.vue";
import Statistic from "./modules/statistic.vue";

export default {
  components: {
    Button,
    Statistic,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      loading: true,
      username: "",
      isAdmin: "",
      menus: "",
      period: "",
      days: "",
      hours: "",
      minutes: "",
      seconds: "",
    });

    state.username = localStorage.username;

    state.isAdmin = localStorage.isAdmin;

    if (localStorage.isAdmin > 0) {
      state.menus = computed(() => store.getters["routes/GET_CAROUTES"]);
    } else {
      state.menus = computed(() => store.getters["routes/GET_CROUTES"]);
    }

    const calculateTime = () => {
      const start = new Date("2021/11/1 0:00:00");
      let nowTime = new Date();
      let hour = new Date().getHours();
      state.period =
        hour < 8
          ? "早上好"
          : hour <= 11
          ? "上午好"
          : hour <= 13
          ? "中午好"
          : hour < 18
          ? "下午好"
          : "晚上好";
      let difference = nowTime.getTime() - start.getTime();
      let oneDaysecond = 24 * 60 * 60 * 1000;
      let d = difference / oneDaysecond;
      state.days = Math.floor(d);
      let h = (d - state.days) * 24;
      state.hours = Math.floor(h);
      let m = (h - state.hours) * 60;
      state.minutes = Math.floor(m);
      let s = (m - state.minutes) * 60;
      state.seconds = Math.floor(s);
      state.loading = false;
    };

    setInterval(calculateTime, 1000);

    return { ...toRefs(state), moment };
  },
};
</script>

<style lang="scss" scpoed>
.work-div {
  display: flex;
  width: 100%;
  height: calc(100vh - 200px);
  flex-direction: column;

  img {
    min-height: 0;
    height: 600px;
  }

  .work-header {
    border: 1px solid #f5f5f5;
    background-color: #f5f5f5;
    .content {
      display: inline-block;

      .title {
        font-size: 30px;
      }

      .sub-title {
        font-size: 20px;
      }
    }
    .extra {
      margin-top: 15px;
      float: right;
    }
  }
}
</style>
