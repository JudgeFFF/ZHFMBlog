import http from "../http";

export const deleteComment = (id) =>
  http({
    url: "/comments/deleteComment/" + id,
    method: "DELETE",
  });

export const deleteCommentAll = (ids) =>
  http({
    url: "/comments/deleteCommentAll/" + ids,
    method: "DELETE",
  });

export const getCommentById = (id) =>
  http({
    url: "/comments/getCommentById/" + id,
    method: "GET",
  });

export const getCommentCountByArticleAdmin = () =>
  http({
    url: "/comments/getCommentCountByArticleAdmin",
    method: "GET",
  });

export const getCommentCountByArticleUser = (userame) =>
  http({
    url: "/comments/getCommentCountByArticleUser",
    method: "GET",
  });

export const getCommentListByArticleAdmin = () =>
  http({
    url: "/comments/getCommentListByArticleAdmin/",
    method: "GET",
  });

export const getCommentListByArticleUser = () =>
  http({
    url: "/comments/getCommentListByArticleUser/",
    method: "GET",
  });

export const getCommentArticleUserListByUsername = (username) =>
  http({
    url: "/comments/getCommentArticleUserListByUsername/" + username,
    method: "GET",
  });

export const getCommentListByUsername = (username) =>
  http({
    url: "/comments/getCommentListByUsername/" + username,
    method: "GET",
  });

export const getCommentArticleAdminListByCTitle = (cTitle) =>
  http({
    url: "/comments/getCommentArticleAdminListByCTitle/" + cTitle,
    method: "GET",
  });

export const getCommentArticleUserListByCTitle = (cTitle) =>
  http({
    url: "/comments/getCommentArticleUserListByCTitle/" + cTitle,
    method: "GET",
  });
