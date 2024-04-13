import { events as EVENT } from '../ConstantManager';
import { componentNameCaps } from './componentName';

const {
  LOGOUT_GET_SUCCESS
} = EVENT.AUTH;

export const logoutReducer = (state = [], sagaResponse) => { // change for new component
  const { type } = sagaResponse
  switch (type) {
    case LOGOUT_GET_SUCCESS:
      return { ...sagaResponse, fetching: false };
    default:
      return state;
  }
};

export default logoutReducer;