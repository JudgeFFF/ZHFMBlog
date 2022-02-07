import { message } from "ant-design-vue";
import { register, login, changePassword } from "../../api/modules/auth";
import removeToken from "@/utils/removeToken";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async register({ commit }, userInfo) {
    return register(userInfo).then((res) => {
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

  async login({ commit }, userInfo) {
    return login(userInfo).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          const { token } = data;
          localStorage.setItem("elementTokenWeb", "Bearer " + token);
          message.success(msg);
        } else {
          message.warning(msg);
        }
        return res;
      }
    });
  },

  async changePassword({ commit }, userInfo) {
    return changePassword(userInfo).then((res) => {
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

  async logout({ commit }) {
    message.success("退出账号成功", 0.5).then(function () {
      removeToken();
      window.location.reload();
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
