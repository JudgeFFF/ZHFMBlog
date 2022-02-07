import http from "../http";

export const getTagUserList = () =>
  http({
    url: "/tags-user/getTagUserList",
    method: "GET",
  });
