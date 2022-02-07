import http from "../http";

export const getArticleAdminById = (id) =>
  http({
    url: "/articles-admin/getArticleAdminById/" + id,
    method: "GET",
  });

export const getArticleAdminListById = (ids) =>
  http({
    url: "/articles-admin/getArticleAdminListById/" + ids,
    method: "GET",
  });

export const getArticleAdminListByTitle = (title) =>
  http({
    url: "/articles-admin/getArticleAdminListByTitle/" + title,
    method: "GET",
  });

export const getArticleAdminList = () =>
  http({
    url: "/articles-admin/getArticleAdminList",
    method: "GET",
  });
