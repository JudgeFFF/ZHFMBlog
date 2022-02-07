<template>
  <a-menu-item :key="item.path" v-if="!hasChildren(item)">
    <span style="font-size: 15px">{{ item.meta.title }}</span>
  </a-menu-item>

  <a-sub-menu :key="item.path" v-else>
    <template #icon>
      <icon-font :type="item.meta.icon" style="font-size: 20px" />
    </template>
    <template #title>
      <span style="font-size: 15px">{{ item.meta.title }}</span>
    </template>

    <template v-for="child in item.children" :key="child.path">
      <sub-menu v-if="!child.hidden" :item="child"> </sub-menu>
    </template>
  </a-sub-menu>
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
  setup() {
    const hasChildren = function (item) {
      return item.children != undefined;
    };

    return {
      hasChildren,
    };
  },
};
</script>

<style></style>
