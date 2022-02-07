import http from "../http";

export const getRegionList = () =>
  http({
    url: "/regions/getRegionList",
    method: "GET",
  });
