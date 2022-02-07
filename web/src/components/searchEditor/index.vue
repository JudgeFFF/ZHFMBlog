<template>
  <div class="search-div">
    <a-divider>
      <icon-font
        type="icon-search1"
        style="font-size: 15px; margin-right: 0.5rem"
      />
      用户作者搜索
    </a-divider>

    <a-input-search
      v-model:value="value"
      placeholder="清空并单击回车返回列表"
      enter-button="搜索"
      :loading="loading"
      allow-clear
      @search="onSearch"
    />
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
      value: "",
      articleListData: [],
    });

    const onSearch = (e) => {
      if (e.trim() != "") {
        searchState.loading = true;
        store.commit("routes/SET_EDITORSTATE");
        store.dispatch("articleUser/setEditor", e);
        store.commit("routes/SET_ROUTERACTIVE");
        setTimeout(() => {
          searchState.value = "";
          searchState.loading = false;
          store.commit("routes/SET_ROUTERACTIVE");
        }, 500);
      } else {
        searchState.loading = true;
        store.commit("routes/SET_ROUTERACTIVE");
        setTimeout(() => {
          searchState.value = "";
          searchState.loading = false;
          store.commit("routes/SET_ROUTERACTIVE");
        }, 500);
      }
    };

    return {
      ...toRefs(searchState),
      onSearch,
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
