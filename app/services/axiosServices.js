import axios from 'axios';
import _ from 'lodash';
import { getAccessToken } from './userServices';
import { globalConfigs } from '../globalConfigs';
import { events as EVENT } from '../containers/ConstantManager';


const { NETWORK_ERROR, UNAUTORIZED } = EVENT

export const doServerRequest = async ({ data, url, method }) => {
  const serviceDomain = 'localhost:3000';
  const baseUrl = `http://${serviceDomain}/v1`;
  const token = getAccessToken();
  const headers = {
    'Content-Type': 'application/json',
    'accept': '*/*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    Authorization: `Bearer ${token}`
  };

  const baseConfig = {
    url: baseUrl + url,
    method,
    headers,
    data,
  };

  try {
    const response = await axios(baseConfig);
    return ({ response });
  } catch (e) {
    const error = _.get(e, 'response.data', {});

    if (error.statusCode === 401 || error.code === 401 && getAccessToken()) {
      window.location.href = "/logout";
        }

    return { response: null, error };
  }
};

export const constructEvents = (response, error, method, componentName) => {
  const { status, message } = error ? error.response ? parseResponse(error.response.data) : parseResponse(error) : parseResponse(response);
  switch (status) {
    case 200:
    case 201:
    case 204:
      return { event: getReducerEvent('success_event', method, componentName), message };
    case 401:
      return { event: getReducerEvent('unauth_event', method, componentName), message };
    case 404:
    case 400:
      return { event: getReducerEvent('failed_event', method, componentName), message };
    default:
      return { event: getReducerEvent('ntw_err_event', method, componentName), message };
  }
}

function parseResponse(response) {
  let status, message;

  if (response.hasOwnProperty('statusCode')) {
    status = response.statusCode;
    message = response.message;
  } else if (response.hasOwnProperty('status')) {
    status = response.status;
    message = response.message;
  } else if (response.hasOwnProperty('code')) {
    status = response.code;
    message = response.message;
  } else {
    status = 'Unknown';
    message = 'Unknown error';
  }

  return { status, message };
}

export const getReducerEvent = (event, method, componentName) => {
  if (componentName === 'AUTH') {
    const EVENT_METHOD_MAP = {
      'get': {
        'failed_event': EVENT.AUTH.LOGIN_GET_FAILED,
        'success_event': EVENT.AUTH.LOGIN_GET_SUCCESS,
        'ntw_err_event': NETWORK_ERROR,
        'unauth_event': UNAUTORIZED
      }
    };
    return EVENT_METHOD_MAP[method] ? EVENT_METHOD_MAP[method][event] : undefined;
  }
  if (componentName === 'LOGOUT') {
    const EVENT_METHOD_MAP = {
      'post': {
        'failed_event': EVENT.AUTH.LOGOUT_GET_FAILED,
        'success_event': EVENT.AUTH.LOGOUT_GET_SUCCESS,
        'ntw_err_event': NETWORK_ERROR,
        'unauth_event': UNAUTORIZED
      }
    };
    return EVENT_METHOD_MAP[method] ? EVENT_METHOD_MAP[method][event] : undefined;
  }
  const EVENT_METHOD_MAP = {
    'find': {
      'failed_event': EVENT[componentName].LIST_GET_FIND_BY_QUERY_FAILED,
      'success_event': EVENT[componentName].LIST_GET_FIND_BY_QUERY_SUCCESS,
      'ntw_err_event': NETWORK_ERROR,
      'unauth_event': UNAUTORIZED
    },
    'list': {
      'failed_event': EVENT[componentName].LIST_GET_FAILED,
      'success_event': EVENT[componentName].LIST_GET_SUCCESS,
      'ntw_err_event': NETWORK_ERROR,
      'unauth_event': UNAUTORIZED
    },
    'get': {
      'failed_event': EVENT[componentName].GET_FAILED,
      'success_event': EVENT[componentName].GET_SUCCESS,
      'ntw_err_event': NETWORK_ERROR,
      'unauth_event': UNAUTORIZED
    },
    'update': {
      'failed_event': EVENT[componentName].UPDATE_FAILED,
      'success_event': EVENT[componentName].UPDATE_SUCCESS,
      'ntw_err_event': NETWORK_ERROR,
      'unauth_event': UNAUTORIZED
    },
    'post': {
      'failed_event': EVENT[componentName].POST_FAILED,
      'success_event': EVENT[componentName].POST_SUCCESS,
      'ntw_err_event': NETWORK_ERROR,
      'unauth_event': UNAUTORIZED
    },
    'delete': {
      'failed_event': EVENT[componentName].DELETE_FAILED,
      'success_event': EVENT[componentName].DELETE_SUCCESS,
      'ntw_err_event': NETWORK_ERROR,
      'unauth_event': UNAUTORIZED
    }
  };
  return EVENT_METHOD_MAP[method] ? EVENT_METHOD_MAP[method][event] : undefined;
}

