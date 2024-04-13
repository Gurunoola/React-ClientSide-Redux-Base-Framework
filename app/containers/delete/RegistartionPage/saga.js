import { put, call, takeLatest, all } from 'redux-saga/effects';
import { events as EVENT } from '../ConstantManager';
import { doServerRequest } from '../../services/axiosServices';
import { logger } from '../../services';

const url = '/registration';

const {
  REGISTRATION_POST_REQUESTED,
  REGISTRATION_POST_SUCCESS,
  REGISTRATION_POST_FAILED
} = EVENT.REGISTRATION

const doUserRegistration = data => {
  const _data = JSON.stringify({
    email: data.data.username,
    password: data.data.password,
  });
  return doServerRequest({ url, method: 'post', data: _data });
};

function* userRegister(data) {
  const { response } = yield call(doUserRegistration, data);
  if (response && !response.status) {
    yield put({ type: REGISTRATION_POST_SUCCESS, ...response });
    logger('User logged in', 'info');
  } else {
    yield put({ type: REGISTRATION_POST_FAILED, ...response });
    logger(response.statusText, 'error');
  }
}

function* userlogout() {
  localStorage.removeItem('user');
  yield put({ type: LOGOUT_GET_SUCCESS });
  logger('User logged out', 'info');
}

export default function* loginSagas() {
  yield all([
    takeLatest(REGISTRATION_POST_REQUESTED, userRegister),
    takeLatest(LOGOUT_GET_REQUESTED, userlogout),
  ]);
}
