import { message } from "ant-design-vue";
import {
  addArticleUser,
  deleteArticleUser,
  deleteArticleUserAll,
  updateArticleUser,
  getArticleUserById,
  getArticleUserCount,
  getArticleUserList,
  getArticleUserListByUsername,
  getArticleUserTitleListByUsername,
  getArticleUserListByTitle,
} from "../../api/modules/article-user";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async addArticleUser({ commit }, articleInfo) {
    return addArticleUser(articleInfo).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`用户文章添加接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async deleteArticleUser({ commit }, id) {
    return deleteArticleUser(id).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`用户文章删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async deleteArticleUserAll({ commit }, ids) {
    return deleteArticleUserAll(ids).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`用户文章批量删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async updateArticleUser({ commit }, articleInfo) {
    const { id } = articleInfo;
    return updateArticleUser(id, articleInfo).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`用户文章编辑接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async getArticleUserById({ commit }, id) {
    return getArticleUserById(id).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户文章信息接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getArticleUserCount({ commit }) {
    return getArticleUserCount().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getArticleUserList({ commit }) {
    return getArticleUserList().then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户文章列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getArticleUserListByUsername({ commit }, username) {
    return getArticleUserListByUsername(username).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户名文章列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getArticleUserTitleListByUsername({ commit }, articleInfo) {
    const { username, title } = articleInfo;
    return getArticleUserTitleListByUsername(username, title).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户名文章名称列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getArticleUserListByTitle({ commit }, title) {
    return getArticleUserListByTitle(title).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户文章标题接口异常：${msg}`);
        }
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
