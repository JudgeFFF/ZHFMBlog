import http from "../http";

export const addTagAdmin = (data) =>
  http({
    url: "/tags-admin/addTagAdmin",
    method: "POST",
    data,
  });

export const deleteTagAdmin = (id) =>
  http({
    url: "/tags-admin/deleteTagAdmin/" + id,
    method: "DELETE",
  });

export const deleteTagAdminAll = (ids) =>
  http({
    url: "/tags-admin/deleteTagAdminAll/" + ids,
    method: "DELETE",
  });

export const updateTagAdmin = (id, data) =>
  http({
    url: "/tags-admin/updateTagAdmin/" + id,
    method: "PUT",
    data,
  });

export const getTagAdminById = (id) =>
  http({
    url: "/tags-admin/getTagAdminById/" + id,
    method: "GET",
  });

export const getTagAdminCount = () =>
  http({
    url: "/tags-admin/getTagAdminCount",
    method: "GET",
  });

export const getTagAdminList = () =>
  http({
    url: "/tags-admin/getTagAdminList",
    method: "GET",
  });

export const getTagAdminListByTName = (tName) =>
  http({
    url: "/tags-admin/getTagAdminListByTName/" + tName,
    method: "GET",
  });

export const getTagAdminListByColor = (color) =>
  http({
    url: "/tags-admin/getTagAdminListByColor/" + color,
    method: "GET",
  });
