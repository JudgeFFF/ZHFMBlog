import { message } from "ant-design-vue";
import {
  addComment,
  getCommentListByArticleAdmin,
  getCommentListByArticleUser,
} from "../../api/modules/comment";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async addComment({ commit }, commentInfo) {
    return addComment(commentInfo).then((res) => {
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

  async getCommentListByArticleAdmin({ commit }, objectId) {
    return getCommentListByArticleAdmin(objectId).then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getCommentListByArticleUser({ commit }, objectId) {
    return getCommentListByArticleUser(objectId).then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
