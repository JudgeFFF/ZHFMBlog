<template>
  <div class="login-box">
    <div class="login-logo">
      <img src="~@/assets/logo.png" alt="" />
      <h1>ZFBlog</h1>
    </div>
    <a-spin tip="正在登录中，请稍后..." :spinning="spinning">
      <a-form
        layout="horizontal"
        :model="formInline"
        @submit.prevent="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-model:value="formInline.username"
            size="large"
            placeholder="请输入用户名"
          >
            <template #prefix><user-outlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-model:value="formInline.password"
            size="large"
            type="password"
            placeholder="请输入密码"
            autocomplete="new-password"
          >
            <template #prefix><lock-outlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" block>
            <icon-font type="icon-200yonghu_yonghu" />
            登录
          </a-button>
        </a-form-item>
        <a-form-item v-show="isToken">
          <a-button type="primary" @click="home" size="large" block ghost>
            <icon-font type="icon-gongzuotai" />
            <span v-if="isAdmin == 1"> 返回后台管理中心 </span>
            <span v-else> 返回文章创作中心 </span>
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            size="large"
            href="http://localhost:8080/"
            ghost
            block
          >
            <icon-font type="icon-shouye" />
            返回博客首页
          </a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { IconFont } from "@/utils/showIconFont";

export default {
  components: { UserOutlined, LockOutlined, IconFont },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formState = reactive({
      spinning: false,
      isToken: "",
      isAdmin: "",
      formInline: {
        username: "",
        password: "",
      },
    });

    formState.isToken = localStorage.elementTokenAdmin;

    formState.isAdmin = localStorage.isAdmin;

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
          router.push("/workspace");
        }
      }
    };

    const home = () => {
      router.push("/workspace");
    };

    return {
      ...toRefs(formState),
      handleSubmit,
      home,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  width: 100vw;
  height: 100vh;
  padding-top: 240px;
  background: url("~@/assets/login-images/login.svg");
  background-size: 100%;
  flex-direction: column;
  align-items: center;

  .login-logo {
    display: flex;
    margin-bottom: 30px;
    align-items: center;

    img {
      height: 48px;
    }

    h1 {
      margin-bottom: 0;
      margin-left: 10px;
    }
  }

  :deep(.ant-form) {
    width: 400px;

    .ant-col {
      width: 100%;
    }

    .ant-form-item-label {
      padding-right: 6px;
    }
  }
}
</style>
