<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <router-link :to="{ name: 'home' }"> 首页 </router-link>
    </a-breadcrumb-item>

    <a-breadcrumb-item
      v-for="routeItem in $route.matched"
      :key="routeItem.name"
      v-show="routeItem.name != 'index'"
    >
      <span
        v-show="
          routeItem.name == 'home' ||
          (routeItem.name == 'detailed-id' && isAdminLoc == 1)
        "
      >
        <router-link
          :to="{
            name: 'home',
          }"
        >
          管理员文章
        </router-link>
      </span>
      <span
        v-show="
          routeItem.name == 'article-user' ||
          (routeItem.name == 'detailed-id' && isAdminLoc == 0)
        "
      >
        <router-link
          :to="{
            name: 'article-user',
          }"
        >
          用户文章
        </router-link>
      </span>
      <span v-show="routeItem.name == 'collect'">
        <router-link
          :to="{
            name: 'collect',
          }"
        >
          文章收藏
        </router-link>
      </span>
      <span v-show="routeItem.name == 'message'">
        <router-link
          :to="{
            name: 'message',
          }"
        >
          留言板
        </router-link>
      </span>
    </a-breadcrumb-item>

    <a-breadcrumb-item
      v-for="routeItem in $route.matched"
      :key="routeItem.name"
      v-show="routeItem.name != 'index'"
    >
      <span
        v-show="
          routeItem.name != 'home' &&
          routeItem.name != 'article-user' &&
          routeItem.name != 'collect' &&
          routeItem.name != 'message'
        "
      >
        <router-link
          :to="{
            name: routeItem.name,
          }"
        >
          {{ routeItem.meta.title }}
        </router-link>
      </span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      isAdminLoc: "",
    });

    state.isAdminLoc = localStorage.isAdminLoc;

    return { ...toRefs(state) };
  },
};
</script>

<style></style>
