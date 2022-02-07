<template>
  <a-modal title="ZFBlog System-评论管理" :footer="null" :visible="visible">
    <span>
      {{ content }}
    </span>
    <br />
    <a-rate :value="rate" disabled />
    <span class="ant-rate-text">{{ desc[rate - 1] }}</span>
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
      rate: "",
      content: "",
      desc: ["非常差", "差", "一般", "好", "非常好"],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    });

    store.dispatch("comment/getCommentById", props.id).then((res) => {
      formState.rate = res.rate;
      formState.content = res.cContent;
    });

    watch(() => props.id);

    return { ...toRefs(formState) };
  },
};
</script>

<style></style>
