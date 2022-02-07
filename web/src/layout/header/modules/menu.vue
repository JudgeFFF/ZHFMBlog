<template>
  <div class="layout-menu">
    <a-menu mode="horizontal" @click="handleClick" v-if="!token">
      <template v-for="child in item.children">
        <a-menu-item
          v-if="!child.hidden && child.name != 'collect'"
          :key="child.name"
        >
          <icon-font :type="child.meta.icon" style="font-size: 15px" />
          <span style="font-size: 15px">{{ child.meta.title }}</span>
        </a-menu-item>
      </template>
    </a-menu>
    <a-menu mode="horizontal" @click="handleClick" v-else>
      <template v-for="child in item.children">
        <a-menu-item v-if="!child.hidden" :key="child.name">
          <icon-font :type="child.meta.icon" style="font-size: 15px" />
          <span style="font-size: 15px">{{ child.meta.title }}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { IconFont } from "@/utils/showIconFont";

export default {
  components: {
    IconFont,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const menuState = reactive({
      token: "",
    });

    menuState.token = localStorage.elementTokenWeb;

    const handleClick = (e) => {
      switch (e.key) {
        case "home":
          router.push({
            name: "home",
          });
          break;
        case "article-admin":
          router.push({
            name: "article-admin",
          });
          break;
        case "article-user":
          router.push({
            name: "article-user",
          });
          break;
        case "collect":
          router.push({
            name: "collect",
          });
          break;
        case "message":
          router.push({
            name: "message",
          });
          break;
      }
    };
    return { ...toRefs(menuState), handleClick };
  },
};
</script>

<style></style>
