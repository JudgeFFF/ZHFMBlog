<template>
  <div class="list-div">
    <div style="margin-bottom: 20px">
      <a-button
        type="primary"
        :disabled="!hasSelected"
        @click="deleteAllRegion"
        danger
      >
        全部删除
      </a-button>
      <span v-if="hasSelected" style="margin: 0 20px">
        {{ `已选择 ${selectedRowKeys.length} 项` }}
      </span>

      <span style="float: right">
        <span>
          {{ `共 ${regionListData.length} 项` }}
        </span>
        <a-button type="primary" @click="addRegion" style="margin: 0 20px">
          新增地区
        </a-button>
        <a-input-search
          placeholder="请输入文章地区"
          enter-button
          @search="searchRegion"
          allowClear
          style="width: 200px"
        />
        <!-- <a-date-picker
          placeholder="请选择地区日期"
          @change="selectTime"
          style="width: 200px"
        /> -->
      </span>
    </div>

    <a-table
      v-if="regionListData.length > 0"
      :columns="columns"
      :data-source="regionListData"
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
      <template #updatedAt="{ text }">
        {{ moment(text).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #action="{ record }">
        <a-button type="primary" size="small" @click="updateRegion(record._id)">
          编辑
        </a-button>
        <a-divider type="vertical" />
        <a-button
          type="primary"
          size="small"
          @click="deleteRegion(record._id)"
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
      regionListData: [],
      selectListData: [],
      selectedRowKeys: [],
    });

    store
      .dispatch("region/getRegionList")
      .then((res) => {
        tableState.regionListData = res;
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

    const addRegion = () => {
      tableState.visible = true;
    };

    const deleteRegion = (e) => {
      Modal.confirm({
        title: "确认删除该地区吗？",
        icon: createVNode(ExclamationCircleOutlined),
        content: "一旦确认无法更改",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          await store.dispatch("region/deleteRegion", e).then(() => {
            store.commit("routes/SET_ROUTERACTIVE");
            setTimeout(() => {
              store.commit("routes/SET_ROUTERACTIVE");
            }, 500);
          });
        },
      });
    };

    const deleteAllRegion = () => {
      Modal.confirm({
        title: "确认删除已选择的地区吗？",
        icon: createVNode(ExclamationCircleOutlined),
        content: "一旦确认无法更改",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          await store
            .dispatch("region/deleteRegionAll", tableState.selectListData[0])
            .then(() => {
              store.commit("routes/SET_ROUTERACTIVE");
              setTimeout(() => {
                store.commit("routes/SET_ROUTERACTIVE");
              }, 500);
            });
        },
      });
    };

    const updateRegion = (e) => {
      tableState.id = e;
      tableState.visible = true;
    };

    const searchRegion = async (e) => {
      if (e.trim() == "") {
        return message.warning("文章地区不能为空！");
      }
      await store.dispatch("region/getRegionListByRName", e).then((res) => {
        tableState.regionListData = res;
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
      addRegion,
      deleteRegion,
      deleteAllRegion,
      updateRegion,
      searchRegion,
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
