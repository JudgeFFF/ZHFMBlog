import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import moment from "moment";
import "moment/dist/locale/zh-cn";

import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";

import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

import hljs from "highlight.js";

import { Plugin } from "vue-responsive-video-background-player";

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .use(NProgress)
  .use(moment)
  .use(VMdPreview)
  .use(Plugin)
  .mount("#app");
