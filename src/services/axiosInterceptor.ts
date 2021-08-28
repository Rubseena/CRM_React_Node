import axios, { AxiosRequestConfig } from "axios";
import { store } from "../redux/store";

import { signOutStart } from "../redux/user/user.actions";
import { message } from "antd";

axios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => {
    return Promise.reject(error);
  }
);
const requestHandler = async (request: AxiosRequestConfig) => {
  if (isHandlerEnabled(request)) {
    const userdata = store.getState().user;
    if (userdata.isLogged === true && 'expireTime' in userdata.userData) {
      if ((Date.now() / 1000) < userdata.userData.expireTime) {
        const jwttoken = userdata.userData.jwt;
        // Modify request here
        request.headers["Authorization"] = `Bearer ${jwttoken}`;
        request.headers["Content-Type"] = "application/json";
      }
      else {
        message.info("Session Expired!");
        store.dispatch(signOutStart());
      }
    }
  }
  return request;
};
const isHandlerEnabled = (config: any) => {
  // eslint-disable-next-line no-prototype-builtins
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};
// const axiosI = {};
// export default axiosI;
