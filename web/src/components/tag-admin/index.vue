<template>
  <div class="tag-div">
    <a-divider>
      <icon-font
        type="icon-200yonghu_yonghu"
        style="font-size: 15px; margin-right: 0.5rem"
      />
      管理员文章标签
    </a-divider>

    <div v-if="tagAdminListData.length > 0">
      <a-tag
        v-for="item in tagAdminListData"
        :key="item._id"
        :color="item.color"
        style="margin: 0.25rem"
      >
        {{ item.tName }}
      </a-tag>
    </div>

    <div v-else-if="!spinning">
      <a-empty description="管理员文章标签获取失败" />
    </div>

    <div class="layout-loading" v-else>
      <a-spin tip="数据加载中，请稍后..." :spinning="spinning" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { IconFont } from "@/utils/showIconFont";

export default {
  components: {
    IconFont,
  },
  setup() {
    const store = useStore();
    const tagState = reactive({
      spinning: true,
      tagAdminListData: [],
    });

    store
      .dispatch("tagAdmin/getTagAdminList")
      .then((res) => {
        if (res) {
          tagState.tagAdminListData = res;
        }
      })
      .finally(() => {
        tagState.spinning = false;
      });

    return {
      ...toRefs(tagState),
    };
  },
};
</script>

<style lang="scss" scoped>
.tag-div {
  text-align: center;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 0.5rem;
  border: 1px solid #eee;
}

.layout-loading {
  width: 100%;
  height: 100%;
  padding-top: 30vh;
  text-align: center;
  background-color: transparent;
}
</style>
