<template>
  <div class="home-div">
    <div class="breadcrumb">
      <Breadcrumb />
    </div>

    <a-list
      v-if="articleListData.length > 0"
      item-layout="vertical"
      size="large"
      :pagination="pagination"
      :data-source="articleListData"
    >
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <template #actions>
            <span>
              <icon-font
                type="icon-icon_pingfen"
                style="margin-right: 0.5rem"
              />
              {{
                Math.floor(
                  (item.statistic.sRate / item.statistic.sComment) * 100
                ) / 100
              }}
              <a-divider type="vertical" />
              <icon-font type="icon-shoucang1" style="margin-right: 0.5rem" />
              {{ item.statistic.sCollect }}
              <a-divider type="vertical" />
              <icon-font type="icon-icon-" style="margin-right: 0.5rem" />
              {{ item.statistic.sView }}
              <a-divider type="vertical" />
              <icon-font type="icon-riqi" style="margin-right: 0.5rem" />
              {{ moment(item.createdAt).format("YYYY-MM-DD") }}
              <a-divider type="vertical" />
              <icon-font
                type="icon-200yonghu_yonghu"
                style="margin-right: 0.5rem"
              />
              JudgeF
            </span>
          </template>

          <template #extra>
            <img
              v-if="item.cover"
              width="300"
              height="180"
              alt="picture-card"
              :src="item.cover"
            />
            <img
              v-else
              width="300"
              height="180"
              alt="picture-card"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </template>

          <a-list-item-meta :description="item.introduce">
            <template #title>
              <a>
                <router-link
                  :to="{
                    name: 'detailed-id',
                    params: {
                      id: item._id,
                      isAdmin: isAdmin,
                      type: 'ArticleAdmin',
                    },
                  }"
                >
                  {{ item.title }}
                </router-link>
              </a>
            </template>
          </a-list-item-meta>

          <a-tag v-for="item in item.tag" :key="item._id" :color="item.color">
            {{ item.tName }}
          </a-tag>
        </a-list-item>
      </template>
    </a-list>

    <div class="layout-loading" v-else-if="!spinning">
      <a-empty description="管理员文章获取失败，请检查服务端是否开启" />
    </div>

    <div class="layout-loading" v-else-if="have">
      <a-empty description="该管理员文章不存在" />
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
import moment from "moment";
import Breadcrumb from "@/components/breadcrumb/index.vue";

export default {
  components: {
    IconFont,
    Breadcrumb,
  },
  setup() {
    const store = useStore();
    const articleState = reactive({
      spinning: true,
      have: false,
      isAdmin: "",
      articleListData: [],
      pagination: {
        pageSize: 5,
      },
    });

    articleState.isAdmin = 1;

    const search = store.getters["routes/GET_SEARCHSTATE"];
    const title = store.getters["articleAdmin/GET_TITLE"];
    const tag = store.getters["routes/GET_TAGSTATE"];
    const tags = store.getters["articleAdmin/GET_TAG"];
    const region = store.getters["routes/GET_REGIONSTATE"];
    const regions = store.getters["articleAdmin/GET_REGION"];

    if (search) {
      store
        .dispatch("articleAdmin/getArticleAdminListByTitle", title)
        .then((res) => {
          if (res.length > 0) {
            articleState.have = false;
            articleState.articleListData = res;
          } else {
            articleState.have = true;
          }
        })
        .finally(() => {
          store.commit("routes/SET_SEARCHSTATE");
        });
    } else if (tag) {
      store
        .dispatch("articleAdmin/getArticleAdminList")
        .then((res) => {
          for (const item of res) {
            if (tags.includes(item.tag[0]._id)) {
              articleState.have = false;
              articleState.articleListData.push(item);
            } else {
              articleState.have = true;
            }
          }
          let obj = {};
          articleState.articleListData = articleState.articleListData.reduce(
            function (item, next) {
              obj[next._id] ? "" : (obj[next._id] = true && item.push(next));
              return item;
            },
            []
          );
        })
        .finally(() => {
          store.commit("routes/SET_TAGSTATE");
        });
    } else if (region) {
      store
        .dispatch("articleAdmin/getArticleAdminList")
        .then((res) => {
          for (const item of res) {
            if (regions.includes(item.region._id)) {
              articleState.have = false;
              if (item.region._id === regions) {
                articleState.articleListData.push(item);
              }
            } else {
              articleState.have = true;
            }
          }
        })
        .finally(() => {
          store.commit("routes/SET_REGIONSTATE");
        });
    } else {
      store
        .dispatch("articleAdmin/getArticleAdminList")
        .then((res) => {
          if (res) {
            articleState.articleListData = res;
          }
        })
        .finally(() => {
          articleState.spinning = false;
        });
    }

    return {
      ...toRefs(articleState),
      moment,
    };
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  background-color: #e1f0ff;
  border: 1px solid #eee;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.layout-loading {
  width: 100%;
  height: 100%;
  padding-top: 30vh;
  text-align: center;
  background-color: transparent;
}
</style>
