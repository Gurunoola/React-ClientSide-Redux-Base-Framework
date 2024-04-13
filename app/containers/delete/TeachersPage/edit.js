import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import ToolBar from './toolBar';
import { Card, Icon } from '../../components';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import { labels, validationRules, basicValidationRules } from '../ConstantManager';
import AsyncDropdown from '../AsyncDropdown/Loadable';
import { useHistory } from 'react-router-dom';
import { dateFormat } from '../../helpers/utils';

export default function Edit({ showProgressBar, props, data, title, id, onEdit, confirmDelete, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [isNewUser, setIsNewUser] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showParents, setShowParents] = useState(false);


  const history = useHistory();
  const {
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo
  } = props.sagaMethods;

  const actionButtons = [
    {
      title: ``,
      iconOptions: { icon: '', size: '12px' },
      type: '',
      path: `/students/edit/${id}`
    }
  ];

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {

    }


  });
  useEffect(() => {

    if (id && id !== 'new') {
      if (data.length > 0) {
        setFormData(data[0])
        setTimeout(() => {
          reset({ ...data[0] });
          showProgressBar(false)
        }, 100);
      } else {
        history.goBack();
      }
    } else {
      setIsNewUser(true);
      showProgressBar(false)
    }
  }, [])

  function getForm() {
    return <Card body={
      <>
        <form onSubmit={handleSubmit((data) => { showProgressBar(true); onSubmit(data, isNewUser) })}>
          <h5 className='pt-3 pb-3 border-bottom'>{_.capitalize(title)} Details</h5>
          <div className='bg-light p-3'>
            <div className="row">
              <div className='col-md-4 mb-4'>
                <label>{labels.FIRST_NAME}</label>
                <input type='text' className='form-control' {...register("firstName", basicValidationRules)} />
                <ErrorMessage errors={errors} name="firstName" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.LAST_NAME}</label>
                <input type='text' className='form-control' {...register("lastName", basicValidationRules)} />
                <ErrorMessage errors={errors} name="lastName" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.EMAIL}</label>
                <input type='text' className='form-control' {...register("email", { ...validationRules.required, ...validationRules.email })} />
                <ErrorMessage errors={errors} name="email" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
            </div>
            <div className="row">
              <div className='col-md-4 mb-4'>
                <label>{labels.PRIMARY_MOBILE}</label>
                <input type='tel' className='form-control' {...register("primaryMobile", { ...validationRules.required, ...validationRules.phone })} />
                <ErrorMessage errors={errors} name="primaryMobile" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.SECONDARY_MOBILE}</label>
                <input type='tel' className='form-control' {...register("secondaryMobile", { ...validationRules.phone })} />
                <ErrorMessage errors={errors} name="secondaryMobile" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.GENDER}</label>
                <select className='form-control' {...register("gender", { ...validationRules.required })}>
                  <AsyncDropdown dataType={'gender'} />
                </select>
                <ErrorMessage errors={errors} name="gender" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
            </div>
            <div className="row">
              <div className='col-md-4 mb-4'>
                <label>{labels.AADHAAR}</label>
                <input type='text' className='form-control' {...register("aadhaarNumber", { ...validationRules.required, ...validationRules.aadhaar })} />
                <ErrorMessage errors={errors} name="aadhaarNumber" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.DOB}</label>
                <input type='date' className='form-control' {...register("dob", { ...validationRules.required })} />
                <ErrorMessage errors={errors} name="dob" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.BLOOD_GROUP}</label>
                <select className='form-control' {...register("bloodGroup", { ...validationRules.required })}>
                  <AsyncDropdown dataType={'bloodGroup'} />
                </select>
                <ErrorMessage errors={errors} name="bloodGroup" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
            </div>
            <div className="row">
              <div className='col-md-4 mb-4'>
                <label>{labels.PAN_CARD}</label>
                <input type='tel' className='form-control' {...register("panNo", { ...validationRules.required, ...validationRules.pan })} />
                <ErrorMessage errors={errors} name="panNo" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.EMP_CODE}</label>
                <input type='tel' className='form-control' {...register("empCode", basicValidationRules)} />
                <ErrorMessage errors={errors} name="empCode" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.MARITAL_STATUS}</label>
                <select className='form-control' {...register("maritalStatus", { ...validationRules.required })}>
                  <AsyncDropdown dataType={'maritalStatus'} />
                </select>
                <ErrorMessage errors={errors} name="maritalStatus" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
            </div>
            <div className="row">
              <div className='col-md-4 mb-4'>
                <label>{labels.SALARY}</label>
                <input type='number' className='form-control' {...register("salary", { ...validationRules.required, ...validationRules.number })} />
                <ErrorMessage errors={errors} name="salary" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.DEPARTMENT}</label>
                <input type='tel' className='form-control' {...register("department", basicValidationRules)} />
                <ErrorMessage errors={errors} name="department" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
            </div>
          </div>
          <h5 className='pt-3 pb-3 border-bottom cursorPointer' onClick={() => { setShowAddress(!showAddress) }}> <Icon icon={showAddress ? 'caret-up-square' : 'caret-down-square'} size='12px' /> Address Details</h5>
          {showAddress ? <div className='bg-light p-3'>
            <div className="row">
              <div className='col-md-4 mb-4'>
                <label>{labels.ADDRESS_1}</label>
                <input type='text' className='form-control'  {...register("addresses.address1", basicValidationRules)} />
                <ErrorMessage errors={errors} name="addresses.address1" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.ADDRESS_2}</label>
                <input type='text' className='form-control'  {...register("addresses.address2", basicValidationRules)} />
                <ErrorMessage errors={errors} name="addresses.address2" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.CITY}</label>
                <input type='text' className='form-control'  {...register("addresses.city", basicValidationRules)} />
                <ErrorMessage errors={errors} name="addresses.city" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
            </div>
            <div className="row">
              <div className='col-md-4 mb-4'>
                <label>{labels.STATE}</label>
                <input type='text' className='form-control'  {...register("addresses.state", basicValidationRules)} />
                <ErrorMessage errors={errors} name="addresses.state" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.COUNTRY}</label>
                <input type='text' className='form-control'  {...register("addresses.country", basicValidationRules)} />
                <ErrorMessage errors={errors} name="addresses.country" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.PIN_CODE}</label>
                <input type='text' className='form-control'  {...register("addresses.pincode", { ...validationRules.required, ...validationRules.pincode })} />
                <ErrorMessage errors={errors} name="addresses.pincode" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
            </div>
          </div> : undefined}
          <div className='row p-4'>
            <div className='d-flex w-100 justify-content-end'>
              <input type="submit" value={isNewUser ? labels.BUTTON_SAVE : labels.BUTTON_UPDATE} className='float-end btn btn-inline btn-primary mr-2' />
              <input type="button" value={labels.BUTTON_RESET} onClick={() => { reset({ ...data[0] }); }} className='float-end btn btn-inline btn-warning mr-2' />
              <input type="button" value={labels.BUTTON_BACK} onClick={history.goBack} className='float-end btn btn-inline btn-secondary' />
            </div>
          </div>
        </form>
      </>
    } />;
  }

  const addNewForm = () => {
    return getForm([])
  }
  return (
    <div className="">
      <ToolBar title={title} mode={'Edit'} actionButtons={actionButtons} />
      <div className="pageContent shadow-sm-up bg-white ">
        {Object.keys(formData).length > 0 ? getForm(formData) : undefined}
        {isNewUser ? addNewForm() : undefined}
      </div>
    </div>
  );
}
