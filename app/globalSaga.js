import { fork, all } from 'redux-saga/effects';
import baseSaga from './containers/BasePage/saga';
import loginSagas from './containers/LoginPage/saga';
import logoutSagas from './containers/Logout/saga';
import asyncDropdownSaga from './containers/AsyncDropdown/saga'
export default function* rootSaga() {
  yield all([
    fork(loginSagas),
    fork(logoutSagas),
    fork(asyncDropdownSaga),
  ]);
}
