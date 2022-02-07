<template>
  <div class="footer-div">
    <span>
      本系统由
      <icon-font type="icon-vuejs" /> Vue +
      <icon-font type="icon-nodejs" /> Nest +
      <icon-font type="icon-antdesign" /> Antd 共同驱动 <br />JudgeF.top
    </span>
  </div>
</template>

<script>
import { IconFont } from "@/utils/showIconFont";

export default {
  components: {
    IconFont,
  },
};
</script>

<style scoped>
.footer-div {
  text-align: center;
  width: 100%;
  padding: 1rem;
  color: #888;
}
</style>
