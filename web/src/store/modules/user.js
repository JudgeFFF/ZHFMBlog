import { message } from "ant-design-vue";
import { getUserByToken } from "../../api/modules/user";

const state = {
  id: "",
  isAdmin: "",
};

const getters = {
  GET_ID: (state) => state.id,
  GET_USERNAME: (state) => state.username,
};

const mutations = {
  SET_ID(state, id) {
    state.id = id;
  },
  SET_USERNAME(state, username) {
    state.username = username;
  },
};

const actions = {
  setId({ commit }, id) {
    commit("SET_ID", id);
  },

  setUserName({ commit }, username) {
    commit("SET_USERNAME", username);
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
    } else {
      message.warning(msg);
    }
  },
};

export default { namespaced: true, state, getters, mutations, actions };
