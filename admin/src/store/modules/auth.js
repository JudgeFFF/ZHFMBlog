import { message, notification } from "ant-design-vue";
import { login } from "../../api/modules/auth";
import removeToken from "@/utils/removeToken";

const state = {
  token: "",
  username: "",
  isAdmin: 0,
};

const getters = {
  GET_TOKEN: (state) => state.token,
  GET_USERNAME: (state) => state.username,
  GET_ROLE: (state) => state.isAdmin,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USERNAME(state, username) {
    state.username = username;
  },
  SET_ROLE(state, isAdmin) {
    state.isAdmin = isAdmin;
  },
};

const actions = {
  setToken({ commit }, token) {
    commit("SET_TOKEN", token);
  },

  setUserName({ commit }, username) {
    commit("SET_USERNAME", username);
  },

  setRole({ commit }, isAdmin) {
    commit("SET_ROLE", isAdmin);
  },

  async login({ commit }, userInfo) {
    return login(userInfo).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          const { token } = data;
          localStorage.setItem("elementTokenAdmin", "Bearer " + token);
          let hour = new Date().getHours();
          const time =
            hour < 8
              ? "早上好"
              : hour <= 11
              ? "上午好"
              : hour <= 13
              ? "中午好"
              : hour < 18
              ? "下午好"
              : "晚上好";
          notification.open({
            message: `欢迎${userInfo.username}，登录后台管理系统`,
            description: `${time}！`,
            style: {
              marginTop: "50px",
            },
          });
        } else {
          message.error(`用户登录接口异常：${msg}`);
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
