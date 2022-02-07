import { message } from "ant-design-vue";
import {
  getArticleUserById,
  getArticleUserListById,
  getArticleUserListByTitle,
  getArticleUserListByUsername,
  getArticleUserList,
} from "../../api/modules/article-user";

const state = {
  title: "",
  editor: "",
  tag: "",
};

const getters = {
  GET_TITLE(state) {
    return state.title;
  },
  GET_EDITOR(state) {
    return state.editor;
  },
  GET_TAG(state) {
    return state.tag;
  },
};

const mutations = {
  SET_TITLE(state, title) {
    state.title = title;
  },
  SET_EDITOR(state, editor) {
    state.editor = editor;
  },
  SET_TAG(state, tag) {
    state.tag = tag;
  },
};

const actions = {
  async setTitle({ commit }, title) {
    commit("SET_TITLE", title);
  },

  async setEditor({ commit }, editor) {
    commit("SET_EDITOR", editor);
  },

  async setTag({ commit }, tag) {
    commit("SET_TAG", tag);
  },

  async getArticleUserById({ commit }, id) {
    return getArticleUserById(id).then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getArticleUserListById({ commit }, ids) {
    return getArticleUserListById(ids).then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getArticleUserListByTitle({ commit }, title) {
    return getArticleUserListByTitle(title).then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getArticleUserListByUsername({ commit }, username) {
    return getArticleUserListByUsername(username).then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getArticleUserList({ commit }) {
    return getArticleUserList().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
