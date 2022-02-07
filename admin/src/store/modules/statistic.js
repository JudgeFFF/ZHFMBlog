import { message } from "ant-design-vue";
import {
  getStatisticViewListByArticleAdmin,
  getStatisticViewListByArticleUser,
  getStatisticAccessList,
  getStatisticArticleAdminListByView,
  getStatisticArticleUserListByView,
} from "../../api/modules/statistic";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async getStatisticViewListByArticleAdmin({ commit }) {
    return getStatisticViewListByArticleAdmin().then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取管理员文章浏览数据列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getStatisticViewListByArticleUser({ commit }) {
    return getStatisticViewListByArticleUser().then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取访问数据列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getStatisticAccessList({ commit }) {
    return getStatisticAccessList().then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户文章浏览数据列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getStatisticArticleAdminListByView({ commit }) {
    return getStatisticArticleAdminListByView().then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取管理员文章访问列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getStatisticArticleUserListByView({ commit }) {
    return getStatisticArticleUserListByView().then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户文章访问列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
