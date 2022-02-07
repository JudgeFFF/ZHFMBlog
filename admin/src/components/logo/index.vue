<template>
  <div class="logo">
    <img src="@/assets/logo.png" alt="" />
    <h2 v-show="!collapsed" class="title">ZFBlog {{ isAdmin }}</h2>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup() {
    const state = reactive({
      isAdmin: "",
    });

    if (localStorage.isAdmin > 0) {
      state.isAdmin = "Admin";
    } else {
      state.isAdmin = "User";
    }

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  height: 60px;
  padding-left: 24px;
  overflow: hidden;
  line-height: 64px;
  white-space: nowrap;
  align-items: center;
  img {
    height: 32px;
    margin-right: 8px;
  }
  .title {
    margin-bottom: 0;
    color: white;
  }
}
</style>
