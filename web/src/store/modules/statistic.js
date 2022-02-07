import {
  setRateStatistic,
  setCollectStatistic,
  setViewStatistic,
  setCommentStatistic,
  setAccessStatistic,
  getStatisticListByRate,
  getStatisticListByView,
} from "../../api/modules/statistic";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async setRateStatistic({ commit }, statisticInfo) {
    return setRateStatistic(statisticInfo);
  },

  async setCollectStatistic({ commit }, statisticInfo) {
    return setCollectStatistic(statisticInfo);
  },

  async setViewStatistic({ commit }, statisticInfo) {
    return setViewStatistic(statisticInfo);
  },

  async setCommentStatistic({ commit }, statisticInfo) {
    return setCommentStatistic(statisticInfo);
  },

  async setAccessStatistic({ commit }) {
    return setAccessStatistic();
  },

  async getStatisticListByRate({ commit }, type) {
    return getStatisticListByRate(type).then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getStatisticListByView({ commit }, type) {
    return getStatisticListByView(type).then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
