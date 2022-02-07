import http from "../http";

export const getCollectStatus = (type, objectId) =>
  http({
    url: "/actions/getCollectStatus/" + type + "&" + objectId,
    method: "GET",
  });

export const getCollectArticleAdminListByUsername = (username) =>
  http({
    url: "/actions/getCollectArticleAdminListByUsername/" + username,
    method: "GET",
  });

export const getCollectArticleUserListByUsername = (username) =>
  http({
    url: "/actions/getCollectArticleUserListByUsername/" + username,
    method: "GET",
  });

export const setCollectStatus = (data) =>
  http({
    url: "/actions/setCollectStatus",
    method: "POST",
    data,
  });
