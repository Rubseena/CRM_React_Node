import { call, put, takeLatest, all } from "redux-saga/effects";
import { UserActionTypes } from "./user.types";

import {
  signInFailure,
  signInStart,
  setUserData,
  setUserLoggedInStatus,
  signOutSuccess,
  setUserInfo,
} from "./user.actions";
// import { loginService } from "../../services/user-services/loginServices";
import { ROUTES } from "../../constants/routes";

import { message } from "antd";
import { historyPush } from "../../browserHistory";
// import { userInfoService } from "../../services/user-services/userServices";

function* startUserSignIn({ payload }: ReturnType<typeof signInStart>) {
  // try {
  //   // login api here.
  //   const loginResponse = yield loginService(payload);
  //   if (loginResponse.status == 200) {
  //     yield put(setUserData(loginResponse.data));
  //     yield put(setUserLoggedInStatus(true));

  //     //#region  getting user info
  //     try {
  //       const userInfoResponse = yield userInfoService();
  //       if (userInfoResponse.status === 200) {
  //         yield put(
  //           setUserInfo({
  //             ...userInfoResponse.data,
  //             type: loginResponse.data.type,
  //           })
  //         );
  //       } else {
  //         message.error("Could not get user information data.");
  //       }
  //     } catch (error) {
  //       if (!error.response) {
  //         message.error('NETWORK ERROR');
  //       } else {
  //         const code = error.response.status;
  //         const response = error.response.data;
  //         if (code === 400) {
  //           if (response.error) {
  //             message.error("Could not get user information data.");
  //           }
  //         }
  //       }
  //     }

  //     //#endregion
  //     if ('error' in loginResponse.data && loginResponse.data.error === "Password Reset Required") {
  //       yield call(historyPush, ROUTES.HOME + ROUTES.NEW_PASSWORD);
  //     } else {
  //       yield call(historyPush, ROUTES.HOME);
  //     }

  //   } else {
  //     message.error("Error: Login Failed.");
  //   }
  // } catch (error) {
  //   if (!error.response) {
  //     message.error('NETWORK ERROR');
  //   } else {
  //     const code = error.response.status;
  //     const response = error.response.data;
  //     if (code === 401) {
  //       message.error("Error: Entered Username or passsword is wrong");
  //     } else if (code === 403) {
  //       message.error("Error: Account not active");
  //     } else {
  //       if (response.message) {
  //         message.error("Error: " + response.message)
  //       }
  //     }
  //   }
  //   yield put(signInFailure(error));
  // }
}

function* startUserSignOut() {
  try {
    //TODO: logout api (if any)
    yield put(signOutSuccess());
  } catch (error) {
    message.error("could not logout.");
  }
}

function* onSignInStartSaga() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, startUserSignIn);
}

function* onSignOutStartSaga() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, startUserSignOut);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* userSagas(): any {
  yield all([call(onSignInStartSaga), call(onSignOutStartSaga)]);
}
