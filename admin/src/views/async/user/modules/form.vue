<template>
  <a-modal
    title="ZFBlog System-用户管理"
    ok-text="确认"
    cancel-text="取消"
    :visible="visible"
    @ok="handleSubmit"
    @cancel="$emit('handleCancel')"
  >
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="用户ID">
        <a-input :value="id" disabled />
      </a-form-item>
      <a-form-item label="用户名">
        <a-input :value="username" disabled />
      </a-form-item>
      <a-form-item label="用户权限">
        <a-select
          v-model:value="isAdminInfo"
          placeholder="请选择用户权限"
          @change="handleChange"
        >
          <a-select-option value="1">管理员</a-select-option>
          <a-select-option value="0">普通用户</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

export default {
  props: {
    visible: {
      type: Boolean,
    },
    id: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const formState = reactive({
      id: "",
      username: "",
      isAdmin: "",
      isAdminInfo: "",
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    });

    store.dispatch("user/getUserById", props.id).then((res) => {
      formState.id = res.id;
      formState.username = res.username;
      formState.isAdmin = res.isAdmin;
      if (res.isAdmin > 0) {
        formState.isAdminInfo = "管理员";
      } else {
        formState.isAdminInfo = "普通用户";
      }
    });

    const handleChange = async (e) => {
      formState.isAdmin = e;
    };

    const handleSubmit = async () => {
      if (formState.isAdmin.trim() == "") {
        return message.warning("用户权限不能为空！");
      }

      const userInfo = { id: props.id, isAdmin: formState.isAdmin };
      await store.dispatch("user/updateUser", userInfo).then(() => {
        store.commit("routes/SET_ROUTERACTIVE");
        setTimeout(() => {
          store.commit("routes/SET_ROUTERACTIVE");
        }, 500);
      });
    };

    return { ...toRefs(formState), handleChange, handleSubmit };
  },
};
</script>

<style></style>
