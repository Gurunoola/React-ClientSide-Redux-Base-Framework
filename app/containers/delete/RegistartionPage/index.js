import React, { useState, useEffect, useRef } from 'react';

import './style.css';
import { useHistory, Link } from 'react-router-dom';
import { PoweredBy } from '../../components';
import { events as EVENT, toastMessages, labels, validationErrorMessages} from '../ConstantManager';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"

import AsyncDropdown from '../AsyncDropdown/Loadable';
import { dateFormat } from '../../helpers/utils';

const {
  POST_SUCCESS,
  POST_FAILED  
} = EVENT.STUDENTS

const {NETWORK_ERROR } = EVENT

export default function Registration(props) {
  const ref = useRef();
  const history = useHistory();
  const [loginError, setLoginError] = useState('d-none');
  const [loading, setLoading] = useState(false);
  const actionType = props.state.auth.type;

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      address: "#902, North Block, Preethi Woods Apartments, 6th Cross, Vidhya Nagar Layout, Thanisandra",
      birthDate: "2024-03-22",
      contactNumber: "9740431433",
      email: "kmkamkam@gmail.com",
      firstName: "Gurusharan",
      gender: "Male",
      lastName: "Noola",
      roleId: "30",
      usi: "0"
    }
  });
  const validate = { 
    required: {required: validationErrorMessages.REQUIRED}, 
    minLength: { value: 3, message: validationErrorMessages.MIN_LENGTH + '3' }
  };

  const {
    setShowProgressBar: showProgressBar,
    state: {
      ['students']: {
        type,
        message,
        onResult,
        result
      },
    },
  } = props;

  const {
    postRegister,
    resetEvent,
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo,
    authRest
  } = props.sagaMethods;

  function handelLogin(e) {
    setLoading(true);
    setLoginError('d-none');
    e.preventDefault();
    const username = e.currentTarget[0].value;
    const password = e.currentTarget[1].value;
    props.sagaMethods.login({ username, password });
  }

  useEffect(() => {
    let msg;
    switch (type) {
      case POST_SUCCESS:
        msg = toastMessages.CREATED.SUCCESS;
        alert("Your temporary password is" + onResult.message.split(":")[1])
        resetEvent()
        history.goBack()
        break;
      case POST_FAILED:
        toastError(toastMessages.CREATED.ERROR + message);
        resetEvent()       
        break;
      case NETWORK_ERROR:
        toastError(toastMessages.ERROR);
        break;
    }
    msg ? toastSuccess(msg) : undefined;
  }, [type]);

  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0" style={{ backgroundColor: '#f8f9fc' }}>
      <div className="container">
        <div className="card login-reg-card shadow" style={{ width: "100%" }}>
          <div className="row no-gutters">
            <div className="col-md-6">
              <img src={`${require('../../img/registration.svg')}`} alt="login" className="login-reg-card-img" />
            </div>
            <div className="col-md-6 text-center">
              <div className="card-body text-center ">
                <div className="brand-wrapper mb-3">
                  <img src={`${require('../../img/clientLogo.png')}`} alt="logo" className="logo" />
                </div>
                <p className="login-reg-card-description mb-4 forgot-password-link"> {labels.TITLES.REGISTRATION} </p>
                {/* <form action="" className="text-center mx-auto" onSubmit={handelLogin} >
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label htmlFor="firstName" className="float-left label">{labels.FIRST_NAME}</label>
                        <input type="text" name="firstName" id="firstName" required className="form-control" />
                      </div>
                      <div className="col">
                        <label htmlFor="lastName" className="float-left label">{labels.LAST_NAME}</label>
                        <input type="text" name="lastName" id="lastName" required className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="float-left label">{labels.EMAIL}</label>
                    <input type="email" name="email" id="email" required className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactNumber" className="float-left label">{labels.CONTACT}</label>
                    <input type="number" name="contactNumber" required id="contactNumber" className="form-control" />
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label htmlFor="birthDate" className="float-left label">{labels.DOB}</label>
                        <input type="date" name="birthDate" required id="birthDate" className="form-control" />
                      </div>
                      <div className='col'>
                        <label htmlFor="gender" className="float-left label">{labels.GENDER}</label>
                        <select className="form-control" required name='gender' id='gender'>
                          <option value="">{labels.PLEASE_SELECT}</option>
                          <option value="male">{labels.GENDER_MALE}</option>
                          <option value="female">{labels.GENDER_FEMALE}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address" className="float-left label">{labels.ADDRESS}</label>
                    <textarea className='form-control' required name='address' id='address'></textarea>
                  </div>
                  <button className="btn btn-block btn-primary mb-4" type="submit" >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                        <span className="float-left label">{labels.LOADING}</span>
                      </>
                    ) : (
                      `${labels.BUTTON_REGISTRATION}`
                    )}
                  </button>
                  <Link to='/login' className="btn btn-block btn-link mb-2" >{labels.BUTTON_BACK_TO_LOGIN}</Link>
                  <div className="">
                    <PoweredBy color="black" fontSize="h12" position="none" />
                  </div>
                </form>  */}
                 <form className="text-center mx-auto" onSubmit={handleSubmit((data) => { postRegister({...data, birthDate: "2024-03-08T09:50:39.004Z", usi: "0", roleId: 1, classId: 1, accYearId: 1, discount: 0  }) })}>
                  <div className='row mt-3'>
                    <div className='text-left col-md-6 mb-6 text-left'>
                      <label>{labels.FIRST_NAME}</label>
                      <input className='form-control' {...register("firstName", validate)} />
                      <ErrorMessage className={'text-danger'} errors={errors} name="firstName" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
                    </div>
                    <div className='text-left col-md-6 mb-6'>
                      <label>{labels.LAST_NAME}</label>
                      <input className='form-control' {...register("lastName", validate)} />
                      <ErrorMessage errors={errors} name="lastName" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
                    </div>
                  </div>
                  <div className='row mt-3'>                    
                    <div className='text-left col-md-12 mb-12'>
                      <label>{labels.EMAIL}</label>
                      <input className='form-control' type="text" placeholder="Email" {...register("email", validate.required, { pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: validationErrorMessages.EMAIL } })} />
                      <ErrorMessage errors={errors} name="email" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
                    </div>
                  </div>
                  <div className='row mt-3'>                    
                    <div className='text-left col-md-12 mb-12'>
                    <label>{labels.CONTACT}</label>
                      <input className='form-control' { ...register("contactNumber", { ...validate.required, minLength:{value: 10, message: validationErrorMessages.MIN_LENGTH + 10}, maxLength:{value: 10, message: validationErrorMessages.MAX_LENGTH + 10}})} />
                      <ErrorMessage errors={errors} name="contactNumber" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='text-left col-md-6 mb-6'>
                      <label>{labels.DOB}</label>
                      <input type='date' className='form-control' {...register("birthDate", validate.required)} />
                      <ErrorMessage errors={errors} name="birthDate" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
                    </div>
                    <div className='text-left col-md-6 mb-6'>
                      <label>{labels.GENDER}</label>
                      <select className='form-control' {...register("gender", validate.required)}>
                        <option value="Male">{labels.GENDER_MALE}</option>
                        <option value="Female">{labels.GENDER_FEMALE}</option>
                      </select>
                      <ErrorMessage errors={errors} name="gender" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
                    </div>
                  </div>
                    <div className='row mt-3'>                    
                    <div className='text-left col-md-12 mb-12'>
                    <label>{labels.ADDRESS}</label>
                      <textarea className='form-control' {...register("address", validate.required)} />
                      <ErrorMessage errors={errors} name="address" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='d-flex w-100 justify-content-end'>
                    <input type="button" value={labels.BUTTON_BACK} onClick={history.goBack} className='btn btn-block btn-link mb-2' />
                      <button type="submit" value={labels.BUTTON_REGISTRATION} className='btn btn-block btn-primary mr-2'>
                      {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                        <span className="float-left label">{labels.LOADING}</span>
                      </>
                    ) : (
                      `${labels.BUTTON_REGISTRATION}`
                    )}
                        </button>                      
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
