import http from "../http";

export const addRegion = (data) =>
  http({
    url: "/regions/addRegion",
    method: "POST",
    data,
  });

export const deleteRegion = (id) =>
  http({
    url: "/regions/deleteRegion/" + id,
    method: "DELETE",
  });

export const deleteRegionAll = (ids) =>
  http({
    url: "/regions/deleteRegionAll/" + ids,
    method: "DELETE",
  });

export const updateRegion = (id, data) =>
  http({
    url: "/regions/updateRegion/" + id,
    method: "PUT",
    data,
  });

export const getRegionById = (id) =>
  http({
    url: "/regions/getRegionById/" + id,
    method: "GET",
  });

export const getRegionCount = () =>
  http({
    url: "/regions/getRegionCount",
    method: "GET",
  });

export const getRegionList = () =>
  http({
    url: "/regions/getRegionList",
    method: "GET",
  });

export const getRegionListByRName = (rName) =>
  http({
    url: "/regions/getRegionListByRName/" + rName,
    method: "GET",
  });
