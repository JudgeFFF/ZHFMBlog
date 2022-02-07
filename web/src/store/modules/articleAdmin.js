import { message } from "ant-design-vue";
import {
  getArticleAdminById,
  getArticleAdminListById,
  getArticleAdminListByTitle,
  getArticleAdminList,
} from "../../api/modules/article-admin";

const state = {
  title: "",
  tag: "",
  region: "",
};

const getters = {
  GET_TITLE(state) {
    return state.title;
  },
  GET_TAG(state) {
    return state.tag;
  },
  GET_REGION(state) {
    return state.region;
  },
};

const mutations = {
  SET_TITLE(state, title) {
    state.title = title;
  },
  SET_TAG(state, tag) {
    state.tag = tag;
  },
  SET_REGION(state, region) {
    state.region = region;
  },
};

const actions = {
  async setTitle({ commit }, title) {
    commit("SET_TITLE", title);
  },

  async setTag({ commit }, tag) {
    commit("SET_TAG", tag);
  },

  async setRegion({ commit }, region) {
    commit("SET_REGION", region);
  },

  async getArticleAdminById({ commit }, id) {
    return getArticleAdminById(id).then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getArticleAdminListById({ commit }, ids) {
    return getArticleAdminListById(ids).then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getArticleAdminListByTitle({ commit }, title) {
    return getArticleAdminListByTitle(title).then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getArticleAdminList({ commit }) {
    return getArticleAdminList().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
