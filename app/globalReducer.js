import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from 'utils/history';
import loginPagereducer from './containers/LoginPage/reducer';
import logoutReducer from './containers/Logout/reducer';
import asyncDropdownReducer from './containers/AsyncDropdown/reducer'
import appReducer from './containers/App/reducer';

export default function createReducer(injectedReducers = {}) {

  const combinedReducer = combineReducers({
    app: appReducer,
    auth: loginPagereducer,
    logout: logoutReducer,
    asyncDropdown: asyncDropdownReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  const rootReducer = (state, action) => combinedReducer(state, action);

  return rootReducer;
}
