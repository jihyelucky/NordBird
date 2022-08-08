import { all, fork, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

function addCommentAPI(data) {
  return axios.post("/api/post", data);
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      type: "ADD_COMMENT_SUCCESS",
      data: {
        postId: action.data.postId,
      },
    });
  } catch (err) {
    yield put({
      type: "ADD_COMMENT_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchAddComment() {
  yield takeLatest("ADD_COMMENT_REQUEST", addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost), //call
    fork(watchAddComment),
  ]);
}
