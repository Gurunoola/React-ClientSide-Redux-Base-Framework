import { put, call, takeLatest, all } from 'redux-saga/effects';
import { events as EVENT } from '../ConstantManager';
import { doServerRequest, constructEvents } from '../../services/axiosServices';
import _ from 'lodash';

const url = `/auth/logout`;

const {
  LOGOUT_GET_REQUESTED,
  LOGOUT_GET_SUCCESS,
} = EVENT.AUTH;

const doLogout = options => {
  const dataD = JSON.stringify({
    refreshToken: options.refreshToken
  });
  return doServerRequest({data: dataD, url: `${url}`, method: 'post' });
};
function* logout(params) {
  const { response, error } = yield call(doLogout, params);
  const { event, message } = constructEvents(response, error, 'post', 'LOGOUT');
  const data = _.get(response, 'data.results', []);
  const rest = _.omit(_.get(response, 'data', []), 'results');
  yield put({ type: LOGOUT_GET_SUCCESS, result: {data: [...data], ...rest} || undefined, message });
};

export default function* logoutSaga() {
  yield all([
    takeLatest(LOGOUT_GET_REQUESTED, logout)
  ]);
}
