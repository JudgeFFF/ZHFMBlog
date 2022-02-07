<template>
  <div class="detailed-div">
    <div class="breadcrumb">
      <Breadcrumb />
    </div>

    <a-list
      v-if="articleListData.length > 0"
      item-layout="vertical"
      size="large"
      :data-source="articleListData"
    >
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <div class="detailed-button">
            <a-button
              v-if="!collect"
              type="primary"
              @click="setCollect"
              :disabled="disabled"
            >
              收藏
            </a-button>
            <a-button
              v-else
              type="primary"
              @click="setCollect"
              :disabled="disabled"
              ghost
            >
              已收藏
            </a-button>
          </div>

          <div class="detailed-title">
            {{ item.title }}
          </div>

          <div class="detailed-tag">
            <a-tag v-for="item in item.tag" :key="item._id" :color="item.color">
              {{ item.tName }}
            </a-tag>
          </div>

          <div class="detailed-icon">
            <span>
              <icon-font
                v-if="item.region"
                type="icon-diquguanli"
                style="margin-right: 0.5rem"
              />
              <span v-if="item.region">
                地区&nbsp;&nbsp;{{ item.region.rName }}
              </span>
              <a-divider v-if="item.region" type="vertical" />
              <icon-font
                type="icon-icon_pingfen"
                style="margin-right: 0.5rem"
              />
              评分&nbsp;&nbsp;{{
                Math.floor(
                  (item.statistic.sRate / item.statistic.sComment) * 100
                ) / 100
              }}
              <a-divider type="vertical" />
              <icon-font type="icon-shoucang1" style="margin-right: 0.5rem" />
              收藏&nbsp;&nbsp;{{ item.statistic.sCollect }}
              <a-divider type="vertical" />
              <icon-font type="icon-icon-" style="margin-right: 0.5rem" />
              访问&nbsp;&nbsp;{{ item.statistic.sView }}
              <a-divider type="vertical" />
              <icon-font type="icon-riqi" style="margin-right: 0.5rem" />
              日期&nbsp;&nbsp;{{ moment(item.createdAt).format("YYYY-MM-DD") }}
              <a-divider type="vertical" />
              <icon-font
                type="icon-200yonghu_yonghu"
                style="margin-right: 0.5rem"
              />
              <span v-if="item.user">
                作者&nbsp;&nbsp;{{ item.user.username }}
              </span>
              <span v-else>作者&nbsp;&nbsp;JudgeF</span>
            </span>
          </div>

          <div class="detailed-cover">
            <img
              v-if="item.cover"
              width="700"
              height="400"
              alt="picture-card"
              :src="item.cover"
            />
            <img
              v-else
              width="700"
              height="400"
              alt="picture-card"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </div>

          <div class="detailed-content">
            <v-md-preview :text="item.content"></v-md-preview>
          </div>
        </a-list-item>
      </template>
    </a-list>

    <div class="layout-loading-detailed" v-else-if="!spinning">
      <a-empty description="文章获取失败，请检查服务端是否开启" />
    </div>

    <div class="layout-loading-detailed" v-else>
      <a-spin tip="数据加载中，请稍后..." :spinning="spinning" />
    </div>

    <a-comment>
      <template #content>
        <a-form-item>
          <a-textarea
            placeholder="请登录后再评论，文明发言并保持 50 字数以内，该评论暂不支持回复"
            :disabled="disabled"
            :rows="5"
            :value="comment"
            @change="changeComment"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :loading="loading"
            @click="addComment"
          >
            提交评论
          </a-button>
          <span style="padding-left: 2rem">
            <a-rate v-model:value="value" :tooltips="desc" />
            <span class="ant-rate-text">{{ desc[value - 1] }}</span>
          </span>
        </a-form-item>
      </template>
    </a-comment>

    <a-list
      v-if="commentListData.length > 0"
      :pagination="pagination"
      :data-source="commentListData"
      :header="`${commentListData.length} 条评论`"
      item-layout="horizontal"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment :author="item.user.username">
            <template #avatar>
              <a-avatar>{{ item.user.username }}</a-avatar>
            </template>
            <template #content>
              <p>
                {{ item.cContent }}
              </p>
            </template>
            <template #datetime>
              <span>
                {{ moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
              </span>
            </template>
          </a-comment>
          <a-rate :value="item.rate" disabled />
        </a-list-item>
      </template>
    </a-list>

    <div class="layout-loading-comment" v-else-if="!spinning">
      <a-empty description="文章暂无评论，请注册并登录后提交评论" />
    </div>

    <div class="layout-loading-comment" v-else>
      <a-spin tip="数据加载中，请稍后..." :spinning="spinning" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { IconFont } from "@/utils/showIconFont";
import moment from "moment";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import filterWord from "@/utils/filterWord";

export default {
  components: {
    IconFont,
    Breadcrumb,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const articleState = reactive({
      spinning: true,
      loading: false,
      disabled: true,
      value: 3,
      collect: "",
      comment: "",
      articleListData: [],
      tagListData: [],
      commentListData: [],
      desc: ["非常差", "差", "一般", "好", "非常好"],
      pagination: {
        pageSize: 5,
      },
    });

    window.scrollTo({
      top: 0,
    });

    if (localStorage.elementTokenWeb) {
      articleState.disabled = false;
    }

    localStorage.setItem("id", route.params.id);
    localStorage.setItem("type", route.params.type);
    localStorage.setItem("isAdminLoc", route.params.isAdmin);

    const vStatisticInfo = {
      type: localStorage.type,
      objectId: localStorage.id,
    };
    store.dispatch("statistic/setViewStatistic", vStatisticInfo);

    if (localStorage.elementTokenWeb) {
      const getCollectInfo = {
        type: localStorage.type,
        objectId: localStorage.id,
      };
      store.dispatch("collect/getCollectStatus", getCollectInfo).then((res) => {
        articleState.collect = res.status;
      });
    }

    if (localStorage.isAdminLoc > 0) {
      store
        .dispatch("articleAdmin/getArticleAdminById", localStorage.id)
        .then((res) => {
          if (res) {
            articleState.articleListData.push(res);
          }
        })
        .finally(() => {
          articleState.spinning = false;
        });
      store
        .dispatch("comment/getCommentListByArticleAdmin", localStorage.id)
        .then((res) => {
          if (res) {
            articleState.commentListData = res;
            localStorage.setItem("commentLength", res.length);
          } else {
            articleState.disabled = true;
          }
        })
        .finally(() => {
          articleState.spinning = false;
        });
    } else {
      store
        .dispatch("articleUser/getArticleUserById", localStorage.id)
        .then((res) => {
          if (res) {
            articleState.articleListData.push(res);
          }
          console.log(articleState.articleListData);
        })
        .finally(() => {
          articleState.spinning = false;
        });
      store
        .dispatch("comment/getCommentListByArticleUser", localStorage.id)
        .then((res) => {
          if (res) {
            articleState.commentListData = res;
            localStorage.setItem("commentLength", res.length);
          } else {
            articleState.disabled = true;
          }
        })
        .finally(() => {
          articleState.spinning = false;
        });
    }

    const setCollect = () => {
      const setCollectInfo = {
        type: localStorage.type,
        objectId: localStorage.id,
      };
      store
        .dispatch("collect/setCollectStatus", setCollectInfo)
        .then(async (res) => {
          articleState.collect = res.status;
          await store.dispatch("statistic/setCollectStatistic", setCollectInfo);
        });
    };

    const addComment = () => {
      if (articleState.comment.trim() == "") {
        return message.warning("该评论为空，请重新输入");
      } else if (articleState.comment.trim().length < 5) {
        return message.warning("该评论最低字数 5 以内，请重新输入");
      } else if (articleState.comment.trim().length >= 50) {
        return message.warning("该评论限制字数 50 以内，请重新输入");
      }

      articleState.loading = true;
      setTimeout(async () => {
        articleState.loading = false;
        const commentInfo = {
          type: localStorage.type,
          objectId: localStorage.id,
          cContent: filterWord(articleState.comment),
          rate: articleState.value,
        };
        const cStatisticInfo = {
          type: localStorage.type,
          objectId: localStorage.id,
          sComment: parseInt(localStorage.commentLength) + 1,
        };
        const rStatisticInfo = {
          type: localStorage.type,
          objectId: localStorage.id,
          sRate: parseInt(articleState.value),
        };

        await store.dispatch("comment/addComment", commentInfo).then((res) => {
          if (res) {
            store.dispatch("statistic/setCommentStatistic", cStatisticInfo);
            store.dispatch("statistic/setRateStatistic", rStatisticInfo);
            store.commit("routes/SET_ROUTERACTIVE");
            setTimeout(() => {
              store.commit("routes/SET_ROUTERACTIVE");
            }, 500);
          }
        });

        articleState.comment = "";
      }, 500);
    };

    const changeComment = (e) => {
      articleState.comment = e.target.value;
    };

    return {
      ...toRefs(articleState),
      moment,
      setCollect,
      addComment,
      changeComment,
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

.detailed-button {
  padding: 0.5rem;
  text-align: right;
}

.detailed-title {
  font-size: 2rem;
  padding: 0.5rem;
  text-align: center;
}

.detailed-tag {
  text-align: center;
}

.detailed-icon {
  color: #aaa;
  padding: 0.5rem;
  text-align: center;
}

.detailed-cover {
  padding: 2rem;
  text-align: center;
}

.detailed-content {
  font-size: 1rem;
  padding: 0.5rem;
}

.layout-loading-detailed {
  width: 100%;
  height: 100%;
  padding-top: 50vh;
  padding-bottom: 50vh;
  text-align: center;
  background-color: transparent;
}

.layout-loading-comment {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: transparent;
}
</style>
