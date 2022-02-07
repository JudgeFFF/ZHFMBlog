import { message } from "ant-design-vue";
import { getRegionList } from "../../api/modules/region";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async getRegionList({ commit }) {
    return getRegionList().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
