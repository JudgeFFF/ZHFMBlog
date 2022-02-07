import constantRoutes from "@/router/modules/constantRouter";
import asyncRoutes from "@/router/modules/asyncRouter";

const state = {
  Croutes: [],
  CAroutes: [],
  routerActive: true,
};

const getters = {
  GET_CROUTES(state) {
    return state.Croutes;
  },
  GET_CAROUTES(state) {
    return state.CAroutes;
  },
  GET_ROUTERACTIVE(state) {
    return state.routerActive;
  },
};

const mutations = {
  SET_CROUTES(state, menuList) {
    state.Croutes = menuList;
  },
  SET_CAROUTES(state, menuList) {
    state.CAroutes = menuList;
  },
  SET_ROUTERACTIVE(state) {
    state.routerActive = !state.routerActive;
  },
};

const actions = {
  async setCRoutes({ commit }) {
    const allRoutes = [...constantRoutes];
    commit("SET_CROUTES", allRoutes);
    return [...constantRoutes];
  },
  async setCARoutes({ commit }) {
    const allRoutes = [...constantRoutes, ...asyncRoutes];
    commit("SET_CAROUTES", allRoutes);
    return [...asyncRoutes];
  },
};

export default { namespaced: true, state, getters, mutations, actions };
