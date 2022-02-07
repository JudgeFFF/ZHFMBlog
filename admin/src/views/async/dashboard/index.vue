<template>
  <div class="dashboard-div">
    <a-row :gutter="[10, 10]">
      <a-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <a-card class="card">
          <a-progress
            :percent="percent1"
            :show-info="false"
            size="small"
            status="active"
            style="margin-top: 10px"
          />
          <a-divider />
          <div class="card-left">
            <icon-font type="icon-icon-" />&nbsp;管理员文章访问量
          </div>
          <div class="card-right">{{ articleAdmin }} 人</div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <a-card class="card">
          <a-progress
            :percent="percent2"
            :show-info="false"
            size="small"
            status="active"
            style="margin-top: 10px"
          />
          <a-divider />
          <div class="card-left">
            <icon-font type="icon-icon-" />&nbsp;用户文章访问量
          </div>
          <div class="card-right">{{ articleUser }} 人</div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <a-card class="card">
          <a-progress
            :percent="percent3"
            :show-info="false"
            size="small"
            status="active"
            style="margin-top: 10px"
          />
          <a-divider />
          <div class="card-left">
            <icon-font type="icon-icon-" />&nbsp;站点访问量
          </div>
          <div class="card-right">{{ web }} 人</div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <a-card class="card">
          <a-progress
            :percent="percent4"
            :show-info="false"
            size="small"
            status="active"
            style="margin-top: 10px"
          />
          <a-divider />
          <div class="card-left">
            <icon-font type="icon-200yonghu_yonghu" />&nbsp;用户量
          </div>
          <div class="card-right">{{ user }} 人</div>
        </a-card>
      </a-col>

      <a-col :span="24">
        <a-card class="card">
          <a-tabs>
            <a-tab-pane key="1" tab="管理员文章浏览指数">
              <a-row>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <div id="container1" style="width: 100%"></div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <div id="container2" style="width: 100%"></div>
                </a-col>
              </a-row>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>

      <a-col :span="24">
        <a-card class="card">
          <a-tabs>
            <a-tab-pane key="1" tab="用户文章浏览指数">
              <a-row>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <div id="container3" style="width: 100%"></div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <div id="container4" style="width: 100%"></div>
                </a-col>
              </a-row>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <a-card title="管理员文章浏览排行" class="card">
          <a-row :gutter="10">
            <a-col span="24">
              <a-table
                :columns="columnsAdmin"
                :data-source="articleAdminListData"
                :rowKey="(record) => record._id"
                :pagination="false"
                style="margin-top: 10px"
              >
                <template #rate="{ text }">
                  {{ Math.floor(text * 100) / 100 }}
                </template>
                <template #createdAt="{ text }">
                  {{ moment(text).format("YYYY-MM-DD") }}
                </template>
              </a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <a-card title="用户文章浏览排行" class="card">
          <a-row :gutter="10">
            <a-col span="24">
              <a-table
                :columns="columnsUser"
                :data-source="articleUserListData"
                :rowKey="(record) => record._id"
                :pagination="false"
                style="margin-top: 10px"
              >
                <template #rate="{ text }">
                  {{ Math.floor(text * 100) / 100 }}
                </template>
                <template #createdAt="{ text }">
                  {{ moment(text).format("YYYY-MM-DD") }}
                </template>
              </a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, ref, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import { Chart } from "@antv/g2";
import { IconFont } from "@/utils/showIconFont";
import moment from "moment";
import columnsAdmin from "./modules/columnsAdmin";
import columnsUser from "./modules/columnsUser";

export default {
  components: {
    IconFont,
  },
  setup() {
    const store = useStore();
    const statisticState = reactive({
      percent1: 0,
      percent2: 0,
      percent3: 0,
      percent4: 0,
      articleAdmin: 0,
      articleUser: 0,
      web: 0,
      user: 0,
      articleAdminListData: [],
      articleUserListData: [],
    });

    store
      .dispatch("statistic/getStatisticViewListByArticleAdmin")
      .then((res) => {
        for (const item of res) {
          statisticState.articleAdmin =
            statisticState.articleAdmin + item.sView;
        }
      });

    store
      .dispatch("statistic/getStatisticViewListByArticleUser")
      .then((res) => {
        for (const item of res) {
          statisticState.articleUser = statisticState.articleUser + item.sView;
        }
      });

    store.dispatch("statistic/getStatisticAccessList").then((res) => {
      statisticState.web = res.sAccess;
    });

    store.dispatch("user/getUserCount").then((res) => {
      statisticState.user = res;
    });

    if (
      0 < statisticState.articleAdmin ||
      statisticState.articleUser ||
      statisticState.web ||
      statisticState.user <= 25
    ) {
      statisticState.percent1 = 25;
      statisticState.percent2 = 25;
      statisticState.percent3 = 25;
      statisticState.percent4 = 25;
    } else if (
      25 < statisticState.articleAdmin ||
      statisticState.articleUser ||
      statisticState.web ||
      statisticState.user <= 50
    ) {
      statisticState.percent1 = 50;
      statisticState.percent2 = 50;
      statisticState.percent3 = 50;
      statisticState.percent4 = 50;
    } else if (
      50 < statisticState.articleAdmin ||
      statisticState.articleUser ||
      statisticState.web ||
      statisticState.user <= 75
    ) {
      statisticState.percent1 = 75;
      statisticState.percent2 = 75;
      statisticState.percent3 = 75;
      statisticState.percent4 = 75;
    } else {
      statisticState.percent1 = 100;
      statisticState.percent2 = 100;
      statisticState.percent3 = 100;
      statisticState.percent4 = 100;
    }

    store
      .dispatch("statistic/getStatisticArticleAdminListByView")
      .then((res) => {
        statisticState.articleAdminListData = res;
      });

    store
      .dispatch("statistic/getStatisticArticleUserListByView")
      .then((res) => {
        statisticState.articleUserListData = res;
      });

    const chartRef1 = ref();
    const chartRef2 = ref();
    const chartRef3 = ref();
    const chartRef4 = ref();

    onMounted(() => {
      const data1 = [
        { year: "1 月", value: 5 },
        { year: "2 月", value: 2 },
        { year: "3 月", value: 1 },
        { year: "4 月", value: 7 },
        { year: "5 月", value: 11 },
        { year: "6 月", value: 6 },
        { year: "7 月", value: 7 },
        { year: "8 月", value: 9 },
        { year: "9 月", value: 13 },
        { year: "10 月", value: 13 },
        { year: "11 月", value: 13 },
        { year: "12 月", value: 13 },
      ];

      const chart1 = new Chart({
        container: "container1",
        autoFit: true,
        height: 300,
      });

      chartRef1.value = chart1;

      chart1.data(data1);

      chart1.scale({
        year: {
          range: [0, 1],
        },
        value: {
          min: 0,
          nice: true,
        },
      });

      chart1.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true,
      });

      chart1.line().position("year*value").label("value");
      chart1.point().position("year*value");

      chart1.render();

      const data3 = [
        { year: "1 月", value: 3 },
        { year: "2 月", value: 4 },
        { year: "3 月", value: 3.5 },
        { year: "4 月", value: 5 },
        { year: "5 月", value: 4.9 },
        { year: "6 月", value: 6 },
        { year: "7 月", value: 3 },
        { year: "8 月", value: 10 },
        { year: "9 月", value: 13 },
        { year: "10 月", value: 9 },
        { year: "11 月", value: 7 },
        { year: "12 月", value: 13 },
      ];

      const chart3 = new Chart({
        container: "container3",
        autoFit: true,
        height: 300,
      });

      chartRef3.value = chart3;

      chart3.data(data3);

      chart3.scale({
        year: {
          range: [0, 1],
        },
        value: {
          min: 0,
          nice: true,
        },
      });

      chart3.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true,
      });

      chart3.line().position("year*value").label("value");
      chart3.point().position("year*value");

      chart3.render();

      const data2 = [
        { item: "管理员文章总量", count: 40, percent: 0.4 },
        { item: "管理员标签总量", count: 21, percent: 0.21 },
        { item: "管理员评论总量", count: 17, percent: 0.17 },
        { item: "地区总量", count: 17, percent: 0.17 },
        { item: "留言总量", count: 17, percent: 0.17 },
      ];

      const chart2 = new Chart({
        container: "container2",
        autoFit: true,
        height: 300,
      });

      chart2.coordinate("theta", {
        radius: 0.75,
      });

      chart2.data(data2);

      chart2.scale("percent", {
        formatter: (val) => {
          val = val * 100 + "%";
          return val;
        },
      });

      chart2.tooltip({
        showTitle: false,
        showMarkers: false,
      });

      chart2
        .interval()
        .position("percent")
        .color("item")
        .label("percent", {
          content: (data) => {
            return `${data.item}: ${data.percent * 100}%`;
          },
        })
        .adjust("stack");

      chart2.interaction("element-active");

      chart2.render();

      const data4 = [
        { item: "用户文章总量", count: 40, percent: 0.4 },
        { item: "用户标签总量", count: 21, percent: 0.21 },
        { item: "用户评论总量", count: 17, percent: 0.17 },
      ];

      const chart4 = new Chart({
        container: "container4",
        autoFit: true,
        height: 300,
      });

      chart4.coordinate("theta", {
        radius: 0.75,
      });

      chart4.data(data4);

      chart4.scale("percent", {
        formatter: (val) => {
          val = val * 100 + "%";
          return val;
        },
      });

      chart4.tooltip({
        showTitle: false,
        showMarkers: false,
      });

      chart4
        .interval()
        .position("percent")
        .color("item")
        .label("percent", {
          content: (data) => {
            return `${data.item}: ${data.percent * 100}%`;
          },
        })
        .adjust("stack");

      chart4.interaction("element-active");

      chart4.render();
    });

    onUnmounted(() => {
      chartRef1.value && chartRef1.value.destroy();
      chartRef2.value && chartRef2.value.destroy();
      chartRef3.value && chartRef3.value.destroy();
      chartRef4.value && chartRef4.value.destroy();
    });

    return {
      ...toRefs(statisticState),
      moment,
      columnsAdmin,
      columnsUser,
    };
  },
};
</script>

<style lang="scss" scoped>
.dashboard-div {
  .ant-divider-horizontal {
    margin-bottom: 10px !important;
  }
  .card {
    border-color: #cccccc;
    border-radius: 0.5rem;

    .card-left {
      display: inline;
    }

    .card-right {
      float: right;
    }
  }
}
</style>
