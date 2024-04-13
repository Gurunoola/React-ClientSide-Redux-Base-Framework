import { events as EVENT } from '../ConstantManager';

const { NETWORK_ERROR, RESET_EVENT,UNAUTORIZED, PROGRESS_BAR } = EVENT

export const appReducer = (state = [], sagaResponse) => { // change for new component
  const { type } = sagaResponse
  switch (type) {
    case PROGRESS_BAR:
    case NETWORK_ERROR:
    case RESET_EVENT:
      return { ...sagaResponse };
    case UNAUTORIZED:
      localStorage.removeItem('user');
      return { ...sagaResponse };
    default:
      return state;
  }
};

export default appReducer;