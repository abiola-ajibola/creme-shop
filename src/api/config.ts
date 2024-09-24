import axiosApi from "axios";
import { errorNotification } from "@/utils/notifications";

const axios = axiosApi.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  withCredentials: true,
});

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      typeof localStorage !== "undefined" ? localStorage.getItem("token") : "";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log({ e: error });
    errorNotification(error.message);
    return Promise.reject(error);
  },
);

export { axios };
