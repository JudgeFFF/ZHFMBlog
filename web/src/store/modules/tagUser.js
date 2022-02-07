import { message } from "ant-design-vue";
import { getTagUserList } from "../../api/modules/tag-user";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async getTagUserList({ commit }) {
    return getTagUserList().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
