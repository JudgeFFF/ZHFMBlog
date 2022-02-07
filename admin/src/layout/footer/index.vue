<template>
  <a-layout-footer style="text-align: center">
    <span>
      本系统由
      <icon-font type="icon-vuejs" /> Vue +
      <icon-font type="icon-nodejs" /> Nest +
      <icon-font type="icon-antdesign" /> Antd 共同驱动 <br />JudgeF.top
    </span>
  </a-layout-footer>
</template>

<script>
import { IconFont } from "@/utils/showIconFont";

export default {
  components: {
    IconFont,
  },
};
</script>

<style></style>
