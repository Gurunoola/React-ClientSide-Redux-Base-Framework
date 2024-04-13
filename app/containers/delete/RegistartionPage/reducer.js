import { events as EVENT } from '../ConstantManager';
import { globalConfigs } from '../../globalConfigs';
import SecureLS from 'secure-ls';
const {
  REGISTRATION_POST_REQUESTED,
  REGISTRATION_POST_SUCCESS,
  REGISTRATION_POST_FAILED
} = EVENT.REGISTRATION

const registration = (state = {}, action) => {
  switch (action.type) {
    case REGISTRATION_POST_SUCCESS:
      const ls = new SecureLS({encodingType: 'aes', encryptionSecret: globalConfigs.appConfig.secretKey});
      ls.set('user', JSON.stringify({ ...action }));
      //localStorage.setItem('user', JSON.stringify({ ...action }));
      return { ...action, error: false };
    case REGISTRATION_POST_REQUESTED:
      return { ...state, ...action, error: true };
    case REGISTRATION_POST_FAILED:
      return { type: action.type };
    default:
      return state;
  }
};

export default registration;
