import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import GlobalStyle from '../../globalStyles';
import { useHistory } from 'react-router-dom';
import { getAccessToken, getUser, getUserRole } from '../../services/userServices';
import { events as EVENT, toastMessages, labels } from '../ConstantManager';
import _ from 'lodash';
import { PoweredBy } from '../../components';
import { globalConfigs } from '../../globalConfigs';

const {
  LOGIN_GET_SUCCESS, LOGIN_GET_FAILED, LOGOUT_GET_REQUESTED,
  LOGOUT_GET_SUCCESS
} = EVENT.AUTH

const { NETWORK_ERROR, UNAUTORIZED } = EVENT

export default function Login(props) {
  const history = useHistory();
  const [loginError, setLoginError] = useState('d-none');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { appConfig, schoolConfig } = globalConfigs;

  const {
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo,
    authRest
  } = props.sagaMethods;

  const {
    state: {
      auth: {
        type,
        message
      }
    }
  } = props

  function handelLogin(e) {
    setLoading(true);
    setLoginError('d-none');
    e.preventDefault();
    const email = e.currentTarget[0].value;
    const password = e.currentTarget[1].value;
    props.sagaMethods.login({ email, password });
  }

  function handelForgotPassword(e) {
    e.preventDefault(); setLoading(true);
    setLoginError('d-none');
  }

  useEffect(() => {
    const token = getAccessToken();
    const user = getUser();
    const userRole = getUserRole();
    if (user) {
      if (type === LOGIN_GET_SUCCESS && token) {
        setLoading(false);
        toastSuccess(`${toastMessages.LOGIN.SUCCESS} ${_.capitalize(user.data.firstName)} ${_.capitalize(user.data.lastName)}`)
        history.push(props.rootPage);
      } else if (type === LOGIN_GET_FAILED) {
        setLoading(false);
        authRest()
        toastError(`${toastMessages.LOGIN.ERROR}`)
      } else if (type === NETWORK_ERROR) {
        setLoading(false);
        authRest()
        toastError(`${message}`)
      } else if (type === UNAUTORIZED ) {
        setLoading(false);
        authRest()
        toastError(`${message}`)
      }
    } else {
      setLoading(false);
    }
  }, [type]);

  return (
    <main
      className="d-flex align-items-center min-vh-100 py-3 py-md-0"
      style={{ backgroundColor: '#f8f9fc' }}
    >
      <div className="container">
        <div className="card login-reg-card shadow-sm">
          <div className="row no-gutters">
            <div className="col-md-6">
              <img
                src={`${require('../../img/login-illustration.svg')}`}
                alt="login"
                className="login-reg-card-img"
              />
            </div>
            <div className="col-md-6 text-center">
              <div className="card-body text-center ">
                <div className="brand-wrapper mb-3">
                  <img
                    src={schoolConfig.logo}
                    alt={schoolConfig.name}
                    className="logo"
                  />
                </div>

                {!showForgotPassword ? <>
                  <p className="login-reg-card-description mb-4 forgot-password-link">
                    {labels.TITLES.LOGIN}
                  </p>
                  <form
                    action=""
                    className="text-center mx-auto"
                    onSubmit={handelLogin}
                  >
                    <div className="form-group">
                      <label htmlFor="username" className="sr-only">
                        {labels.EMAIL}
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        placeholder={`${labels.PLACE_HOLDERS.EMAIL}`} />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="password" className="sr-only">
                        {labels.PASSWORD}
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder={`${labels.PLACE_HOLDERS.PASSWORD}`} />
                    </div>
                    <div className='form-group mb-4'>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => { setShowPassword(!showPassword) }} />
                        <label className="form-check-label" for="flexCheckDefault">
                          {labels.SHOW_PASSWORD}
                        </label>
                      </div>
                    </div>
                    <button
                      className="btn btn-block btn-primary mb-4"
                      type="submit"
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true" />
                          <span className="sr-only">{labels.LOADING}</span>
                        </>
                      ) : (
                        `${labels.BUTTON_LOGIN}`
                      )}
                    </button>
                  </form>
                  <p className="forgot-password-link">
                    { appConfig.showRegistartionLink ? <> New user? <Link to='/register'>{labels.BUTTON_REGISTRATION}</Link> &nbsp; | &nbsp;</> : undefined }
                    <a href="#!" className="" onClick={() => { setShowForgotPassword(!showForgotPassword); }}>
                      {labels.BUTTON_FORGOT_PASSWORD}
                    </a></p></>
                  :
                  <>
                    <p className="login-card-description mb-4 forgot-password-link">
                      {labels.TITLES.FORGOT_PASSWORD}
                    </p>
                    <form
                      action=""
                      className="text-center mx-auto"
                      onSubmit={handelForgotPassword}
                    >
                      <div className="form-group">
                        <label htmlFor="email" className="float-left label">
                          {labels.EMAIL}
                        </label>
                        <p className='mb-1'>&nbsp;</p>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="form-control"
                          required
                          placeholder={`${labels.PLACE_HOLDERS.EMAIL}`}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="email" className="float-left label">
                          {labels.DOB}
                        </label>
                        <p className='mb-1'>&nbsp;</p>
                        <input
                          type="date"
                          required
                          name="Date of Birth"
                          id="Date of Birth"
                          className="form-control"
                          placeholder={`${labels.PLACE_HOLDERS.DOB}`} />
                      </div>
                      <button
                        className="btn btn-block btn-primary mb-4"
                        type="submit"
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true" />
                            <span className="sr-only">{labels.LOADING}</span>
                          </>
                        ) : (
                          `${labels.BUTTON_SEND}`
                        )}
                      </button>
                      <button
                        className="btn btn-block btn-link mb-4"
                        type="button"
                        onClick={() => { setShowForgotPassword(false) }}
                      >{labels.BUTTON_BACK_TO_LOGIN}</button>
                    </form>
                  </>
                }
                {
                  appConfig.showTermsAndPrivacyPolicy ? <nav className="login-card-footer-nav">
                  <a href="#!">Terms of use </a> &nbsp; | &nbsp;
                  <a href="#!">Privacy policy</a>
                </nav> : undefined
                }     
                
                <div className="">
                  <PoweredBy color="black" fontSize="h12" position="none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GlobalStyle />
    </main>
  );
}
