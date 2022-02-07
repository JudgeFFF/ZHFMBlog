import store from "@/store";
import router from "@/router";
import NProgress from "nprogress";
import { message } from "ant-design-vue";

export default async (to, from, next) => {
  if (localStorage.elementTokenAdmin) {
    try {
      if (to.path == "/login") {
        NProgress.start();
        next();
      } else {
        if (localStorage.isAdmin > 0) {
          const aRoutes = await store.dispatch("routes/setCARoutes");
          aRoutes.forEach((item) => {
            router.addRoute(item);
          });
        } else {
          const aRoutes = await store.dispatch("routes/setCRoutes");
          aRoutes.forEach((item) => {
            router.addRoute(item);
          });
        }
        NProgress.start();
        next();
      }
    } catch (error) {
      await store.dispatch("auth/setToken");
      message.error(error);
      NProgress.start();
      next("/");
    }
  } else {
    const routesWhiteList = ["/login", "/workspace", "/tag", "/404", "/403"];
    if (routesWhiteList.indexOf(to.path) !== -1) {
      NProgress.start();
      next();
    } else {
      NProgress.start();
      next("/");
    }
  }
};
