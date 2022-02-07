import { message } from "ant-design-vue";
import { addMessage, getMessageList } from "../../api/modules/message";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async addMessage({ commit }, messageInfo) {
    return addMessage(messageInfo).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.warning(msg);
        }
        return res;
      }
    });
  },

  async getMessageList({ commit }) {
    return getMessageList().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
