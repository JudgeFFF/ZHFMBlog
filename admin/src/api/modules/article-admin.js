import http from "../http";

export const addArticleAdmin = (data) =>
  http({
    url: "/articles-admin/addArticleAdmin",
    method: "POST",
    data,
  });

export const deleteArticleAdmin = (id) =>
  http({
    url: "/articles-admin/deleteArticleAdmin/" + id,
    method: "DELETE",
  });

export const deleteArticleAdminAll = (ids) =>
  http({
    url: "/articles-admin/deleteArticleAdminAll/" + ids,
    method: "DELETE",
  });

export const updateArticleAdmin = (id, data) =>
  http({
    url: "/articles-admin/updateArticleAdmin/" + id,
    method: "PUT",
    data,
  });

export const getArticleAdminById = (id) =>
  http({
    url: "/articles-admin/getArticleAdminById/" + id,
    method: "GET",
  });

export const getArticleAdminCount = () =>
  http({
    url: "/articles-admin/getArticleAdminCount",
    method: "GET",
  });

export const getArticleAdminList = () =>
  http({
    url: "/articles-admin/getArticleAdminList",
    method: "GET",
  });

export const getArticleAdminListByTitle = (title) =>
  http({
    url: "/articles-admin/getArticleAdminListByTitle/" + title,
    method: "GET",
  });

export const getArticleAdminListByRegion = (region) =>
  http({
    url: "/articles-admin/getArticleAdminListByRegion/" + region,
    method: "GET",
  });
