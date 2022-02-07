<template>
  <div class="date-div">
    本站已运行 {{ days }} 天 {{ hours }} 小时 {{ minutes }} 分 {{ seconds }} 秒
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import moment from "moment";

export default {
  setup() {
    const state = reactive({
      days: "",
      hours: "",
      minutes: "",
      seconds: "",
    });

    const calculateTime = () => {
      const start = new Date("2021/11/1 0:00:00");
      let nowTime = new Date();
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
    };

    setInterval(calculateTime, 1000);

    return { ...toRefs(state), moment };
  },
};
</script>

<style lang="scss" scoped>
.date-div {
  text-align: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: #fff;
  margin-right: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #eee;
}
</style>
