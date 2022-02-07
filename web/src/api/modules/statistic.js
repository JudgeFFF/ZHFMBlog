import http from "../http";

export const setRateStatistic = (data) =>
  http({
    url: "/statistics/setRateStatistic",
    method: "POST",
    data,
  });

export const setCollectStatistic = (data) =>
  http({
    url: "/statistics/setCollectStatistic",
    method: "POST",
    data,
  });

export const setViewStatistic = (data) =>
  http({
    url: "/statistics/setViewStatistic",
    method: "POST",
    data,
  });

export const setCommentStatistic = (data) =>
  http({
    url: "/statistics/setCommentStatistic",
    method: "POST",
    data,
  });

export const setAccessStatistic = (data) =>
  http({
    url: "/statistics/setAccessStatistic",
    method: "GET",
    data,
  });

export const getStatisticListByRate = (type) =>
  http({
    url: "/statistics/getStatisticListByRate/" + type,
    method: "GET",
  });

export const getStatisticListByView = (type) =>
  http({
    url: "/statistics/getStatisticListByView/" + type,
    method: "GET",
  });
