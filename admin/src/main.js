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

import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";

import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";

import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

import hljs from "highlight.js";

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .use(NProgress)
  .use(moment)
  .use(VMdEditor)
  .use(VMdPreview)
  .mount("#app");
