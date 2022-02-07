<template>
  <div class="visit-div">
    <a-divider>
      <icon-font
        type="icon-icon_pingfen"
        style="font-size: 15px; margin-right: 0.5rem"
      />
      管理员文章评分排行
    </a-divider>

    <a-list
      v-if="articleListData.length > 0"
      item-layout="horizontal"
      :data-source="articleListData"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta>
            <template #title>
              <a>
                <router-link
                  :to="{
                    name: 'detailed-id',
                    params: {
                      id: item._id,
                      isAdmin: isAdmin,
                      type: type,
                    },
                  }"
                >
                  {{ item.title }}
                </router-link>
              </a>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>

    <div v-else-if="!spinning">
      <a-empty description="管理员文章评分排行获取失败" />
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
    const articleState = reactive({
      spinning: true,
      type: "",
      isAdmin: "",
      articleListData: [],
    });

    articleState.isAdmin = 1;
    articleState.type = "ArticleAdmin";

    store
      .dispatch("statistic/getStatisticListByRate", articleState.type)
      .then((res) => {
        if (res) {
          for (const item of res) {
            articleState.articleListData.push(item.objectId);
          }
        }
      })
      .finally(() => {
        articleState.spinning = false;
      });

    return { ...toRefs(articleState) };
  },
};
</script>

<style lang="scss" scoped>
.visit-div {
  text-align: center;
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
