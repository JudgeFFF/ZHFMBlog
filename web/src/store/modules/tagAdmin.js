import { message } from "ant-design-vue";
import { getTagAdminList } from "../../api/modules/tag-admin";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async getTagAdminList({ commit }) {
    return getTagAdminList().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
