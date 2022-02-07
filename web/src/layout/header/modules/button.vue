<template>
  <div class="layout-button">
    <a-button
      v-if="isAdmin > 0"
      type="primary"
      href="http://localhost:8081/#/workspace/workspace-index"
    >
      后台管理中心
    </a-button>
    <a-button
      v-else
      type="primary"
      href="http://localhost:8081/#/workspace/workspace-index"
    >
      文章创作中心
    </a-button>
  </div>
</template>

<script>
export default {
  setup() {
    const isAdmin = localStorage.isAdmin;

    return { isAdmin };
  },
};
</script>

<style>
.layout-button {
  padding-top: 0.25rem;
  align-items: center;
}
</style>
