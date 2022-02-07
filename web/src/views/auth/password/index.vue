<template>
  <div class="changePassword-box">
    <div class="changePassword-logo">
      <img src="~@/assets/logo.png" alt="" />
      <h1>ZFBlog 修改密码</h1>
    </div>
    <a-spin tip="正在修改中，请稍后..." :spinning="spinning">
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
            v-model:value="formInline.oldPassword"
            size="large"
            type="password"
            placeholder="请输入旧密码"
          >
            <template #prefix><lock-outlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-model:value="formInline.newPassword"
            size="large"
            type="password"
            placeholder="请输入新密码"
          >
            <template #prefix><lock-outlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-model:value="formInline.checkNewPassword"
            size="large"
            type="password"
            placeholder="请重新输入新密码"
          >
            <template #prefix><lock-outlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            @click="handleSubmit"
            size="large"
            :disabled="
              formInline.user === '' ||
              formInline.oldPassword === '' ||
              formInline.newPassword === '' ||
              formInline.checkNewPassword === ''
            "
            block
          >
            <icon-font type="icon-zhucehuiyuan" />
            修改
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="home" size="large" block ghost>
            <icon-font type="icon-shouye" />
            返回主页
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
      formInline: {
        username: "",
        oldPassword: "",
        newPassword: "",
        checkNewPassword: "",
      },
    });

    const handleSubmit = async () => {
      const { username, oldPassword, newPassword, checkNewPassword } =
        formState.formInline;
      if (
        username.trim() == "" ||
        oldPassword.trim() == "" ||
        newPassword.trim() == "" ||
        checkNewPassword.trim() == ""
      ) {
        return message.warning("用户名、旧密码、新密码不能为空！");
      } else if (oldPassword.trim() == newPassword.trim()) {
        return message.warning("新旧密码必须不同！");
      } else if (newPassword.trim() != checkNewPassword.trim()) {
        return message.warning("两次新密码必须相同！");
      } else if (
        oldPassword.trim().length < 6 ||
        newPassword.trim().length < 6 ||
        checkNewPassword.trim().length < 6
      ) {
        return message.warning("密码不能低于6位");
      }

      formState.spinning = true;
      const userInfo = {
        username,
        password: oldPassword,
        newPassword,
      };

      const res = await store
        .dispatch("auth/changePassword", userInfo)
        .finally(() => {
          formState.spinning = false;
        });
      if (res) {
        const { code } = res.data;
        if (code === 0) {
          router.push("/");
          const userInfoLogin = {
            username,
            password: newPassword,
          };
          const res = await store
            .dispatch("auth/login", userInfoLogin)
            .finally(() => {
              formState.spinning = false;
            });
          if (res) {
            await store.dispatch("user/getUserByToken");
            const { code } = res.data;
            if (code === 0) {
              window.location.reload();
            }
          }
        }
      }
    };

    const home = () => {
      router.push({
        name: "home",
      });
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
.changePassword-box {
  display: flex;
  width: 100vw;
  height: 100vh;
  padding-top: 240px;
  background: url("~@/assets/login-images/login.svg");
  background-size: 100%;
  flex-direction: column;
  align-items: center;

  .changePassword-logo {
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
