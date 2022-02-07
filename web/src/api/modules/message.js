import http from "../http";

export const addMessage = (data) =>
  http({
    url: "/messages/addMessage",
    method: "POST",
    data,
  });

export const getMessageList = () =>
  http({
    url: "/messages/getMessageList",
    method: "GET",
  });
