import { put, call, takeLatest, all, delay } from 'redux-saga/effects';
import { events as EVENT } from '../ConstantManager';
import { doServerRequest } from '../../services/axiosServices';
import { componentNameCaps } from './componentName';

const url = `/Attendance`;

const {
  LIST_GET_REQUESTED,
  LIST_GET_SUCCESS,
  LIST_GET_FAILED,
  GET_REQUESTED,
  GET_SUCCESS,
  GET_FAILED,
  POST_SUCCESS,
  POST_FAILED,
  DELETE_REQUESTED,
  DELETE_SUCCESS,
  DELETE_FAILED,
  POST_REQUESTED,
  UPDATE_REQUESTED,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
} = EVENT[componentNameCaps];

const { NETWORK_ERROR } = EVENT

const doGetAll = options => {
  const params = `?FilterOccupancy=${options.options.pageLimit || 10}&pageNumber=${options
    .options.page || 1}&populate=addresses,parents`;
  return doServerRequest({ url: `${url}${params}`, method: 'get' });
};
function* getAll(params) {
  const { response, error } = yield call(doGetAll, params);
  if (response && response.result) {
    yield put({ type: LIST_GET_SUCCESS, ...response });
  } else {
    if (response.status === 401) yield put({ type: EVENT.UNAUTORIZED });
    else if (response.status === 404) yield put({ type: LIST_GET_FAILED, message: response.message });
    else yield put({ type: NETWORK_ERROR, message: response.message });
  }
};

const doGetOne = options => {
  const params = `/${options.id}`;
  return doServerRequest({ url: `${url}${params}`, method: 'get' });
};
function* getOne(params) {
  const { response, error } = yield call(doGetOne, params);
  if (response) {
    yield put({ type: GET_SUCCESS, onResult: response });
  } else {
    // LOGGER_HERE
    if (response.status === 401) yield put({ type: EVENT.UNAUTORIZED });
    else if (response.status === 404) yield put({ type: GET_FAILED, message: response.message });
    else yield put({ type: NETWORK_ERROR, message: response.message });

  }
};

const doUpdateOne = data => {
  //const params = `/${options.id}`;
  return doServerRequest({ data: data.data, url: `${url}`, method: 'put' });
};
function* updateOne(params) {
  const { response, error } = yield call(doUpdateOne, params);
  if (response && response.isSuccess && response.statusCode === 204) {
    yield put({ type: UPDATE_SUCCESS, onResult: response });
  } else {
    // LOGGER_HERE
    if (response.statusCode === 401) yield put({ type: EVENT.UNAUTORIZED });
    else if (response.statusCode === 404) yield put({ type: UPDATE_FAILED, message: response.message });
    else yield put({ type: NETWORK_ERROR, message: response.message });

  }
};

const doAddOne = data => {
  //const params = `/${options.id}`;
  return doServerRequest({ data: data.data, url: `${url}`, method: 'post' });
};
function* addOne(params) {
  try {
    const { response, error } = yield call(doAddOne, params);
    if (response && response.isSuccess && response.statusCode === 201) {
      yield put({ type: POST_SUCCESS, onResult: response });
    } else {
      // LOGGER_HERE
      if (response.statusCode === 401) yield put({ type: EVENT.UNAUTORIZED });
      else if (response.statusCode === 404) yield put({ type: POST_FAILED, message: response.message });
      else if (response.statusCode === 300) yield put({ type: POST_FAILED, message: response.message });
      else yield put({ type: NETWORK_ERROR, message: response.message });

    }
  } catch (e) {
    console.log(e)
  }
};

const doRemoveOne = options => {
  const params = `/${options.id}`;
  return doServerRequest({ url: `${url}${params}`, method: 'delete' });
};
function* removeOne(params) {
  const { response, error } = yield call(doRemoveOne, params);
  if (response && response.isSuccess && response.statusCode === 200) {
    yield put({ type: DELETE_SUCCESS, ...response });
  } else {
    // LOGGER_HERE
    if (response.statusCode === 401) yield put({ type: EVENT.UNAUTORIZED });
    else if (response.statusCode === 404) yield put({ type: DELETE_FAILED, message: response.message });
    else yield put({ type: DELETE_FAILED, message: response.message });

  }
};

function* updateAll(params) { }
function* addMany(params) { }
function* removeMany(params) { }

export default function* attendancesSaga() {
  yield all([
    takeLatest(LIST_GET_REQUESTED, getAll),
    takeLatest(GET_REQUESTED, getOne),
    takeLatest(UPDATE_REQUESTED, updateOne),
    takeLatest(POST_REQUESTED, addOne),
    takeLatest(DELETE_REQUESTED, removeOne),
  ]);
}
