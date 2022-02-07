import { message } from "ant-design-vue";
import {
  addArticleAdmin,
  deleteArticleAdmin,
  deleteArticleAdminAll,
  updateArticleAdmin,
  getArticleAdminById,
  getArticleAdminCount,
  getArticleAdminList,
  getArticleAdminListByTitle,
  getArticleAdminListByRegion,
} from "../../api/modules/article-admin";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async addArticleAdmin({ commit }, articleInfo) {
    return addArticleAdmin(articleInfo).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`管理员文章添加接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async deleteArticleAdmin({ commit }, id) {
    return deleteArticleAdmin(id).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`管理员文章删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async deleteArticleAdminAll({ commit }, ids) {
    return deleteArticleAdminAll(ids).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`管理员文章批量删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async updateArticleAdmin({ commit }, articleInfo) {
    const { id } = articleInfo;
    return updateArticleAdmin(id, articleInfo).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`管理员文章编辑接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async getArticleAdminById({ commit }, id) {
    return getArticleAdminById(id).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取管理员文章信息接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getArticleAdminCount({ commit }) {
    return getArticleAdminCount().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getArticleAdminList({ commit }) {
    return getArticleAdminList().then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取管理员文章列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getArticleAdminListByTitle({ commit }, title) {
    return getArticleAdminListByTitle(title).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取管理员文章标题接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getArticleAdminListByRegion({ commit }, region) {
    return getArticleAdminListByRegion(region).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取管理员文章地区接口异常：${msg}`);
        }
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
