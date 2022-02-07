<template>
  <div class="list-div">
    <div style="margin-bottom: 20px">
      <a-button
        type="primary"
        :disabled="!hasSelected"
        @click="deleteAllUser"
        danger
      >
        全部删除
      </a-button>
      <span v-if="hasSelected" style="margin: 0 20px">
        {{ `已选择 ${selectedRowKeys.length} 项` }}
      </span>

      <span style="float: right">
        <span>
          {{ `共 ${userListData.length} 项` }}
        </span>
        <a-input-search
          placeholder="请输入用户名"
          enter-button
          @search="searchUser"
          allowClear
          style="width: 200px; margin: 0 20px"
        />
        <a-select
          placeholder="请选择用户类型"
          @change="handleChange"
          style="width: 200px"
        >
          <a-select-option value="2">所有用户</a-select-option>
          <a-select-option value="1">管理员</a-select-option>
          <a-select-option value="0">用户</a-select-option>
        </a-select>
        <!-- <a-date-picker
          placeholder="请选择用户日期"
          @change="selectTime"
          style="width: 200px"
        /> -->
      </span>
    </div>

    <a-table
      v-if="userListData.length > 0"
      :columns="columns"
      :data-source="userListData"
      :rowKey="(record) => record._id"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      bordered
    >
      <template #isAdmin="{ text }">
        <span v-if="text == 1">管理员</span>
        <span v-if="text == 0">普通用户</span>
      </template>
      <template #createdAt="{ text }">
        {{ moment(text).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #updatedAt="{ text }">
        {{ moment(text).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #action="{ record }">
        <a-button type="primary" size="small" @click="updateUser(record._id)">
          编辑
        </a-button>
        <a-divider type="vertical" />
        <a-button
          type="primary"
          size="small"
          @click="deleteUser(record._id)"
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
      visible: false,
      id: "",
      userListData: [],
      selectListData: [],
      selectedRowKeys: [],
    });

    store
      .dispatch("user/getUserList")
      .then((res) => {
        tableState.userListData = res;
      })
      .finally(() => {
        tableState.spinning = false;
      });

    const hasSelected = computed(() => tableState.selectedRowKeys.length > 0);

    const onSelectChange = (selectedRowKeys) => {
      tableState.selectedRowKeys = selectedRowKeys;
      tableState.selectListData.splice(0);
      tableState.selectListData.push(selectedRowKeys);
    };

    const deleteUser = (e) => {
      Modal.confirm({
        title: "确认删除该用户吗？",
        icon: createVNode(ExclamationCircleOutlined),
        content: "一旦确认无法更改",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          await store.dispatch("user/deleteUser", e).then(() => {
            store.commit("routes/SET_ROUTERACTIVE");
            setTimeout(() => {
              store.commit("routes/SET_ROUTERACTIVE");
            }, 500);
          });
        },
      });
    };

    const deleteAllUser = () => {
      Modal.confirm({
        title: "确认删除已选择的用户吗？",
        icon: createVNode(ExclamationCircleOutlined),
        content: "一旦确认无法更改",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          await store
            .dispatch("user/deleteUserAll", tableState.selectListData[0])
            .then(() => {
              store.commit("routes/SET_ROUTERACTIVE");
              setTimeout(() => {
                store.commit("routes/SET_ROUTERACTIVE");
              }, 500);
            });
        },
      });
    };

    const updateUser = (e) => {
      tableState.id = e;
      tableState.visible = true;
    };

    const searchUser = async (e) => {
      if (e.trim() == "") {
        return message.warning("用户名不能为空！");
      }
      await store.dispatch("user/getUserListByUsername", e).then((res) => {
        tableState.userListData = res;
        tableState.spinning = true;
        setTimeout(() => {
          tableState.spinning = false;
        }, 500);
      });
    };

    const selectTime = async (e) => {
      console.log(moment(e).format("YYYY-MM-DD"));
    };

    const handleChange = async (e) => {
      if (e > 1) {
        store
          .dispatch("user/getUserList")
          .then((res) => {
            tableState.userListData = res;
          })
          .finally(() => {
            tableState.spinning = false;
          });
      } else {
        store
          .dispatch("user/getUserListByIsAdmin", e)
          .then((res) => {
            tableState.userListData = res;
          })
          .finally(() => {
            tableState.spinning = false;
          });
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
      deleteUser,
      deleteAllUser,
      updateUser,
      searchUser,
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
