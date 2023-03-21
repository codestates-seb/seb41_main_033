import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/slice/loginstate";

const useAuthenticatedRequest = () => {
  const dispatch = useDispatch();

  const { accessToken, memberId, refreshToken, isLogin, expire } = useSelector(
    (state) => state.islogin.login
  );

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    async (config) => {
      if (accessToken && !config.headers["Authorization"]) {
        if (config.data instanceof FormData) {
          config.headers["Content-Type"] = "multipart/form-data";
        } else {
          config.headers["Content-Type"] = "application/json";
        }
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        dispatch(
          login({
            accessToken,
            memberId,
            isLogin: true,
            expire,
            refreshToken,
          })
        );
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    function (response) {
      return response;
    },

    async function (error) {
      if (isLogin && Date.now() >= expire) {
        try {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            refreshtoken: `Bearer ${refreshToken}`,
          };

          const data = await axios({
            url: `${process.env.REACT_APP_API_URL}/api/members/${memberId}`,
            method: "GET",
            headers,
          });
          const { refreshtoken: newRefreshToken, authorization } = data.headers; // refreshToken 변수 이름 변경

          dispatch(
            login({
              accessToken: authorization,
              memberId,
              isLogin: true,
              expire: Date.now() + 1000 * 60 * 60,
              refreshToken: newRefreshToken,
            })
          );
          const newConfig = { ...error.config };
          newConfig.headers.Authorization = `Bearer ${authorization}`;
          newConfig.headers.refreshtoken = `Bearer ${newRefreshToken}`;
          return axios(newConfig);
        } catch (error) {
          dispatch(
            logout({
              accessToken: null,
              memberId: null,
              isLogin: false,
              refreshToken: refreshToken,
            })
          );
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`,
          };
          await axios({
            url: `${process.env.REACT_APP_API_URL}/api/members/logout`,
            method: "POST",
            headers,
          });
          localStorage.clear();
          window.location.reload();
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAuthenticatedRequest;
