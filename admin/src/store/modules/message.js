import { message } from "ant-design-vue";
import {
  deleteMessage,
  deleteMessageAll,
  getMessageById,
  getMessageCount,
  getMessageList,
  getMessageListByUser,
  getMessageListByUsername,
} from "../../api/modules/message";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async deleteMessage({ commit }, id) {
    return deleteMessage(id).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`留言删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async deleteMessageAll({ commit }, ids) {
    return deleteMessageAll(ids).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`留言批量删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async getMessageById({ commit }, id) {
    return getMessageById(id).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取留言信息接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getMessageCount({ commit }) {
    return getMessageCount().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getMessageList({ commit }) {
    return getMessageList().then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取留言列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getMessageListByUsername({ commit }, username) {
    return getMessageListByUsername(username).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取留言用户列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
