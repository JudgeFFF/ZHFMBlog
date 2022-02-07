import {
  getCollectStatus,
  getCollectArticleAdminListByUsername,
  getCollectArticleUserListByUsername,
  setCollectStatus,
} from "../../api/modules/collect";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async getCollectStatus({ commit }, collectInfo) {
    const { type, objectId } = collectInfo;
    return getCollectStatus(type, objectId).then((res) => {
      const { data } = res;
      return data;
    });
  },

  async getCollectArticleAdminListByUsername({ commit }, username) {
    return getCollectArticleAdminListByUsername(username).then((res) => {
      const { data } = res.data;
      return data;
    });
  },

  async getCollectArticleUserListByUsername({ commit }, username) {
    return getCollectArticleUserListByUsername(username).then((res) => {
      const { data } = res.data;
      return data;
    });
  },

  async setCollectStatus({ commit }, collectInfo) {
    return setCollectStatus(collectInfo).then((res) => {
      const { data } = res;
      return data;
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
