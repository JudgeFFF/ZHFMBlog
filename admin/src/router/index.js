import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import constantRouter from "./modules/constantRouter";
import permission from "./permission";
import getPageTitle from "../utils/getPageTitle";

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter,
});

router.beforeEach(permission);

router.afterEach((to) => {
  NProgress.done();
  document.title = getPageTitle(to.meta.title);
});

export default router;
