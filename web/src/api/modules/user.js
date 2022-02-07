import http from "../http";

export const getUserByToken = () =>
  http({
    url: "/users/getUserByToken",
    method: "GET",
  });
