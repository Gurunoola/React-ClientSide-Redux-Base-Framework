import { put, call, takeLatest, all } from 'redux-saga/effects';
import { events as EVENT } from '../ConstantManager';
import { doServerRequest, constructEvents } from '../../services/axiosServices';
import { componentNameCaps } from './componentName';


const url = `/Attendance`;

const {
  LIST_GET_REQUESTED,
  GET_REQUESTED,
  DELETE_REQUESTED,
  POST_REQUESTED,
  UPDATE_REQUESTED,
} = EVENT[componentNameCaps];

const doGetAll = options => {
  const params = `?pageSize=${options.options.pageLimit || 10}&pageNumber=${options
    .options.page || 1}&populate=addresses,parents`;
  return doServerRequest({ url: `${url}${params}`, method: 'get' });
};
function* getAll(params) {
  const { response, error } = yield call(doGetAll, params);
  const { event, message } = constructEvents(response, error, 'list', componentNameCaps);
  yield put({ type: event, result: response && response.result || undefined, message });
};

const doGetOne = options => {
  const params = `/${options.id}`;
  return doServerRequest({ url: `${url}${params}`, method: 'get' });
};
function* getOne(params) {
  const { response, error } = yield call(doGetOne, params);
  const { event, message } = constructEvents(response, error, 'get', componentNameCaps);
  yield put({ type: event, result: response && response.result || undefined, message });
};

const doUpdateOne = data => {
  return doServerRequest({ data: data.data, url: `${url}`, method: 'put' });
};
function* updateOne(params) {
  const { response, error } = yield call(doUpdateOne, params);
  const { event, message } = constructEvents(response, error, 'update', componentNameCaps);
  yield put({ type: event, result: response && response.result || undefined, message });
};

const doAddOne = data => {
  return doServerRequest({ data: data.data, url: `${url}`, method: 'post' });
};
function* addOne(params) {
  const { response, error } = yield call(doAddOne, params);
  const { event, message } = constructEvents(response, error, 'post', componentNameCaps);
  yield put({ type: event, result: response && response.result || undefined, message });
};

const doRemoveOne = options => {
  const params = `/${options.id}`;
  return doServerRequest({ url: `${url}${params}`, method: 'delete' });
};
function* removeOne(params) {
  const { response, error } = yield call(doRemoveOne, params);
  const { event, message } = constructEvents(response, error, 'delete', componentNameCaps);
  yield put({ type: event, result: response && response.result || undefined, message });
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
