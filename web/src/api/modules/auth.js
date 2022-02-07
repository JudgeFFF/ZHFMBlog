import http from "../http";

export const register = (data) =>
  http({
    url: "/auth/register",
    method: "POST",
    data,
  });

export const login = (data) =>
  http({
    url: "/auth/login",
    method: "POST",
    data,
  });

export const changePassword = (data) =>
  http({
    url: "/auth/changePassword",
    method: "POST",
    data,
  });
