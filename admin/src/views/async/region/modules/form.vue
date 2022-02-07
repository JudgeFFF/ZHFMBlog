<template>
  <a-modal
    title="ZFBlog System-地区管理"
    ok-text="确认"
    cancel-text="取消"
    :visible="visible"
    @ok="handleSubmit"
    @cancel="$emit('handleCancel')"
  >
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="文章地区" name="region">
        <a-input
          v-model:value="region"
          placeholder="请输入地区"
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
  },
  setup(props) {
    const store = useStore();
    const formState = reactive({
      region: "",
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
      store.dispatch("region/getRegionById", props.id).then((res) => {
        formState.region = res.rName;
      });
    }

    const handleSubmit = async () => {
      if (formState.region.trim() == "") {
        return message.warning("文章地区不能为空！");
      }
      if (!props.id) {
        const regionInfo = { rName: filterWord(formState.region) };
        await store.dispatch("region/addRegion", regionInfo).then(() => {
          store.commit("routes/SET_ROUTERACTIVE");
          setTimeout(() => {
            store.commit("routes/SET_ROUTERACTIVE");
          }, 500);
        });
      } else {
        const regionInfo = {
          id: props.id,
          rName: filterWord(formState.region),
        };
        await store.dispatch("region/updateRegion", regionInfo).then(() => {
          store.commit("routes/SET_ROUTERACTIVE");
          setTimeout(() => {
            store.commit("routes/SET_ROUTERACTIVE");
          }, 500);
        });
      }
    };

    return { ...toRefs(formState), handleSubmit };
  },
};
</script>

<style></style>
