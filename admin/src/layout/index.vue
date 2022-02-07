<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :width="230"
      :trigger="null"
      collapsible
    >
      <Logo :collapsed="collapsed" />
      <Menu :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <Header v-model:collapsed="collapsed" />
      <Content />
      <Footer />
    </a-layout>
  </a-layout>
</template>

<script>
import { ref } from "vue";
import Content from "./content/index.vue";
import Footer from "./footer/index.vue";
import Header from "./header/index.vue";
import Menu from "./menu/index.vue";
import Logo from "@/components/logo/index.vue";

export default {
  components: {
    Content,
    Menu,
    Header,
    Footer,
    Logo,
  },
  setup() {
    const collapsed = ref(false);

    return {
      collapsed,
    };
  },
};
</script>

<style></style>
