import http from "../http";

export const addComment = (data) =>
  http({
    url: "/comments/addComment",
    method: "POST",
    data,
  });

export const getCommentListByArticleAdmin = (objectId) =>
  http({
    url: "/comments/getCommentListByArticleAdmin/" + objectId,
    method: "GET",
  });

export const getCommentListByArticleUser = (objectId) =>
  http({
    url: "/comments/getCommentListByArticleUser/" + objectId,
    method: "GET",
  });
