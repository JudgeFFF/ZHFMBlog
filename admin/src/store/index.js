import { createStore } from "vuex";
import articleAdmin from "./modules/articleAdmin";
import articleUser from "./modules/articleUser";
import auth from "./modules/auth";
import comment from "./modules/comment";
import message from "./modules/message";
import region from "./modules/region";
import routes from "./modules/routes";
import statistic from "./modules/statistic";
import tagAdmin from "./modules/tagAdmin";
import tagUser from "./modules/tagUser";
import user from "./modules/user";
import getters from "./getters.js";

export default createStore({
  modules: {
    articleAdmin,
    articleUser,
    auth,
    comment,
    message,
    region,
    routes,
    statistic,
    tagAdmin,
    tagUser,
    user,
  },
  getters,
});
