import { message } from "ant-design-vue";
import {
  addRegion,
  deleteRegion,
  deleteRegionAll,
  updateRegion,
  getRegionById,
  getRegionCount,
  getRegionList,
  getRegionListByRName,
} from "../../api/modules/region";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async addRegion({ commit }, regionInfo) {
    return addRegion(regionInfo).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`文章地区添加接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async deleteRegion({ commit }, id) {
    return deleteRegion(id).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`文章地区删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async deleteRegionAll({ commit }, ids) {
    return deleteRegionAll(ids).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`文章地区批量删除接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async updateRegion({ commit }, regionInfo) {
    const { id } = regionInfo;
    return updateRegion(id, regionInfo).then((res) => {
      if (res) {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`文章地区编辑接口异常：${msg}`);
        }
        return res;
      }
    });
  },

  async getRegionById({ commit }, id) {
    return getRegionById(id).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取地区信息接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getRegionCount({ commit }) {
    return getRegionCount().then((res) => {
      if (res) {
        const { data } = res.data;
        return data;
      }
    });
  },

  async getRegionList({ commit }) {
    return getRegionList().then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取地区列表接口异常：${msg}`);
        }
        return data;
      }
    });
  },

  async getRegionListByRName({ commit }, rName) {
    return getRegionListByRName(rName).then((res) => {
      if (res) {
        const { code, msg, data } = res.data;
        if (code === 0) {
          message.success(msg);
        } else {
          message.error(`获取地区名称接口异常：${msg}`);
        }
        return data;
      }
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
