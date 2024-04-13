import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import ToolBar from './toolBar';
import { Card, Icon } from '../../components';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import { labels, validationRules, basicValidationRules } from '../ConstantManager';
import AsyncDropdown from '../AsyncDropdown/Loadable';
import { useHistory } from 'react-router-dom';

export default function Edit({ showProgressBar, props, data, title, id, onEdit, confirmDelete, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [isNewUser, setIsNewUser] = useState(false);


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

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
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

  function getForm(formData) {
    console.log(formData)
    return <Card body={
      <>
        <form onSubmit={handleSubmit((data) => { showProgressBar(true); onSubmit(data, isNewUser) })}>
          <h5 className='pt-3 pb-3 border-bottom'>{_.capitalize(title)} Details</h5>
          <div className='bg-light p-3'>
            <div className="row">
              <div className='col-md-4 mb-4'>
                <label>{labels.EXAM_NAME}</label>
                <input type='text' className='form-control' {...register("name", basicValidationRules)} />
                <ErrorMessage errors={errors} name="name" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.DATE}</label>
                <input type='date' className='form-control' {...register("date", {...validationRules.required})} />
                <ErrorMessage errors={errors} name="date" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.TIME_FROM}</label>
                <input type='time' className='form-control' {...register("timeFrom", {...validationRules.required})} />
                <ErrorMessage errors={errors} name="timeFrom" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>


            </div>
            <div className='row'>
            <div className='col-md-4 mb-4'>
                <label>{labels.TIME_TO}</label>
                <input type='time' className='form-control' {...register("timeTo", {...validationRules.required})} />
                <ErrorMessage errors={errors} name="timeTo" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.SUBJECT}</label>
                <select className='form-control' {...register("subject.id", {...validationRules.required})} >
                  <AsyncDropdown dataType={'subjects'} />
                </select>
                <ErrorMessage errors={errors} name="subject.id" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.CLASS}</label>
                <select className='form-control' {...register("classes.id", {...validationRules.required})} >
                  <AsyncDropdown dataType={'classes'} />
                </select>
                <ErrorMessage errors={errors} name="classes.id" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
            </div>
          </div>
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
