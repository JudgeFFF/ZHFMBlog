import http from "../http";

export const deleteUser = (id) =>
  http({
    url: "/users/deleteUser/" + id,
    method: "DELETE",
  });

export const deleteUserAll = (ids) =>
  http({
    url: "/users/deleteUserAll/" + ids,
    method: "DELETE",
  });

export const updateUser = (id, data) =>
  http({
    url: "/users/updateUser/" + id,
    method: "PUT",
    data,
  });

export const getUserByToken = () =>
  http({
    url: "/users/getUserByToken",
    method: "GET",
  });

export const getUserById = (id) =>
  http({
    url: "/users/getUserById/" + id,
    method: "GET",
  });

export const getUserCount = () =>
  http({
    url: "/users/getUserCount",
    method: "GET",
  });

export const getUserList = () =>
  http({
    url: "/users/getUserList",
    method: "GET",
  });

export const getUserListByUsername = (username) =>
  http({
    url: "/users/getUserListByUsername/" + username,
    method: "GET",
  });

export const getUserListByIsAdmin = (isAdmin) =>
  http({
    url: "/users/getUserListByIsAdmin/" + isAdmin,
    method: "GET",
  });
