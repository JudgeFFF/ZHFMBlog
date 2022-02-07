import http from "../http";

export const getTagAdminList = () =>
  http({
    url: "/tags-admin/getTagAdminList",
    method: "GET",
  });
