import { put, call, takeLatest, all } from 'redux-saga/effects';
import { events as EVENT } from '../ConstantManager';
import { doServerRequest, constructEvents } from '../../services/axiosServices';
import { logger } from '../../services';

const url = '/auth/login';

const {
  LOGIN_GET_REQUESTED,
  LOGOUT_GET_REQUESTED,
  LOGOUT_GET_SUCCESS
} = EVENT.AUTH

const doLogin = data => {
  const dataD = JSON.stringify({
    email: data.data.email,
    password: data.data.password,
  });
  return doServerRequest({ url, method: 'post', data: dataD });
};

function* userlogin(data) {
  const { response, error } = yield call(doLogin, data);
  const { event, message } = constructEvents(response, error, 'get', 'AUTH');
  // yield put({ type: event, result: response && response.data || undefined, message });


  // const { response, error } = yield call(doGetOne, params);
  // const { event, message } = constructEvents(response, error, 'get', componentNameCaps);
  const resData = _.get(response, 'data', []);
  //const rest = _.omit(response, 'result.results');
  yield put({ type: event, result: {...resData } || undefined, message });
}

function* userlogout() {
  localStorage.removeItem('user');
  yield put({ type: LOGOUT_GET_SUCCESS });
  logger('User logged out', 'info');
}

export default function* loginSagas() {
  yield all([
    takeLatest(LOGIN_GET_REQUESTED, userlogin),
  ]);
}
