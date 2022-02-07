<template>
  <div class="search-div">
    <a-divider>
      <icon-font
        type="icon-search1"
        style="font-size: 15px; margin-right: 0.5rem"
      />
      用户标签搜索
    </a-divider>

    <a-select
      mode="multiple"
      placeholder="清空返回列表"
      @change="changeTag"
      style="width: 100%; text-align: left"
      allowClear
    >
      <a-select-option v-for="item in tagListData" :key="item._id">
        <a-tag :color="item.color">
          {{ item.tName }}
        </a-tag>
      </a-select-option>
    </a-select>
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
    const searchState = reactive({
      loading: false,
      tagListData: [],
    });

    store.dispatch("tagUser/getTagUserList").then((res) => {
      searchState.tagListData = res;
    });

    const changeTag = (e) => {
      if (e.length > 0) {
        store.commit("routes/SET_TAGSTATE");
        store.dispatch("articleUser/setTag", e);
        store.commit("routes/SET_ROUTERACTIVE");
        setTimeout(() => {
          store.commit("routes/SET_ROUTERACTIVE");
        }, 500);
      } else {
        store.commit("routes/SET_ROUTERACTIVE");
        setTimeout(() => {
          store.commit("routes/SET_ROUTERACTIVE");
        }, 500);
      }
    };

    return {
      ...toRefs(searchState),
      changeTag,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-div {
  text-align: center;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #fff;
  margin-right: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #eee;
}
</style>
