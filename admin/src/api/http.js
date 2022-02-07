import axios from "axios";
import { message } from "ant-design-vue";

const http = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

http.interceptors.request.use(
  (config) => {
    if (localStorage.elementTokenAdmin) {
      config.headers.Authorization = localStorage.elementTokenAdmin;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    message.error(`服务端接口异常：${error}`);
  }
);

export default http;
