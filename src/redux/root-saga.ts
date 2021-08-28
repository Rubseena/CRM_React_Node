import { call, all } from "redux-saga/effects";

import { userSagas } from "./user/user-sagas";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga() {
  yield all([call(userSagas)]);
}
