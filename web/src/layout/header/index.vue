<template>
  <div class="layout-header">
    <a-row v-if="!token" justify="center">
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="3">
        <Logo />
      </a-col>

      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="5">
        <template v-for="menu in menus" :key="menu.path">
          <Menu v-if="!menu.hidden" :item="menu" />
        </template>
      </a-col>

      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="9">
        <Avator />
      </a-col>
    </a-row>

    <a-row v-else justify="center">
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="4">
        <Logo />
      </a-col>

      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="7">
        <template v-for="menu in menus" :key="menu.path">
          <Menu v-if="!menu.hidden" :item="menu" />
        </template>
      </a-col>

      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="3">
        <Button />
      </a-col>

      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="1">
        <Avator />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Logo from "./modules/logo.vue";
import Menu from "./modules/menu.vue";
import Button from "./modules/button.vue";
import Avator from "./modules/avator.vue";

export default {
  components: { Logo, Menu, Button, Avator },
  setup() {
    const store = useStore();

    store.dispatch("routes/setCRoutes");

    const token = localStorage.elementTokenWeb;

    const menus = store.getters["routes/GET_CROUTES"];

    return {
      token,
      menus,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout-header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0.25rem;
  overflow: hidden;
  height: 3rem;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
</style>
