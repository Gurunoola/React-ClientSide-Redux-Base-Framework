import { events as EVENT } from '../ConstantManager';

const { NETWORK_ERROR, RESET_EVENT,UNAUTORIZED } = EVENT

export const dashboardReducer = (state = [], sagaResponse) => { // change for new component
  const { type } = sagaResponse
  switch (type) {
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

export default dashboardReducer;