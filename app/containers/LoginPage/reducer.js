import { events as EVENT } from '../ConstantManager';
import { globalConfigs } from '../../globalConfigs';
import SecureLS from 'secure-ls';
const {
  LOGIN_GET_SUCCESS,
  LOGIN_GET_FAILED,
  LOGOUT_GET_REQUESTED,
  LOGOUT_GET_SUCCESS,
  AUTH_RESET
} = EVENT.AUTH

const { NETWORK_ERROR, UNAUTORIZED } = EVENT;

const login = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_GET_SUCCESS:
      const ls = new SecureLS({encodingType: 'aes', encryptionSecret: globalConfigs.appConfig.secretKey});
      ls.set('user', JSON.stringify({ ...action.result }));
      //localStorage.setItem('user', JSON.stringify({ ...action.result.data }));
      return { ...action, error: false };
    // case LOGOUT_GET_REQUESTED:
    //   return { ...state, ...action, error: true };
    // case LOGOUT_GET_SUCCESS:
    case LOGIN_GET_FAILED:
    case AUTH_RESET:
      localStorage.removeItem('user');
      return { type: action.type };
    case UNAUTORIZED:
    case NETWORK_ERROR:
      return { ...action };
    default:
      return state;
  }
};

export default login;
