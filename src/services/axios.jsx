import axios from "axios";
import AuthService from "./auth";
import CookiesProvider from "../providers/cookies";
import { backendUrl } from "../variables/general";
const instance = axios.create();

instance
  .interceptors
  .request
  .use(
    config => {
      const token = AuthService.getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    });

instance
  .interceptors
  .response
  .use((response) => {
    return response;
  }, function (error) {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && originalRequest.url === `${backendUrl}/api/token/refresh`) {
      AuthService.removeToken();
      AuthService.removeRefreshToken();
      window.location.reload();
      return Promise.reject(error);
    }

  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = CookiesProvider.get("refreshToken");
    return axios.post(`${backendUrl}/api/token/refresh`,
      {
        "refresh_token": refreshToken
      })
      .then(res => {
        if (res.status === 200) {
          const token = res.data.accessToken;
          AuthService.setToken(token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          return axios(originalRequest);
        }
      });
  }
  return Promise.reject(error);
});
export default instance;
