<template>
  <div class="collect-div">
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
              <span v-if="item.user">
                {{ item.user.username }}
              </span>
              <span v-else>JudgeF</span>
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
              <a v-if="item.user">
                <router-link
                  :to="{
                    name: 'detailed-id',
                    params: {
                      id: item._id,
                      isAdmin: isAdmin,
                      type: 'ArticleUser',
                    },
                  }"
                >
                  {{ item.title }}
                </router-link>
              </a>
              <a v-else>
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

    <div class="layout-loading" v-else>
      <a-spin tip="数据加载中，请稍后..." :spinning="spinning" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
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
      isAdmin: "",
      articleListData: [],
      pagination: {
        pageSize: 5,
      },
    });

    window.scrollTo({
      top: 0,
    });

    store
      .dispatch(
        "collect/getCollectArticleAdminListByUsername",
        localStorage.username
      )
      .then((res) => {
        const collectInfo = [];
        for (const item of res) {
          if (item.user) {
            collectInfo.push(item);
          }
        }
        if (collectInfo.length > 1) {
          const ids = [];
          for (const item of collectInfo) {
            ids.push(item.objectId);
          }
          store
            .dispatch("articleAdmin/getArticleAdminListById", ids)
            .then((res) => {
              articleState.isAdmin = 1;
              articleState.articleListData = res;
            });
        } else if (collectInfo.length == 1) {
          let id = "";
          for (const item of collectInfo) {
            id = item.objectId;
          }
          store.dispatch("articleAdmin/getArticleAdminById", id).then((res) => {
            articleState.isAdmin = 1;
            articleState.articleListData.push(res);
          });
        } else {
          message.warning("暂未收藏管理员文章");
        }
      })
      .finally(() => {
        articleState.spinning = false;
      });

    store
      .dispatch(
        "collect/getCollectArticleUserListByUsername",
        localStorage.username
      )
      .then((res) => {
        const collectInfo = [];
        for (const item of res) {
          if (item.user) {
            collectInfo.push(item);
          }
        }
        if (collectInfo.length > 1) {
          const ids = [];
          for (const item of collectInfo) {
            ids.push(item.objectId);
          }
          store
            .dispatch("articleUser/getArticleUserListById", ids)
            .then((res) => {
              articleState.isAdmin = 0;
              for (const item of res) {
                articleState.articleListData.push(item);
              }
            });
        } else if (collectInfo.length == 1) {
          let id = "";
          for (const item of collectInfo) {
            id = item.objectId;
          }
          store.dispatch("articleUser/getArticleUserById", id).then((res) => {
            articleState.isAdmin = 0;
            articleState.articleListData.push(res);
          });
        } else {
          message.warning("暂未收藏用户文章");
        }
      })
      .finally(() => {
        articleState.spinning = false;
      });

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
  padding-top: 35vh;
  text-align: center;
  background-color: transparent;
}
</style>
