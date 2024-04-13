import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import ToolBar from './toolBar';
import { Card } from '../../components';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import { labels, validationErrorMessages } from '../ConstantManager';
import AsyncDropdown from '../AsyncDropdown/Loadable';
import { useHistory } from 'react-router-dom';
import { dateFormat } from '../../helpers/utils';

export default function Edit({ showProgressBar, props, data, title, id, onEdit, confirmDelete, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [isNewUser, setIsNewUser] = useState(false);
  const astrix = labels.REQUIRED_ASTRIX
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
    defaultValues: formData,
  });
  useEffect(() => {

    if (id) {
      if (data.length > 0) {
        setFormData(data[0])
        setTimeout(() => {
          reset({ ...data[0], birthDate: dateFormat(data[0].birthDate, "YYYY-MM-DD") });
        }, 500);
      } else {
        history.goBack();
      }
    } else {
      setIsNewUser(true);
    }
  }, [])

  const validate = { 
      required: {required: validationErrorMessages.REQUIRED}, 
      minLength: { value: 3, message: validationErrorMessages.MIN_LENGTH + '3' }
    };

  function getForm() {
    return <Card body={
      <>
        <form onSubmit={handleSubmit((data) => { showProgressBar(true); onSubmit(data, isNewUser) })}>
          <div className='row'>
            <div className='col-md-4 mb-4'>
              <label>{labels.FIRST_NAME}{astrix}</label>
              <input className='form-control' {...register("firstName", validate)} />
              <ErrorMessage className={'text-danger'} errors={errors} name="firstName" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.LAST_NAME}</label>
              <input className='form-control' {...register("lastName", validate)} />
              <ErrorMessage errors={errors} name="lastName" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.EMAIL}</label>
              <input className='form-control' type="text" placeholder="Email" {...register("email", validate.required, { pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: validationErrorMessages.EMAIL } })} />
              <ErrorMessage errors={errors} name="email" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 mb-4'>
              <label>{labels.CONTACT}</label>
              <input className='form-control' { ...register("contactNumber", { ...validate.required, minLength:{value: 10, message: validationErrorMessages.MIN_LENGTH + 10}, maxLength:{value: 10, message: validationErrorMessages.MAX_LENGTH + 10}})} />
              <ErrorMessage errors={errors} name="contactNumber" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.DOB}</label>
              <input type='date' className='form-control' {...register("birthDate", validate.required)} />
              <ErrorMessage errors={errors} name="birthDate" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.GENDER}</label>
              <select className='form-control' {...register("gender", validate.required)}>
                <option value="Male">{labels.GENDER_MALE}</option>
                <option value="Female">{labels.GENDER_FEMALE}</option>
              </select>
              <ErrorMessage errors={errors} name="gender" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 mb-4'>
              <label>{labels.ROLE}</label>
              <select className='form-control' {...register("roleId", validate.required)}>
                <AsyncDropdown dataType={'roles'} value={formData.roleId} />
              </select>
              <ErrorMessage errors={errors} name="roleId" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.ACC_YEAR}</label>
              <select className='form-control' {...register("accYearId", validate.required)}>
                <AsyncDropdown dataType={'academicYears'} value={formData.accYearId} />
              </select>
              <ErrorMessage errors={errors} name="accYearId" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.CLASS}</label>
              <select className='form-control' {...register("classId", validate.required)}>
                <AsyncDropdown dataType={'classes'} value={formData.classId} />
              </select>
              <ErrorMessage errors={errors} name="classId" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 mb-4'>
              <label>{labels.ADDRESS}</label>
              <textarea className='form-control' {...register("address", validate.required)} />
              <ErrorMessage errors={errors} name="address" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.DISCOUNT}</label>
              <input className='form-control' {...register("discount")} />
              <ErrorMessage errors={errors} name="discount" render={({ message }) => <p>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.ACTIVE}</label><br />
              <input className='' type="checkbox" {...register("isActive")} />
            </div>
          </div>
          <div className='row p-4'>
            <div className='d-flex w-100 justify-content-end'>
              <input type="submit" value={isNewUser ? labels.BUTTON_SAVE : labels.BUTTON_UPDATE} className='float-end btn btn-inline btn-primary mr-2' />
              <input type="button" value={labels.BUTTON_RESET} onClick={() => { reset({ ...data[0], birthDate: dateFormat(data[0].birthDate, "YYYY-MM-DD") }); }} className='float-end btn btn-inline btn-warning mr-2' />
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
