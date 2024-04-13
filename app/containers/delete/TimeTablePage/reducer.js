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
  LIST_GET_FIND_BY_QUERY_SUCCESS,
  LIST_GET_FIND_BY_QUERY_FAILED
} = EVENT[componentNameCaps];

const { NETWORK_ERROR, RESET_EVENT,UNAUTORIZED } = EVENT

export const timetablesReducer = (state = [], sagaResponse) => { // change for new component
  const { type } = sagaResponse
  switch (type) {
    case LIST_GET_FAILED:
    case GET_FAILED:
    case POST_FAILED:
    case UPDATE_FAILED:
    case DELETE_FAILED:
    case LIST_GET_FIND_BY_QUERY_FAILED:
      return {...sagaResponse, fetching: false };
    case LIST_GET_SUCCESS:
    case GET_SUCCESS:
    case POST_SUCCESS:
    case UPDATE_SUCCESS:
    case DELETE_SUCCESS:
      return { ...sagaResponse, fetching: false };
    case LIST_GET_FIND_BY_QUERY_SUCCESS:
      return { ...sagaResponse, fetching: false };
      break
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

export default timetablesReducer;