import { message } from "ant-design-vue";
import {
  addTagAdmin,
  deleteTagAdmin,
  deleteTagAdminAll,
  updateTagAdmin,
  getTagAdminById,
  getTagAdminCount,
  getTagAdminList,
  getTagAdminListByTName,
  getTagAdminListByColor,
} from "../../api/modules/tag-admin";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async addTagAdmin({ commit }, tagInfo) {
    return addTagAdmin(tagInfo).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`管理员标签添加接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async deleteTagAdmin({ commit }, id) {
    return deleteTagAdmin(id).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`管理员标签删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async deleteTagAdminAll({ commit }, ids) {
    return deleteTagAdminAll(ids).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`管理员标签批量删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async updateTagAdmin({ commit }, tagInfo) {
    const { id } = tagInfo;
    return updateTagAdmin(id, tagInfo).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`管理员标签编辑接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async getTagAdminById({ commit }, id) {
    return getTagAdminById(id).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取管理员标签信息接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getTagAdminCount({ commit }) {
    return getTagAdminCount().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getTagAdminList({ commit }) {
    return getTagAdminList().then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取管理员标签列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getTagAdminListByTName({ commit }, tName) {
    return getTagAdminListByTName(tName).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取管理员标签名称接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getTagAdminListByColor({ commit }, color) {
    return getTagAdminListByColor(color).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取管理员标签颜色接口异常：${msg}`);
        }
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
