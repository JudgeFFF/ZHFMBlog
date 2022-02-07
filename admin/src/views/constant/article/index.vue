<template>
  <div class="list-div">
    <div style="margin-bottom: 20px">
      <a-button
        type="primary"
        :disabled="!hasSelected"
        @click="deleteAllArticle"
        danger
      >
        全部删除
      </a-button>
      <span v-if="hasSelected" style="margin: 0 20px">
        {{ `已选择 ${selectedRowKeys.length} 项` }}
      </span>

      <span style="float: right">
        <span>
          {{ `共 ${articleListData.length} 项` }}
        </span>
        <a-button type="primary" @click="addArticle" style="margin: 0 20px">
          新增文章
        </a-button>
        <a-input-search
          placeholder="请输入文章标题"
          enter-button
          @search="searchTitle"
          allowClear
          style="width: 200px"
        />
        <a-select
          :disabled="disabled"
          placeholder="请选择地区类型"
          @change="searchRegion"
          style="width: 200px; margin: 0 20px"
        >
          <a-select-option value="2"> 所有地区 </a-select-option>
          <a-select-option v-for="item in regionListData" :key="item._id">
            {{ item.rName }}
          </a-select-option>
        </a-select>
        <a-select
          :disabled="disabled"
          placeholder="请选择文章类型"
          @change="handleChange"
          style="width: 200px"
        >
          <a-select-option value="1"> 管理员 </a-select-option>
          <a-select-option value="0"> 用户 </a-select-option>
        </a-select>
        <!-- <a-date-picker
          placeholder="请选择文章日期"
          @change="selectTime"
          style="width: 200px"
        /> -->
      </span>
    </div>

    <a-table
      v-if="articleListData.length > 0"
      :columns="columns"
      :data-source="articleListData"
      :rowKey="(record) => record._id"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      bordered
    >
      <template #tag="{ text }">
        <a-tag v-for="item in text" :key="item._id" :color="item.color">
          {{ item.tName }}
        </a-tag>
      </template>
      <template #createdAt="{ text }">
        {{ moment(text).format("YYYY-MM-DD") }}
      </template>
      <template #username="{ text }">
        <span v-if="text">{{ text }}</span>
        <span v-else>JudgeF</span>
      </template>
      <template #action="{ record }">
        <a-button
          size="small"
          type="primary"
          @click="searchArticle(record._id)"
          ghost
        >
          预览
        </a-button>
        <a-divider type="vertical" />
        <a-button
          :disabled="disabledEdit"
          type="primary"
          size="small"
          @click="updateArticle(record._id)"
        >
          编辑
        </a-button>
        <a-divider type="vertical" />
        <a-button
          type="primary"
          size="small"
          @click="deleteArticle(record._id)"
          danger
        >
          删除
        </a-button>
      </template>
    </a-table>

    <div class="layout-loading" v-else>
      <a-spin tip="数据加载中，请稍后..." :spinning="spinning" />
    </div>

    <Drawer
      v-if="visible"
      :visible="visible"
      :id="id"
      :isAdmin="isAdmin"
      @close="onClose"
    />
  </div>
</template>

<script>
import { reactive, computed, toRefs, createVNode } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Modal, message } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import moment from "moment";
import columns from "./modules/columns";
import Drawer from "./modules/drawer.vue";

export default {
  components: {
    Drawer,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const tableState = reactive({
      spinning: true,
      disabled: true,
      disabledEdit: false,
      visible: false,
      id: "",
      username: "",
      isAdmin: "",
      isAdminLoc: "",
      articleListData: [],
      regionListData: [],
      tagListData: [],
      selectListData: [],
      selectedRowKeys: [],
    });

    tableState.username = localStorage.username;

    tableState.isAdminLoc = localStorage.isAdmin;

    if (tableState.isAdminLoc > 0) {
      tableState.disabled = false;
      tableState.isAdmin = 1;
      store
        .dispatch("articleAdmin/getArticleAdminList")
        .then((res) => {
          tableState.articleListData = res;
        })
        .finally(() => {
          tableState.spinning = false;
        });
      store
        .dispatch("region/getRegionList")
        .then((res) => {
          tableState.regionListData = res;
        })
        .finally(() => {
          tableState.spinning = false;
        });
    } else {
      delete columns[1];
      tableState.isAdmin = 0;
      store
        .dispatch(
          "articleUser/getArticleUserListByUsername",
          tableState.username
        )
        .then((res) => {
          res = res.filter((item) => {
            return item.user;
          });
          tableState.articleListData = res;
        })
        .finally(() => {
          tableState.spinning = false;
        });
    }

    const hasSelected = computed(() => tableState.selectedRowKeys.length > 0);

    const onSelectChange = (selectedRowKeys) => {
      tableState.selectedRowKeys = selectedRowKeys;
      tableState.selectListData.splice(0);
      tableState.selectListData.push(selectedRowKeys);
    };

    const addArticle = () => {
      router.push({
        name: "article-edit",
      });
    };

    const deleteArticle = (e) => {
      Modal.confirm({
        title: "确认删除该文章吗？",
        icon: createVNode(ExclamationCircleOutlined),
        content: "一旦确认无法更改",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          if (tableState.isAdmin > 0) {
            await store
              .dispatch("articleAdmin/deleteArticleAdmin", e)
              .then(() => {
                store.commit("routes/SET_ROUTERACTIVE");
                setTimeout(() => {
                  store.commit("routes/SET_ROUTERACTIVE");
                }, 500);
              });
          } else {
            await store
              .dispatch("articleUser/deleteArticleUser", e)
              .then(() => {
                store.commit("routes/SET_ROUTERACTIVE");
                setTimeout(() => {
                  store.commit("routes/SET_ROUTERACTIVE");
                }, 500);
              });
          }
        },
        onCancel: () => {
          message.warning("取消文章删除");
        },
      });
    };

    const deleteAllArticle = () => {
      Modal.confirm({
        title: "确认删除已选择的文章吗？",
        icon: createVNode(ExclamationCircleOutlined),
        content: "一旦确认无法更改",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          if (tableState.isAdmin > 0) {
            await store
              .dispatch(
                "articleAdmin/deleteArticleAdminAll",
                tableState.selectListData[0]
              )
              .then(() => {
                store.commit("routes/SET_ROUTERACTIVE");
                setTimeout(() => {
                  store.commit("routes/SET_ROUTERACTIVE");
                }, 500);
              });
          } else {
            await store
              .dispatch(
                "articleUser/deleteArticleUserAll",
                tableState.selectListData[0]
              )
              .then(() => {
                store.commit("routes/SET_ROUTERACTIVE");
                setTimeout(() => {
                  store.commit("routes/SET_ROUTERACTIVE");
                }, 500);
              });
          }
        },
        onCance: () => {
          message.warning("取消文章删除");
        },
      });
    };

    const updateArticle = (e) => {
      router.push({
        name: "article-edit",
        params: { id: e, isAdmin: tableState.isAdmin },
      });
    };

    const searchArticle = (e) => {
      tableState.id = e;
      tableState.visible = true;
    };

    const searchTitle = async (e) => {
      if (e.trim() == "") {
        return message.warning("文章标题不能为空");
      }
      if (tableState.isAdminLoc > 0) {
        if (tableState.isAdmin > 0) {
          await store
            .dispatch("articleAdmin/getArticleAdminListByTitle", e)
            .then((res) => {
              tableState.articleListData = res;
              tableState.spinning = true;
              setTimeout(() => {
                tableState.spinning = false;
              }, 500);
            });
        } else {
          await store
            .dispatch("articleUser/getArticleUserListByTitle", e)
            .then((res) => {
              tableState.articleListData = res;
              tableState.spinning = true;
              setTimeout(() => {
                tableState.spinning = false;
              }, 500);
            });
        }
      } else {
        const articleInfo = { username: tableState.username, title: e };
        await store
          .dispatch(
            "articleUser/getArticleUserTitleListByUsername",
            articleInfo
          )
          .then((res) => {
            res = res.filter((item) => {
              return item.user;
            });
            tableState.articleListData = res;
            tableState.spinning = true;
            setTimeout(() => {
              tableState.spinning = false;
            }, 500);
          });
      }
    };

    const searchRegion = async (e) => {
      if (e == 2) {
        store
          .dispatch("articleAdmin/getArticleAdminList")
          .then((res) => {
            tableState.articleListData = res;
          })
          .finally(() => {
            tableState.spinning = false;
          });
      } else {
        await store
          .dispatch("articleAdmin/getArticleAdminListByRegion", e)
          .then((res) => {
            tableState.articleListData = res;
            tableState.spinning = true;
            setTimeout(() => {
              tableState.spinning = false;
            }, 500);
          });
      }
    };

    const selectTime = async (e) => {
      console.log(moment(e).format("YYYY-MM-DD"));
    };

    const handleChange = (e) => {
      if (e > 0) {
        tableState.disabledEdit = false;
        tableState.isAdmin = 1;
        store
          .dispatch("articleAdmin/getArticleAdminList")
          .then((res) => {
            tableState.articleListData = res;
          })
          .finally(() => {
            tableState.spinning = false;
          });
      } else {
        tableState.disabledEdit = true;
        tableState.isAdmin = 0;
        store
          .dispatch("articleUser/getArticleUserList")
          .then((res) => {
            tableState.articleListData = res;
          })
          .finally(() => {
            tableState.spinning = false;
          });
      }
    };

    const onClose = () => {
      tableState.visible = false;
    };

    return {
      ...toRefs(tableState),
      moment,
      columns,
      hasSelected,
      onSelectChange,
      addArticle,
      deleteArticle,
      deleteAllArticle,
      updateArticle,
      searchArticle,
      searchTitle,
      searchRegion,
      selectTime,
      handleChange,
      onClose,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout-loading {
  width: 100%;
  height: 100%;
  padding-top: 35vh;
  text-align: center;
  background-color: transparent;
}
</style>
