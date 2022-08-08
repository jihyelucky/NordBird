import { all, fork, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";

function logInAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    console.log("saga logIn");
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: action.data,
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: "LOG_OUT_SUCCESS",
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post("/api/login", data);
}

function* signUp(action) {
  try {
    console.log("signUp");
    // throw new Error("에러에러에러에러");
    // const result = yield call(signUpAPI, action.data);
    yield delay(1000);
    yield put({
      type: "SIGN_UP_SUCCESS",
      data: action.data,
      //   data: result.data,
    });
  } catch (e) {
    yield put({
      type: "SIGN_UP_FAILURE",
      data: err.response.data,
      error: e,
    });
  }
}

function* watchLogin() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

function* watchSignUp() {
  yield takeLatest("SIGN_UP_REQUEST", signUp);
}
export default function* userSaga() {
  yield all([
    fork(watchLogin), //call
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
