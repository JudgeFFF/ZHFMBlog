import http from "../http";

export const addTagUser = (data) =>
  http({
    url: "/tags-user/addTagUser",
    method: "POST",
    data,
  });

export const deleteTagUser = (id) =>
  http({
    url: "/tags-user/deleteTagUser/" + id,
    method: "DELETE",
  });

export const deleteTagUserAll = (ids) =>
  http({
    url: "/tags-user/deleteTagUserAll/" + ids,
    method: "DELETE",
  });

export const updateTagUser = (id, data) =>
  http({
    url: "/tags-user/updateTagUser/" + id,
    method: "PUT",
    data,
  });

export const getTagUserById = (id) =>
  http({
    url: "/tags-user/getTagUserById/" + id,
    method: "GET",
  });

export const getTagUserCount = () =>
  http({
    url: "/tags-user/getTagUserCount",
    method: "GET",
  });

export const getTagUserList = () =>
  http({
    url: "/tags-user/getTagUserList",
    method: "GET",
  });

export const getTagUserListByUsername = (username) =>
  http({
    url: "/tags-user/getTagUserListByUsername/" + username,
    method: "GET",
  });

export const getTagUserTNameListByUsername = (username, tName) =>
  http({
    url:
      "/tags-user/getTagUserTNameListTitleListByUsername/" +
      username +
      "&" +
      tName,
    method: "GET",
  });

export const getTagUserColorListByUsername = (username, color) =>
  http({
    url:
      "/tags-user/getTagUserColorListRegionListByUsername/" +
      username +
      "&" +
      color,
    method: "GET",
  });

export const getTagUserListByTName = (tName) =>
  http({
    url: "/tags-user/getTagUserListByTName/" + tName,
    method: "GET",
  });

export const getTagUserListByColor = (color) =>
  http({
    url: "/tags-user/getTagUserListByColor/" + color,
    method: "GET",
  });
