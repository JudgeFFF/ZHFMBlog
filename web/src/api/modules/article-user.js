import http from "../http";

export const getArticleUserById = (id) =>
  http({
    url: "/articles-user/getArticleUserById/" + id,
    method: "GET",
  });

export const getArticleUserListById = (ids) =>
  http({
    url: "/articles-user/getArticleUserListById/" + ids,
    method: "GET",
  });

export const getArticleUserListByTitle = (title) =>
  http({
    url: "/articles-user/getArticleUserListByTitle/" + title,
    method: "GET",
  });

export const getArticleUserListByUsername = (username) =>
  http({
    url: "/articles-user/getArticleUserListByUsername/" + username,
    method: "GET",
  });

export const getArticleUserList = () =>
  http({
    url: "/articles-user/getArticleUserList",
    method: "GET",
  });
