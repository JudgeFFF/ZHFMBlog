<template>
  <div class="search-div">
    <a-divider>
      <icon-font
        type="icon-search1"
        style="font-size: 15px; margin-right: 0.5rem"
      />
      文章地区搜索
    </a-divider>

    <a-select
      placeholder="清空返回列表"
      @change="changeRegion"
      style="width: 100%; text-align: left"
      allowClear
    >
      <a-select-option v-for="item in regionListData" :key="item._id">
        {{ item.rName }}
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
      regionListData: [],
    });

    store.dispatch("region/getRegionList").then((res) => {
      searchState.regionListData = res;
    });

    const changeRegion = (e) => {
      if (e != undefined) {
        store.commit("routes/SET_REGIONSTATE");
        store.dispatch("articleAdmin/setRegion", e);
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
      changeRegion,
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
