<template>
  <div class="layout-avator">
    <a-dropdown>
      <a-avatar>{{ username }}</a-avatar>
      <template #overlay>
        <a-menu style="margin-top: 20px">
          <a-menu-item>
            <a href="http://localhost:8080/">
              <icon-font type="icon-shouye" />&nbsp; 博客主页
            </a>
          </a-menu-item>
          <a-menu-item>
            <router-link :to="{ name: 'login' }" replace>
              <icon-font type="icon-yonghuguanli_huaban" />&nbsp; 切换账号
            </router-link>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click.prevent="logout">
            <div><icon-font type="icon-tuichudenglu" />&nbsp; 退出登录</div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import { createVNode } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { IconFont } from "@/utils/showIconFont";

export default {
  components: {
    IconFont,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const username = localStorage.username;

    const logout = () => {
      Modal.confirm({
        title: "您确定要退出登录吗？",
        icon: createVNode(ExclamationCircleOutlined),
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          store.dispatch("auth/logout").then(() => {
            router.replace({
              path: "/",
            });
          });
        },
      });
    };

    return {
      username,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout-avator {
  display: flex;
  align-items: center;
  > * {
    cursor: pointer;
    transition: color 0.5s;
  }
  > *:hover {
    color: #1890ff;
  }
}
</style>
