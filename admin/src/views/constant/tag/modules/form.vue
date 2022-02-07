<template>
  <a-modal
    title="ZFBlog System-标签管理"
    ok-text="确认"
    cancel-text="取消"
    :visible="visible"
    @ok="handleSubmit"
    @cancel="$emit('handleCancel')"
  >
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="标签名称">
        <a-input
          v-model:value="name"
          placeholder="请输入标签名称"
          :maxLength="10"
        />
      </a-form-item>
      <a-form-item label="标签颜色">
        <a-input
          v-model:value="color"
          placeholder="请输入标签颜色"
          :maxLength="10"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import filterWord from "@/utils/filterWord";

export default {
  props: {
    visible: {
      type: Boolean,
    },
    id: {
      type: String,
    },
    isAdmin: {
      type: Number,
    },
  },
  setup(props) {
    const store = useStore();
    const formState = reactive({
      name: "",
      color: "",
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    });

    if (props.id) {
      if (props.isAdmin > 0) {
        store.dispatch("tagAdmin/getTagAdminById", props.id).then((res) => {
          formState.name = res.tName;
          formState.color = res.color;
        });
      } else {
        store.dispatch("tagUser/getTagUserById", props.id).then((res) => {
          formState.name = res.tName;
          formState.color = res.color;
        });
      }
    }

    const handleSubmit = async () => {
      if (formState.name.trim() == "") {
        return message.warning("标签名称不能为空！");
      } else if (formState.color.trim() == "") {
        return message.warning("标签颜色不能为空！");
      }

      if (!props.id) {
        if (localStorage.isAdmin > 0) {
          const tagInfo = {
            tName: filterWord(formState.name),
            color: filterWord(formState.color),
          };
          await store.dispatch("tagAdmin/addTagAdmin", tagInfo).then(() => {
            store.commit("routes/SET_ROUTERACTIVE");
            setTimeout(() => {
              store.commit("routes/SET_ROUTERACTIVE");
            }, 500);
          });
        } else {
          const tagInfo = {
            tName: filterWord(formState.name),
            color: filterWord(formState.color),
          };
          await store.dispatch("tagUser/addTagUser", tagInfo).then(() => {
            store.commit("routes/SET_ROUTERACTIVE");
            setTimeout(() => {
              store.commit("routes/SET_ROUTERACTIVE");
            }, 500);
          });
        }
      } else {
        if (props.isAdmin > 0) {
          const tagInfo = {
            id: props.id,
            tName: filterWord(formState.name),
            color: filterWord(formState.color),
          };
          await store.dispatch("tagAdmin/updateTagAdmin", tagInfo).then(() => {
            store.commit("routes/SET_ROUTERACTIVE");
            setTimeout(() => {
              store.commit("routes/SET_ROUTERACTIVE");
            }, 500);
          });
        } else {
          const tagInfo = {
            id: props.id,
            tName: filterWord(formState.name),
            color: filterWord(formState.color),
          };
          await store.dispatch("tagUser/updateTagUser", tagInfo).then(() => {
            store.commit("routes/SET_ROUTERACTIVE");
            setTimeout(() => {
              store.commit("routes/SET_ROUTERACTIVE");
            }, 500);
          });
        }
      }
    };

    watch(() => props.id);

    return { ...toRefs(formState), handleSubmit };
  },
};
</script>

<style></style>
