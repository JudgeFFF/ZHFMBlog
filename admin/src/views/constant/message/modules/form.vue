<template>
  <a-modal title="ZFBlog System-留言管理" :footer="null" :visible="visible">
    <span>{{ content }}</span>
  </a-modal>
</template>

<script>
import { reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";

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
      content: "",
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
      store.dispatch("message/getMessageById", props.id).then((res) => {
        formState.content = res.mContent;
      });
    }

    watch(() => props.id);

    return { ...toRefs(formState) };
  },
};
</script>

<style></style>
