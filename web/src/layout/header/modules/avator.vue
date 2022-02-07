<template>
  <div class="layout-avator">
    <a-form
      v-if="!token"
      layout="inline"
      :model="formInline"
      @submit.prevent="handleSubmit"
    >
      <a-form-item>
        <a-input v-model:value="formInline.username" placeholder="请输入用户名">
          <template #prefix><user-outlined /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="formInline.password"
          type="password"
          placeholder="请输入密码"
          autocomplete="new-password"
        >
          <template #prefix><lock-outlined /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formInline.user === '' || formInline.password === ''"
        >
          <icon-font type="icon-denglu" />
          登录
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="register" ghost>
          <icon-font type="icon-zhucehuiyuan" />
          注册
        </a-button>
      </a-form-item>
    </a-form>

    <a-dropdown v-else>
      <a-avatar>{{ username }}</a-avatar>
      <template #overlay>
        <a-menu style="margin-top: 10px">
          <a-menu-item>
            <router-link :to="{ name: 'register' }" replace>
              <icon-font type="icon-zhucehuiyuan" />&nbsp; 注册用户
            </router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link :to="{ name: 'password' }" replace>
              <icon-font type="icon-xiugaimima" />&nbsp; 修改密码
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
import { reactive, toRefs, createVNode } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { message, Modal } from "ant-design-vue";
import {
  UserOutlined,
  LockOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { IconFont } from "@/utils/showIconFont";

export default {
  components: {
    IconFont,
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formState = reactive({
      spinning: false,
      token: "",
      username: "",
      formInline: {
        username: "",
        password: "",
      },
    });

    formState.token = localStorage.elementTokenWeb;

    formState.username = localStorage.username;

    const register = () => {
      router.push({
        name: "register",
      });
    };

    const handleSubmit = async () => {
      const { username, password } = formState.formInline;
      if (username.trim() == "" || password.trim() == "") {
        return message.warning("用户名或密码不能为空！");
      }
      formState.spinning = true;
      const userInfo = {
        username,
        password,
      };
      const res = await store.dispatch("auth/login", userInfo).finally(() => {
        formState.spinning = false;
      });
      if (res) {
        await store.dispatch("user/getUserByToken");
        const { code } = res.data;
        if (code === 0) {
          window.location.reload();
        }
      }
    };

    const logout = () => {
      Modal.confirm({
        title: "您确定要退出登录吗？",
        icon: createVNode(ExclamationCircleOutlined),
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          store.dispatch("auth/logout");
        },
      });
    };

    return {
      ...toRefs(formState),
      register,
      handleSubmit,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout-avator {
  padding-top: 0.25rem;
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
