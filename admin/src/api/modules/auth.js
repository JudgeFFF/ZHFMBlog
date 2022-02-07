import http from "../http";

export const login = (data) =>
  http({
    url: "/auth/login",
    method: "POST",
    data,
  });
