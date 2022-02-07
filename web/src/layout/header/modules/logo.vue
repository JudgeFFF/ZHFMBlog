<template>
  <div class="layout-logo">
    <img src="@/assets/logo.png" alt="" />
    <span class="logo-name">
      <router-link to="/">ZFBlog</router-link>
    </span>
    <span class="logo-text">珠海市美食博客</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.layout-logo {
  padding-top: 0.25rem;
  display: flex;
  height: 30px;
  align-items: center;

  img {
    height: 32px;
    margin-right: 8px;
  }

  .logo-name {
    color: #1e90ff;
    font-size: 1.5rem;
    text-align: left;
  }

  .logo-text {
    font-size: 0.5rem;
    color: #999;
    display: inline-block;
    padding-top: 1rem;
    padding-left: 0.5rem;
  }
}
</style>
