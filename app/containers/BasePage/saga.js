import { put, call, takeLatest, all } from 'redux-saga/effects';
import { events as EVENT } from '../ConstantManager';
import { doServerRequest } from '../../services/axiosServices';
import { componentName, componentNameCaps } from './componentName';

const url = `/${componentName}`;

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
  const params = `?limit=${options.options.pageLimit || 10}&page=${options
    .options.page || 1}&populate=addresses,parents`;
  return doServerRequest({ url: `${url}${params}`, method: 'get' });
};

const doGetOne = options => {
  const params = `/${options.id}`;
  return doServerRequest({ url: `${url}${params}`, method: 'get' });
};



function* getAll(params) {
  const { response, error } = yield call(doGetAll, params);
  if (response && response.results) {
    yield put({ type: LIST_GET_SUCCESS, ...response });
  } else {
    // LOGGER_HERE
    if (response.status === 401) yield put({ type: EVENT.UNAUTORIZED });
    else if (response.status === 404) yield put({ type: LIST_GET_FAILED, message: response.statusText });
    else yield put({ type: NETWORK_ERROR, message: response.statusText });

  }
}
function* getOne(params) {
  const { response, error } = yield call(doGetOne, params);
  if (response) {
    yield put({ type: GET_SUCCESS, onResult: response });
  } else {
    // LOGGER_HERE
    if (response.status === 401) yield put({ type: EVENT.UNAUTORIZED });
    else if (response.status === 404) yield put({ type: GET_FAILED, message: response.statusText });
    else yield put({ type: NETWORK_ERROR, message: response.statusText });

  }
}



const doUpdateOne = options => {
  const params = `/${options.id}`;
  return doServerRequest({ url: `${url}${params}`, method: 'get' });
};
function* updateOne(params) {
  const { response, error } = yield call(doUpdateOne, params);
  if (response) {
    yield put({ type: GET_SUCCESS, onResult: response });
  } else {
    // LOGGER_HERE
    if (response.status === 401) yield put({ type: EVENT.UNAUTORIZED });
    else if (response.status === 404) yield put({ type: GET_FAILED, message: response.statusText });
    else yield put({ type: NETWORK_ERROR, message: response.statusText });

  }
}

function* updateAll(params) { }
function* addMany(params) { }
function* addOne(params) { }
function* removeMany(params) { }
function* removeOne(params) { }

export default function* baseSaga() {
  yield all([
    takeLatest(LIST_GET_REQUESTED, getAll),
    takeLatest(GET_REQUESTED, getOne),
    takeLatest(UPDATE_REQUESTED, updateOne),
    takeLatest(POST_REQUESTED, addOne),
    takeLatest(DELETE_REQUESTED, removeOne),
  ]);
}
