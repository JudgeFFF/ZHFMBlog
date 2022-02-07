<template>
  <a-statistic
    v-show="isAdmin == 1"
    title="地区总量"
    :value="region"
    style="text-align: center"
  />
  &nbsp;&nbsp;&nbsp;
  <a-statistic
    v-show="isAdmin == 1"
    title="留言总量"
    :value="message"
    style="text-align: center"
  />
  &nbsp;&nbsp;&nbsp;
  <a-statistic
    v-show="isAdmin == 1"
    title="管理员文章总量"
    :value="articleAdmin"
    style="text-align: center"
  />
  &nbsp;&nbsp;&nbsp;
  <a-statistic
    v-show="isAdmin == 1"
    title="管理员标签总量"
    :value="tagAdmin"
    style="text-align: center"
  />
  &nbsp;&nbsp;&nbsp;
  <a-statistic
    v-show="isAdmin == 1"
    title="管理员评论总量"
    :value="commentAdmin"
    style="text-align: center"
  />
  &nbsp;&nbsp;&nbsp;
  <a-statistic
    v-show="isAdmin == 1"
    title="用户文章总量"
    :value="articleUser"
    style="text-align: center"
  />
  &nbsp;&nbsp;&nbsp;
  <a-statistic
    v-show="isAdmin == 1"
    title="用户标签总量"
    :value="tagUser"
    style="text-align: center"
  />
  &nbsp;&nbsp;&nbsp;
  <a-statistic
    v-show="isAdmin == 1"
    title="用户评论总量"
    :value="commentUser"
    style="text-align: center"
  />

  <a-statistic
    v-show="isAdmin == 0"
    title="用户文章总量"
    :value="isArticleUser"
    style="text-align: center"
  />
  <span v-show="isAdmin == 0"> &nbsp;&nbsp;&nbsp;</span>
  <a-statistic
    v-show="isAdmin == 0"
    title="用户标签总量"
    :value="isTagUser"
    style="text-align: center"
  />
  &nbsp;&nbsp;&nbsp;
  <a-statistic
    v-show="isAdmin == 0"
    title="用户评论总量"
    :value="isCommentUser"
    style="text-align: center"
  />
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const state = reactive({
      username: "",
      isAdmin: "",
      region: 0,
      message: 0,
      articleAdmin: 0,
      tagAdmin: 0,
      commentAdmin: 0,
      articleUser: 0,
      tagUser: 0,
      commentUser: 0,
      isArticleUser: 0,
      isTagUser: 0,
      isCommentUser: 0,
    });

    state.username = localStorage.username;

    if (localStorage.isAdmin > 0) {
      state.isAdmin = "1";
    } else {
      state.isAdmin = "0";
    }

    store.dispatch("region/getRegionCount").then((res) => {
      state.region = res;
    });

    store.dispatch("message/getMessageCount").then((res) => {
      state.message = res;
    });

    store.dispatch("articleAdmin/getArticleAdminCount").then((res) => {
      state.articleAdmin = res;
    });

    store.dispatch("tagAdmin/getTagAdminCount").then((res) => {
      state.tagAdmin = res;
    });

    store.dispatch("comment/getCommentCountByArticleAdmin").then((res) => {
      state.commentAdmin = res;
    });

    store.dispatch("articleUser/getArticleUserCount").then((res) => {
      state.articleUser = res;
    });

    store.dispatch("tagUser/getTagUserCount").then((res) => {
      state.tagUser = res;
    });

    store.dispatch("comment/getCommentCountByArticleUser").then((res) => {
      state.commentUser = res;
    });

    if (state.isAdmin < 1) {
      store
        .dispatch("articleUser/getArticleUserListByUsername", state.username)
        .then((res) => {
          res = res.filter((item) => {
            return item.user;
          });
          state.isArticleUser = res.length;
        });

      store
        .dispatch("tagUser/getTagUserListByUsername", state.username)
        .then((res) => {
          res = res.filter((item) => {
            return item.user;
          });
          state.isTagUser = res.length;
        });

      store
        .dispatch("comment/getCommentArticleUserListByUsername", state.username)
        .then((res) => {
          res = res.filter((item) => {
            return item.objectId.user;
          });
          state.isCommentUser = res.length;
        });
    }

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style></style>
