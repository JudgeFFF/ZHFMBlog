<template>
  <div class="list-div">
    <div style="margin-bottom: 20px">
      <a-button
        type="primary"
        :disabled="!hasSelected"
        @click="deleteAllMessage"
        danger
      >
        全部删除
      </a-button>
      <span v-if="hasSelected" style="margin: 0 20px">
        {{ `已选择 ${selectedRowKeys.length} 项` }}
      </span>

      <span style="float: right">
        <span style="margin: 0 20px">
          {{ `共 ${messageListData.length} 项` }}
        </span>
        <a-input-search
          :disabled="disabled"
          placeholder="请输入留言用户"
          enter-button
          @search="searchUsername"
          allowClear
          style="width: 200px"
        />
        <!-- <a-date-picker
          placeholder="请选择留言日期"
          @change="selectTime"
          style="width: 200px"
        /> -->
      </span>
    </div>

    <a-table
      v-if="messageListData.length > 0"
      :columns="columns"
      :data-source="messageListData"
      :rowKey="(record) => record._id"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      bordered
    >
      <template #createdAt="{ text }">
        {{ moment(text).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #action="{ record }">
        <a-button
          type="primary"
          size="small"
          @click="searchMessage(record._id)"
          ghost
        >
          预览
        </a-button>
        <a-divider type="vertical" />
        <a-button
          type="primary"
          size="small"
          @click="deleteMessage(record._id)"
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
      disabled: false,
      spinning: true,
      visible: false,
      id: "",
      username: "",
      isAdminLoc: "",
      messageListData: [],
      selectListData: [],
      selectedRowKeys: [],
    });

    tableState.username = localStorage.username;

    tableState.isAdminLoc = localStorage.isAdmin;

    if (tableState.isAdminLoc > 0) {
      store
        .dispatch("message/getMessageList")
        .then((res) => {
          tableState.messageListData = res;
        })
        .finally(() => {
          tableState.spinning = false;
        });
    } else {
      tableState.disabled = true;
      store
        .dispatch("message/getMessageListByUsername", tableState.username)
        .then((res) => {
          console.log(res);
          res = res.filter((item) => {
            return item.user;
          });
          if (res.length == 0) {
            message.warning("该用户暂无留言");
          }
          tableState.messageListData = res;
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

    const deleteMessage = (e) => {
      Modal.confirm({
        title: "确认删除该留言吗？",
        icon: createVNode(ExclamationCircleOutlined),
        content: "一旦确认无法更改",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          await store.dispatch("message/deleteMessage", e).then(() => {
            store.commit("routes/SET_ROUTERACTIVE");
            setTimeout(() => {
              store.commit("routes/SET_ROUTERACTIVE");
            }, 500);
          });
        },
      });
    };

    const deleteAllMessage = () => {
      Modal.confirm({
        title: "确认删除已选择的留言吗？",
        icon: createVNode(ExclamationCircleOutlined),
        content: "一旦确认无法更改",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          await store
            .dispatch("message/deleteMessageAll", tableState.selectListData[0])
            .then(() => {
              store.commit("routes/SET_ROUTERACTIVE");
              setTimeout(() => {
                store.commit("routes/SET_ROUTERACTIVE");
              }, 500);
            });
        },
      });
    };

    const searchMessage = async (e) => {
      tableState.id = e;
      tableState.visible = true;
    };

    const searchUsername = async (e) => {
      if (e.trim() == "") {
        return message.warning("留言用户不能为空！");
      }
      await store
        .dispatch("message/getMessageListByUsername", e)
        .then((res) => {
          res = res.filter((item) => {
            return item.user;
          });
          tableState.messageListData = res;
          tableState.spinning = true;
          setTimeout(() => {
            tableState.spinning = false;
          }, 500);
        });
    };

    const selectTime = async (e) => {
      console.log(moment(e).format("YYYY-MM-DD"));
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
      deleteMessage,
      deleteAllMessage,
      searchUsername,
      searchMessage,
      selectTime,
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
