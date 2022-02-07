import { message } from "ant-design-vue";
import {
  deleteComment,
  deleteCommentAll,
  getCommentById,
  getCommentCountByArticleAdmin,
  getCommentCountByArticleUser,
  getCommentListByArticleAdmin,
  getCommentListByArticleUser,
  getCommentArticleUserListByUsername,
  getCommentListByUsername,
  getCommentArticleAdminListByCTitle,
  getCommentArticleUserListByCTitle,
} from "../../api/modules/comment";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async deleteComment({ commit }, id) {
    return deleteComment(id).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`评论删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async deleteCommentAll({ commit }, ids) {
    return deleteCommentAll(ids).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`评论批量删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async getCommentById({ commit }, id) {
    return getCommentById(id).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取评论信息接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getCommentCountByArticleAdmin({ commit }) {
    return getCommentCountByArticleAdmin().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getCommentCountByArticleUser({ commit }) {
    return getCommentCountByArticleUser().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getCommentListByArticleAdmin({ commit }) {
    return getCommentListByArticleAdmin().then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取评论管理员文章列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getCommentListByArticleUser({ commit }) {
    return getCommentListByArticleUser().then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取评论用户文章列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getCommentArticleUserListByUsername({ commit }, username) {
    return getCommentArticleUserListByUsername(username).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取评论用户文章评论用户列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getCommentListByUsername({ commit }, username) {
    return getCommentListByUsername(username).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取评论用户列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getCommentArticleAdminListByCTitle({ commit }, cTitle) {
    return getCommentArticleAdminListByCTitle(cTitle).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取评论管理员标题列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getCommentArticleUserListByCTitle({ commit }, cTitle) {
    return getCommentArticleUserListByCTitle(cTitle).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取评论用户标题列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
