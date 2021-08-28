import { Reducer, Action } from "redux";

import { UserActionTypes } from "./user.types";

import { User } from "../../models";

const INITIAL_STATE: User = {
  isLogged: false,
  userData: {
    jwt: "",
    username: "",
    expireTime: 0,
  },
  userInfo: null,
  error: "",
};

const userReducer: Reducer<User, Action> = (
  state = INITIAL_STATE,
  action: any
) => {
  switch (action.type) {
    case UserActionTypes.SET_LOGGED_IN_STATUS:
      return {
        ...state,
        isLogged: action.payload,
      };

    case UserActionTypes.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
        isLogged: true,
        error: "",
      };

    case UserActionTypes.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };

    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        userData: INITIAL_STATE.userData,
        isLogged: false,
        userInfo: INITIAL_STATE.userInfo,
      };

    default:
      return state;
  }
};

export default userReducer;
