import { events as EVENT } from '../ConstantManager';
import { componentNameCaps } from './componentName';

const {
  LIST_GET_SUCCESS,
  LIST_GET_FAILED,
  GET_SUCCESS,
  GET_FAILED,
  POST_SUCCESS,
  POST_FAILED,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
  DELETE_SUCCESS,
  DELETE_FAILED,
} = EVENT[componentNameCaps];

const { NETWORK_ERROR, RESET_EVENT,UNAUTORIZED } = EVENT

export const usersReducer = (state = [], sagaResponse) => { // change for new component
  const { type } = sagaResponse
  switch (type) {
    case LIST_GET_FAILED:
    case GET_FAILED:
    case POST_FAILED:
    case UPDATE_FAILED:
    case DELETE_FAILED:
      return {...sagaResponse, fetching: false };
    case LIST_GET_SUCCESS:
    case GET_SUCCESS:
    case POST_SUCCESS:
    case UPDATE_SUCCESS:
    case DELETE_SUCCESS:
      return { ...sagaResponse, fetching: false };
    case NETWORK_ERROR:
    case RESET_EVENT:
      return { ...sagaResponse, fetching: false };
    case UNAUTORIZED:
      localStorage.removeItem('user');
      return { ...sagaResponse, fetching: false };
    default:
      return state;
  }
};

export default usersReducer;