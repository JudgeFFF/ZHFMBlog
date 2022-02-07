import { message } from "ant-design-vue";
import {
  addTagUser,
  deleteTagUser,
  deleteTagUserAll,
  updateTagUser,
  getTagUserById,
  getTagUserCount,
  getTagUserList,
  getTagUserListByUsername,
  getTagUserTNameListByUsername,
  getTagUserColorListByUsername,
  getTagUserListByTName,
  getTagUserListByColor,
} from "../../api/modules/tag-user";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async addTagUser({ commit }, tagInfo) {
    return addTagUser(tagInfo).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`用户标签添加接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async deleteTagUser({ commit }, id) {
    return deleteTagUser(id).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`用户标签删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async deleteTagUserAll({ commit }, ids) {
    return deleteTagUserAll(ids).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`用户标签批量删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async updateTagUser({ commit }, tagInfo) {
    const { id } = tagInfo;
    return updateTagUser(id, tagInfo).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`用户标签编辑接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async getTagUserById({ commit }, id) {
    return getTagUserById(id).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户标签信息接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getTagUserCount({ commit }) {
    return getTagUserCount().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getTagUserList({ commit }) {
    return getTagUserList().then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户标签列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getTagUserListByUsername({ commit }, username) {
    return getTagUserListByUsername(username).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户名标签列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getTagUserTNameListByUsername({ commit }, tagInfo) {
    const { username, tName } = tagInfo;
    return getTagUserTNameListByUsername(username, tName).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户名标签名称列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getTagUserColorListByUsername({ commit }, tagInfo) {
    const { username, color } = tagInfo;
    return getTagUserColorListByUsername(username, color).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户名标签颜色列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getTagUserListByTName({ commit }, tName) {
    return getTagUserListByTName(tName).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户标签名称接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getTagUserListByColor({ commit }, color) {
    return getTagUserListByColor(color).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户标签颜色接口异常：${msg}`);
        }
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
