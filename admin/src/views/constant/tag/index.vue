<template>
  <div class="list-div">
    <div style="margin-bottom: 20px">
      <a-button
        type="primary"
        :disabled="!hasSelected"
        @click="deleteAllTag"
        danger
      >
        全部删除
      </a-button>
      <span v-if="hasSelected" style="margin: 0 20px">
        {{ `已选择 ${selectedRowKeys.length} 项` }}
      </span>

      <span style="float: right">
        <span>
          {{ `共 ${tagListData.length} 项` }}
        </span>
        <a-button type="primary" @click="addTag" style="margin: 0 20px">
          新增标签
        </a-button>
        <a-input-search
          placeholder="请输入标签名称"
          enter-button
          @search="searchTag"
          allowClear
          style="width: 200px"
        />
        <a-input-search
          placeholder="请输入标签颜色"
          enter-button
          @search="searchColor"
          allowClear
          style="width: 200px; margin: 0 20px"
        />
        <a-select
          placeholder="请选择标签类型"
          @change="handleChange"
          style="width: 200px"
        >
          <a-select-option value="0"> 所有用户 </a-select-option>
          <a-select-option v-if="isAdminLoc == 1" value="1">
            管理员
          </a-select-option>
          <a-select-option v-if="isAdminLoc == 0" value="2">
            用户
          </a-select-option>
        </a-select>
        <!-- <a-date-picker
          placeholder="请选择标签日期"
          @change="selectTime"
          style="width: 200px"
        /> -->
      </span>
    </div>

    <a-table
      v-if="tagListData.length > 0"
      :columns="columns"
      :data-source="tagListData"
      :rowKey="(record) => record._id"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      bordered
    >
      <template #username="{ text }">
        <span v-if="text">{{ text }}</span>
        <span v-else>JudgeF</span>
      </template>
      <template #createdAt="{ text }">
        {{ moment(text).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #updatedAt="{ text }">
        {{ moment(text).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #action="{ record }">
        <a-button
          :disabled="disabledEdit"
          type="primary"
          size="small"
          @click="updateTag(record._id)"
        >
          编辑
        </a-button>
        <a-divider type="vertical" />
        <a-button
          :disabled="disabledDelete"
          type="primary"
          size="small"
          @click="deleteTag(record._id)"
          danger
        >
          删除
        </a-button>
      </template>
    </a-table>

    <div class="layout-loading" v-else>
      <a-spin tip="数据加载中，请稍后..." :spinning="spinning" />
    </div>

    <Form
      v-if="visible"
      :visible="visible"
      :id="id"
      :isAdmin="isAdmin"
      @cancel="handleCancel"
    />
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
      disabledEdit: false,
      disabledDelete: false,
      visible: false,
      id: "",
      username: "",
      isAdmin: "",
      isAdminLoc: "",
      tagListData: [],
      selectListData: [],
      selectedRowKeys: [],
    });

    tableState.username = localStorage.username;

    tableState.isAdminLoc = localStorage.isAdmin;

    if (tableState.isAdminLoc > 0) {
      tableState.isAdmin = 1;
      store
        .dispatch("tagAdmin/getTagAdminList")
        .then((res) => {
          tableState.tagListData = res;
        })
        .finally(() => {
          tableState.spinning = false;
        });
    } else {
      tableState.isAdmin = 0;
      store
        .dispatch("tagUser/getTagUserListByUsername", tableState.username)
        .then((res) => {
          res = res.filter((item) => {
            return item.user;
          });
          tableState.tagListData = res;
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

    const addTag = () => {
      tableState.visible = true;
    };

    const deleteTag = (e) => {
      Modal.confirm({
        title: "确认删除该文章标签吗？",
        icon: createVNode(ExclamationCircleOutlined),
        content: "一旦确认无法更改",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          if (tableState.isAdmin > 0) {
            await store.dispatch("tagAdmin/deleteTagAdmin", e).then(() => {
              store.commit("routes/SET_ROUTERACTIVE");
              setTimeout(() => {
                store.commit("routes/SET_ROUTERACTIVE");
              }, 500);
            });
          } else {
            await store.dispatch("tagUser/deleteTagUser", e).then(() => {
              store.commit("routes/SET_ROUTERACTIVE");
              setTimeout(() => {
                store.commit("routes/SET_ROUTERACTIVE");
              }, 500);
            });
          }
        },
      });
    };

    const deleteAllTag = () => {
      Modal.confirm({
        title: "确认删除已选择的文章标签吗？",
        icon: createVNode(ExclamationCircleOutlined),
        content: "一旦确认无法更改",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          if (tableState.isAdmin > 0) {
            await store
              .dispatch(
                "tagAdmin/deleteTagAdminAll",
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
                "tagUser/deleteTagUserAll",
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
      });
    };

    const updateTag = (e) => {
      tableState.id = e;
      tableState.visible = true;
    };

    const searchTag = async (e) => {
      if (tableState.isAdminLoc > 0) {
        if (e.trim() == "") {
          return message.warning("标签名称不能为空！");
        }
        if (tableState.isAdmin > 0) {
          await store
            .dispatch("tagAdmin/getTagAdminListByTName", e)
            .then((res) => {
              tableState.tagListData = res;
              tableState.spinning = true;
              setTimeout(() => {
                tableState.spinning = false;
              }, 500);
            });
        } else {
          await store
            .dispatch("tagUser/getTagUserListByTName", e)
            .then((res) => {
              tableState.tagListData = res;
              tableState.spinning = true;
              setTimeout(() => {
                tableState.spinning = false;
              }, 500);
            });
        }
      } else {
        if (tableState.isAdmin > 0) {
          const tagInfo = { username: tableState.username, tName: e };
          await store
            .dispatch("tagUser/getTagUserTNameListByUsername", tagInfo)
            .then((res) => {
              res = res.filter((item) => {
                return item.user;
              });
              tableState.tagListData = res;
              tableState.spinning = true;
              setTimeout(() => {
                tableState.spinning = false;
              }, 500);
            });
        } else {
          await store
            .dispatch("tagUser/getTagUserListByTName", e)
            .then((res) => {
              tableState.tagListData = res;
              tableState.spinning = true;
              setTimeout(() => {
                tableState.spinning = false;
              }, 500);
            });
        }
      }
    };

    const searchColor = async (e) => {
      if (e.trim() == "") {
        return message.warning("标题颜色不能为空！");
      }
      if (tableState.isAdminLoc > 0) {
        if (tableState.isAdmin > 0) {
          await store
            .dispatch("tagAdmin/getTagAdminListByColor", e)
            .then((res) => {
              tableState.tagListData = res;
              tableState.spinning = true;
              setTimeout(() => {
                tableState.spinning = false;
              }, 500);
            });
        } else {
          await store
            .dispatch("tagUser/getTagUserListByColor", e)
            .then((res) => {
              tableState.tagListData = res;
              tableState.spinning = true;
              setTimeout(() => {
                tableState.spinning = false;
              }, 500);
            });
        }
      } else {
        if (tableState.isAdmin > 0) {
          const tagInfo = { username: tableState.username, color: e };
          await store
            .dispatch("tagUser/getTagUserColorListByUsername", tagInfo)
            .then((res) => {
              res = res.filter((item) => {
                return item.user;
              });
              tableState.tagListData = res;
              tableState.spinning = true;
              setTimeout(() => {
                tableState.spinning = false;
              }, 500);
            });
        } else {
          await store
            .dispatch("tagUser/getTagUserListByColor", e)
            .then((res) => {
              tableState.tagListData = res;
              tableState.spinning = true;
              setTimeout(() => {
                tableState.spinning = false;
              }, 500);
            });
        }
      }
    };

    const selectTime = async (e) => {
      console.log(moment(e).format("YYYY-MM-DD"));
    };

    const handleChange = (e) => {
      if (tableState.isAdminLoc > 0) {
        if (e == 0) {
          tableState.disabledEdit = true;
          tableState.disabledDelete = false;
          tableState.isAdmin = 0;
          store
            .dispatch("tagUser/getTagUserList")
            .then((res) => {
              tableState.tagListData = res;
            })
            .finally(() => {
              tableState.spinning = false;
            });
        } else {
          tableState.disabledEdit = false;
          tableState.disabledDelete = false;
          tableState.isAdmin = 1;
          store
            .dispatch("tagAdmin/getTagAdminList")
            .then((res) => {
              tableState.tagListData = res;
            })
            .finally(() => {
              tableState.spinning = false;
            });
        }
      } else {
        if (e == 0) {
          tableState.disabledEdit = true;
          tableState.disabledDelete = true;
          tableState.isAdmin = 0;
          store
            .dispatch("tagUser/getTagUserList")
            .then((res) => {
              tableState.tagListData = res;
            })
            .finally(() => {
              tableState.spinning = false;
            });
        } else {
          tableState.disabledEdit = false;
          tableState.disabledDelete = false;
          tableState.isAdmin = 2;
          store
            .dispatch("tagUser/getTagUserListByUsername", tableState.username)
            .then((res) => {
              res = res.filter((item) => {
                return item.user;
              });
              tableState.tagListData = res;
            })
            .finally(() => {
              tableState.spinning = false;
            });
        }
      }
    };

    const handleCancel = () => {
      tableState.visible = false;
    };

    return {
      ...toRefs(tableState),
      moment,
      columns,
      hasSelected,
      onSelectChange,
      addTag,
      deleteTag,
      deleteAllTag,
      updateTag,
      searchTag,
      searchColor,
      selectTime,
      handleChange,
      handleCancel,
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
