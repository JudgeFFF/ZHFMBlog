import http from "../http";

export const addArticleUser = (data) =>
  http({
    url: "/articles-user/addArticleUser",
    method: "POST",
    data,
  });

export const deleteArticleUser = (id) =>
  http({
    url: "/articles-user/deleteArticleUser/" + id,
    method: "DELETE",
  });

export const deleteArticleUserAll = (ids) =>
  http({
    url: "/articles-user/deleteArticleUserAll/" + ids,
    method: "DELETE",
  });

export const updateArticleUser = (id, data) =>
  http({
    url: "/articles-user/updateArticleUser/" + id,
    method: "PUT",
    data,
  });

export const getArticleUserById = (id) =>
  http({
    url: "/articles-user/getArticleUserById/" + id,
    method: "GET",
  });

export const getArticleUserCount = () =>
  http({
    url: "/articles-user/getArticleUserCount",
    method: "GET",
  });

export const getArticleUserList = () =>
  http({
    url: "/articles-user/getArticleUserList",
    method: "GET",
  });

export const getArticleUserListByUsername = (username) =>
  http({
    url: "/articles-user/getArticleUserListByUsername/" + username,
    method: "GET",
  });

export const getArticleUserTitleListByUsername = (username, title) =>
  http({
    url:
      "/articles-user/getArticleUserTitleListByUsername/" +
      username +
      "&" +
      title,
    method: "GET",
  });

export const getArticleUserListByTitle = (title) =>
  http({
    url: "/articles-user/getArticleUserListByTitle/" + title,
    method: "GET",
  });
