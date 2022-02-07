import store from "@/store";
import NProgress from "nprogress";

export default async (to, from, next) => {
  NProgress.start();
  next();
  await store.dispatch("statistic/setAccessStatistic");
};
