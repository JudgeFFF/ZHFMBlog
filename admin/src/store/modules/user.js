import { message } from "ant-design-vue";
import {
  deleteUser,
  deleteUserAll,
  updateUser,
  getUserByToken,
  getUserById,
  getUserCount,
  getUserList,
  getUserListByUsername,
  getUserListByIsAdmin,
} from "../../api/modules/user";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async deleteUser({ commit }, id) {
    return deleteUser(id).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`用户删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async deleteUserAll({ commit }, ids) {
    return deleteUserAll(ids).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`用户批量删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async updateUser({ commit }, userInfo) {
    const { id } = userInfo;
    return updateUser(id, userInfo).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`用户编辑接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async getUserByToken({ commit }) {
    const res = await getUserByToken();
    const { code, msg, data } = res.data;
    if (code === 0) {
      if (data) {
        const { username, isAdmin } = data;
        localStorage.setItem("isAdmin", isAdmin);
        localStorage.setItem("username", username);
      }
      message.success(msg);
    } else {
      message.error(`用户信息接口异常：${msg}`);
    }
  },

  async getUserById({ commit }, id) {
    return getUserById(id).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户信息接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getUserCount({ commit }) {
    return getUserCount().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getUserList({ commit }) {
    return getUserList().then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getUserListByUsername({ commit }, username) {
    return getUserListByUsername(username).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户名接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getUserListByIsAdmin({ commit }, isAdmin) {
    return getUserListByIsAdmin(isAdmin).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取用户权限接口异常：${msg}`);
        }
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
