import { UserActionTypes } from "./user.types";
import { UserSignInInformation } from "../../models";

export const setUserLoggedInStatus = (status: boolean): any => {
  return {
    type: UserActionTypes.SET_LOGGED_IN_STATUS,
    payload: status,
  };
};

export const setUserData = (userData: any): any => {
  return {
    type: UserActionTypes.SET_USER_DATA,
    payload: userData,
  };
};
export const setUserInfo = (userInfo: any): any => {
  return {
    type: UserActionTypes.SET_USER_INFO,
    payload: userInfo,
  };
};

export const signInStart = (
  userSignInformation: UserSignInInformation
): any => {
  return {
    type: UserActionTypes.SIGN_IN_START,
    payload: userSignInformation,
  };
};

export const signOutStart = (): any => {
  return {
    type: UserActionTypes.SIGN_OUT_START,
  };
};

export const signInFailure = (error: string): any => {
  return {
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error,
  };
};

export const signOutSuccess = (): any => {
  return {
    type: UserActionTypes.SIGN_OUT_SUCCESS,
  };
};
