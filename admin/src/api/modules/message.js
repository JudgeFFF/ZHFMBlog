import http from "../http";

export const deleteMessage = (id) =>
  http({
    url: "/messages/deleteMessage/" + id,
    method: "DELETE",
  });

export const deleteMessageAll = (ids) =>
  http({
    url: "/messages/deleteMessageAll/" + ids,
    method: "DELETE",
  });

export const getMessageById = (id) =>
  http({
    url: "/messages/getMessageById/" + id,
    method: "GET",
  });

export const getMessageCount = () =>
  http({
    url: "/messages/getMessageCount",
    method: "GET",
  });

export const getMessageList = () =>
  http({
    url: "/messages/getMessageList",
    method: "GET",
  });

export const getMessageListByUsername = (username) =>
  http({
    url: "/messages/getMessageListByUsername/" + username,
    method: "GET",
  });
