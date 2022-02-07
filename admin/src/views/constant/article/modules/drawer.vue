<template>
  <a-drawer
    width="800"
    placement="right"
    :closable="true"
    :visible="visible"
    :id="id"
    :isAdmin="isAdmin"
  >
    <a-list
      v-if="articleListData.length > 0"
      item-layout="vertical"
      :data-source="articleListData"
    >
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <div class="detailed-title">
            {{ item.title }}
          </div>

          <div class="detailed-introduce">
            {{ item.introduce }}
          </div>

          <div class="detailed-tag">
            <a-tag v-for="item in item.tag" :key="item._id" :color="item.color">
              {{ item.tName }}
            </a-tag>
          </div>

          <div class="detailed-avator">
            {{ item.avator }}
          </div>

          <div class="detailed-icon">
            <span>
              <icon-font
                v-if="isAdminLoc > 0"
                type="icon-diquguanli"
                style="margin-right: 0.5rem"
              />
              <span v-if="isAdminLoc > 0">
                地区&nbsp;&nbsp;{{ item.region.rName }}
              </span>
              <a-divider v-if="isAdminLoc > 0" type="vertical" />
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
    <div class="layout-loading" v-else-if="!spinning">
      <a-empty description="用户文章获取失败，请检查服务端是否开启" />
    </div>
    <div class="layout-loading" v-else>
      <a-spin tip="数据加载中，请稍后..." :spinning="spinning" />
    </div>
  </a-drawer>
</template>

<script>
import { reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { IconFont } from "@/utils/showIconFont";
import moment from "moment";

export default {
  components: {
    IconFont,
  },
  props: {
    visible: {
      type: Boolean,
    },
    id: {
      type: String,
    },
    isAdmin: {
      type: Number,
    },
  },
  setup(props) {
    const store = useStore();
    const drawerState = reactive({
      spinning: true,
      isAdminLoc: "",
      articleListData: [],
    });

    drawerState.isAdminLoc = localStorage.isAdmin;

    if (props.isAdmin > 0) {
      store
        .dispatch("articleAdmin/getArticleAdminById", props.id)
        .then((res) => {
          drawerState.articleListData.push(res);
        })
        .finally(() => {
          drawerState.spinning = false;
        });
    } else {
      store
        .dispatch("articleUser/getArticleUserById", props.id)
        .then((res) => {
          console.log(res);
          drawerState.articleListData.push(res);
        })
        .finally(() => {
          drawerState.spinning = false;
        });
    }

    watch(() => props.id);

    return { ...toRefs(drawerState), moment };
  },
};
</script>

<style lang="scss" scoped>
.detailed-title {
  font-size: 2rem;
  padding: 0.5rem;
  text-align: center;
}

.detailed-introduce {
  font-size: 1rem;
  padding: 0.5rem;
  text-align: left;
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
  text-align: left;
}

.layout-loading {
  width: 100%;
  height: 100%;
  padding-top: 30vh;
  text-align: center;
  background-color: transparent;
}
</style>
