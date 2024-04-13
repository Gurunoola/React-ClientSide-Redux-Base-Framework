import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as _ from 'lodash';
import { getAccessTokenWithExpires } from '../../services/userServices';

import {
  events as EVENT,
  toastMessages,
} from '../ConstantManager';

export default function Logout(props) { //change for new component
  const {
   LOGOUT_GET_SUCCESS,
  } = EVENT.AUTH;

  const {
    state: {
      ['logout']: {
        type
      },
    },
  } = props;


  // All toast actions
  const {
    logout,
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo
  } = props.sagaMethods;

  useEffect(() => {
    const refreshToken = getAccessTokenWithExpires()
    logout(refreshToken)
  }, []);

  useEffect(() => {
    let msg;
    switch (type) {
      case LOGOUT_GET_SUCCESS:
        localStorage.removeItem('user');
        // msg = toastMessages.LOGOUT_GET_SUCCESS;
        toastSuccess(toastMessages.LOGOUT.SUCCESS);
         setTimeout(()=>{window.location.reload();}, 100);
        break;
    }
    msg ? toastSuccess(msg) : undefined;
  }, [type]);

  return <div className="overflow-hidden">
    Logging out...
  </div>
    ;
}
