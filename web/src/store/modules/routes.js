import constantRoutes from "@/router/modules/constantRouter";

const state = {
  Croutes: [],
  routerActive: true,
  searchState: false,
  editorState: false,
  tagState: false,
  regionState: false,
};

const getters = {
  GET_CROUTES(state) {
    return state.Croutes;
  },
  GET_ROUTERACTIVE(state) {
    return state.routerActive;
  },
  GET_SEARCHSTATE(state) {
    return state.searchState;
  },
  GET_EDITORSTATE(state) {
    return state.editorState;
  },
  GET_TAGSTATE(state) {
    return state.tagState;
  },
  GET_REGIONSTATE(state) {
    return state.regionState;
  },
};

const mutations = {
  SET_CROUTES(state, menuList) {
    state.Croutes = menuList;
  },
  SET_ROUTERACTIVE(state) {
    state.routerActive = !state.routerActive;
  },
  SET_SEARCHSTATE(state) {
    state.searchState = !state.searchState;
  },
  SET_EDITORSTATE(state) {
    state.editorState = !state.editorState;
  },
  SET_TAGSTATE(state) {
    state.tagState = !state.tagState;
  },
  SET_REGIONSTATE(state) {
    state.regionState = !state.regionState;
  },
};

const actions = {
  async setCRoutes({ commit }) {
    const allRoutes = [...constantRoutes];
    commit("SET_CROUTES", allRoutes);
    return [...constantRoutes];
  },
};

export default { namespaced: true, state, getters, mutations, actions };
