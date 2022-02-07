<template>
  <router-link :to="{ name: item.name }">
    <a-button :key="item.path">
      <icon-font :type="item.meta.icon" />
      <span>{{ item.meta.title }}</span>
    </a-button>
  </router-link>
</template>

<script>
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
};
</script>

<style></style>
