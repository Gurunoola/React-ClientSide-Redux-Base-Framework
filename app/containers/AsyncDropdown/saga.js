import { put, call, takeLatest, all } from 'redux-saga/effects';
import { events as EVENT } from '../ConstantManager';
import { doServerRequest, constructEvents } from '../../services/axiosServices';

const {  
  ROLES:{
    LIST_GET_REQUESTED: rolesGetRequested
  },
  ACADEMIC_YEAR: {
    LIST_GET_REQUESTED: academicYearsGetRequested
  },
  CLASSES: {
    LIST_GET_REQUESTED: classesGetRequested
  },
  TEACHERS: {
    LIST_GET_REQUESTED: teachersGetRequested
  }

  } = EVENT;

const doGetAll = (options, url) => {
  const params = `?FilterOccupancy=${options.options.pageLimit || 10}&pageNumber=${options
    .options.page || 1}&populate=addresses,parents`;
  return doServerRequest({ url: `${url}`, method: 'get' });
};

function* getAllRoles(params) {
  const url = `/Role`;
  const { response, error } = yield call(doGetAll, params, url);
  const { event, message } = constructEvents(response, error, 'list', 'ROLES');
  yield put({ type: event, result: response && response.result || undefined, message });

}

function* getAllAcademicYears(params) {
  const url = `/AccYear`;
  const { response, error } = yield call(doGetAll, params, url);
  const { event, message } = constructEvents(response, error, 'list', 'ACADEMIC_YEAR');
  yield put({ type: event, result: response && response.result || undefined, message });
}

function* getAllClasses(params) {
  const url = `/class`;
  const { response, error } = yield call(doGetAll, params, url);
  const { event, message } = constructEvents(response, error, 'list', 'CLASSES');
  const data = _.get(response, 'data.results', []);
  const rest = _.omit(_.get(response, 'data', []), 'results');
  yield put({ type: event, result: {data: [...data], ...rest} || undefined, message });

  // const { response, error } = yield call(doGetAll, params, url);
  // const { event, message } = constructEvents(response, error, 'list', 'CLASSES');
  // yield put({ type: event, result: response && response.result || undefined, message });
}

function* getAllTeachers(params) {
  const url = `/teachers`;
  const { response, error } = yield call(doGetAll, params, url);
  const { event, message } = constructEvents(response, error, 'list', 'TEACHERS');
  const data = _.get(response, 'data.results', []);
  const rest = _.omit(_.get(response, 'data', []), 'results');
  yield put({ type: event, result: {data: [...data], ...rest} || undefined, message });
}

export default function* asyncDropdownSaga() {
  yield all([
    takeLatest(rolesGetRequested, getAllRoles),
    takeLatest(academicYearsGetRequested, getAllAcademicYears),
    takeLatest(classesGetRequested, getAllClasses),
    takeLatest(teachersGetRequested, getAllTeachers),

  ]);
}
