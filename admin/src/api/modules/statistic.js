import http from "../http";

export const getStatisticViewListByArticleAdmin = () =>
  http({
    url: "/statistics/getStatisticViewListByArticleAdmin",
    method: "GET",
  });

export const getStatisticViewListByArticleUser = () =>
  http({
    url: "/statistics/getStatisticViewListByArticleUser",
    method: "GET",
  });

export const getStatisticAccessList = () =>
  http({
    url: "/statistics/getStatisticAccessList",
    method: "GET",
  });

export const getStatisticArticleAdminListByView = () =>
  http({
    url: "/statistics/getStatisticArticleAdminListByView",
    method: "GET",
  });

export const getStatisticArticleUserListByView = () =>
  http({
    url: "/statistics/getStatisticArticleUserListByView",
    method: "GET",
  });
