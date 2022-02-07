<template>
  <div class="list-div">
    <div style="margin-bottom: 20px">
      <a-button
        type="primary"
        :disabled="!hasSelected"
        @click="deleteAllComment"
        danger
      >
        全部删除
      </a-button>
      <span v-if="hasSelected" style="margin: 0 20px">
        {{ `已选择 ${selectedRowKeys.length} 项` }}
      </span>

      <span style="float: right">
        <span style="margin: 0 20px">
          {{ `共 ${commentListData.length} 项` }}
        </span>
        <a-input-search
          :disabled="disabled"
          placeholder="请输入评论标题"
          enter-button
          @search="searchTitle"
          allowClear
          style="width: 200px"
        />
        <a-input-search
          :disabled="disabled"
          placeholder="请输入评论用户"
          enter-button
          @search="searchUsername"
          allowClear
          style="width: 200px; margin: 0 20px"
        />
        <a-select
          placeholder="请选择评论类型"
          @change="handleChange"
          style="width: 200px"
        >
          <a-select-option value="0">普通用户</a-select-option>
          <a-select-option v-if="isAdminLoc == 1" value="1">
            管理员
          </a-select-option>
          <a-select-option value="2">个人</a-select-option>
        </a-select>
        <!-- <a-date-picker
          placeholder="请选择评论日期"
          @change="selectTime"
          style="width: 200px"
        /> -->
      </span>
    </div>

    <a-table
      v-if="commentListData.length > 0"
      :columns="columns"
      :data-source="commentListData"
      :rowKey="(record) => record._id"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      bordered
    >
      <template #type="{ text }">
        <span v-if="text === 'ArticleAdmin'">管理员</span>
        <span v-if="text === 'ArticleUser'">普通用户</span>
      </template>
      <template #createdAt="{ text }">
        {{ moment(text).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #action="{ record }">
        <a-button
          type="primary"
          size="small"
          @click="searchComment(record._id)"
          ghost
        >
          预览
        </a-button>
        <a-divider type="vertical" />
        <a-button
          type="primary"
          size="small"
          @click="deleteComment(record._id)"
          danger
        >
          删除
        </a-button>
      </template>
    </a-table>

    <div class="layout-loading" v-else>
      <a-spin tip="数据加载中，请稍后..." :spinning="spinning" />
    </div>

    <Form v-if="visible" :visible="visible" :id="id" @cancel="handleCancel" />
  </div>
</template>

<script>
import { reactive, computed, toRefs, watch, createVNode } from "vue";
import { useStore } from "vuex";
import { Modal, message } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import moment from "moment";
import columns from "./modules/columns";
import Form from "./modules/form.vue";

export default {
  components: {
    Form,
  },
  setup() {
    const store = useStore();
    const tableState = reactive({
      spinning: true,
      disabled: true,
      visible: false,
      id: "",
      username: "",
      isAdmin: "",
      isAdminLoc: "",
      commentListData: [],
      selectListData: [],
      selectedRowKeys: [],
    });

    tableState.username = localStorage.username;

    tableState.isAdminLoc = localStorage.isAdmin;

    if (tableState.isAdminLoc > 0) {
      tableState.isAdmin = 1;
      store
        .dispatch("comment/getCommentListByUsername", tableState.username)
        .then((res) => {
          res = res.filter((item) => {
            return item.user;
          });
          tableState.commentListData = res;
        })
        .finally(() => {
          tableState.spinning = false;
        });
    } else {
      tableState.isAdmin = 0;
      store
        .dispatch("comment/getCommentListByUsername", tableState.username)
        .then((res) => {
          res = res.filter((item) => {
            return item.user;
          });
          tableState.commentListData = res;
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

    const deleteComment = (e) => {
      Modal.confirm({
        title: "确认删除该评论吗？",
        icon: createVNode(ExclamationCircleOutlined),
        content: "一旦确认无法更改",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          await store.dispatch("comment/deleteComment", e).then(() => {
            store.commit("routes/SET_ROUTERACTIVE");
            setTimeout(() => {
              store.commit("routes/SET_ROUTERACTIVE");
            }, 500);
          });
        },
      });
    };

    const deleteAllComment = () => {
      Modal.confirm({
        title: "确认删除已选择的评论吗？",
        icon: createVNode(ExclamationCircleOutlined),
        content: "一旦确认无法更改",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          await store
            .dispatch("comment/deleteCommentAll", tableState.selectListData[0])
            .then(() => {
              store.commit("routes/SET_ROUTERACTIVE");
              setTimeout(() => {
                store.commit("routes/SET_ROUTERACTIVE");
              }, 500);
            });
        },
      });
    };

    const searchComment = async (e) => {
      tableState.id = e;
      tableState.visible = true;
    };

    const handleCancel = () => {
      tableState.visible = false;
    };

    const searchTitle = async (e) => {
      if (e.trim() == "") {
        return message.warning("评论标题不能为空！");
      }
      if (tableState.isAdmin > 0) {
        await store
          .dispatch("comment/getCommentArticleAdminListByCTitle", e)
          .then((res) => {
            res = res.filter((item) => {
              return item.objectId;
            });
            tableState.commentListData = res;
            tableState.spinning = true;
            setTimeout(() => {
              tableState.spinning = false;
            }, 500);
          });
      } else {
        await store
          .dispatch("comment/getCommentArticleUserListByCTitle", e)
          .then((res) => {
            res = res.filter((item) => {
              return item.objectId;
            });
            tableState.commentListData = res;
            tableState.spinning = true;
            setTimeout(() => {
              tableState.spinning = false;
            }, 500);
          });
      }
    };

    const searchUsername = async (e) => {
      if (e.trim() == "") {
        return message.warning("评论用户不能为空！");
      }
      await store
        .dispatch("comment/getCommentListByUsername", e)
        .then((res) => {
          res = res.filter((item) => {
            return item.user;
          });
          tableState.commentListData = res;
          tableState.spinning = true;
          setTimeout(() => {
            tableState.spinning = false;
          }, 500);
        });
    };

    const handleChange = (e) => {
      if (e == 0) {
        tableState.disabled = false;
        tableState.isAdmin = 0;
        if (tableState.isAdminLoc > 0) {
          store
            .dispatch("comment/getCommentListByArticleUser")
            .then((res) => {
              tableState.commentListData = res;
            })
            .finally(() => {
              tableState.spinning = false;
            });
        } else {
          store
            .dispatch(
              "comment/getCommentArticleUserListByUsername",
              tableState.username
            )
            .then((res) => {
              res = res.filter((item) => {
                return item.user;
              });
              tableState.commentListData = res;
            })
            .finally(() => {
              tableState.spinning = false;
            });
        }
      } else if (e == 1) {
        tableState.disabled = false;
        tableState.isAdmin = 1;
        store
          .dispatch("comment/getCommentListByArticleAdmin")
          .then((res) => {
            tableState.commentListData = res;
          })
          .finally(() => {
            tableState.spinning = false;
          });
      } else {
        tableState.disabled = true;
        tableState.isAdmin = 0;
        store
          .dispatch("comment/getCommentListByUsername", tableState.username)
          .then((res) => {
            res = res.filter((item) => {
              return item.user;
            });
            tableState.commentListData = res;
          })
          .finally(() => {
            tableState.spinning = false;
          });
      }
    };

    const selectTime = async (e) => {
      console.log(moment(e).format("YYYY-MM-DD"));
    };

    return {
      ...toRefs(tableState),
      moment,
      columns,
      hasSelected,
      onSelectChange,
      deleteComment,
      deleteAllComment,
      searchComment,
      handleCancel,
      searchUsername,
      searchTitle,
      handleChange,
      selectTime,
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
