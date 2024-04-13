import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import ToolBar from './toolBar';
import { Collapsiable } from '../../components';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import { labels, validationRules, basicValidationRules } from '../ConstantManager';
import AsyncDropdown from '../AsyncDropdown/Loadable';
import { useHistory } from 'react-router-dom';

export default function Edit({ showProgressBar, props, data, title, id, onView, onEdit, confirmDelete, onSubmit }) {
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
      title: `${labels.BUTTON_CANCEL}`,
      iconOptions: { icon: 'x', type: 'white' },
      type: 'gray',
      //path: `/students/edit/${id}`,
      onClick: (event) => {
        onView(event, id)
      }
    },
  ];

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues:  {
      "parents": [
          {
              "firstName": "Gurusharan",
              "lastName": "Noola",
              "email": "gurusharannoola@gmail.com",
              "primaryMobile": "9740431433",
              "officeAddress": "#902, North Block,",
              "dob": "2024-04-10",
              "occupation": "123",
              "designation": "123",
              "qualification": "Qualification",
              "gender": "male",
              "relationship": "mother",
              
          },
          {
              "firstName": "Gurusharan",
              "lastName": "Noola",
              "email": "gurusharannoola@gmail.com",
              "primaryMobile": "9740431433",
              "officeAddress": "#902, North Block,",
              "dob": "2024-04-16",
              "occupation": "asd",
              "designation": "asd",
              "qualification": "Qualification",
              "gender": "female",
              "relationship": "mother",
              
          }
      ],
      "firstName": "Gurusharan",
      "lastName": "Noola",
      "email": "rrr@gmail.com",
      "primaryMobile": "9740431433",
      "secondaryMobile": "9740431433",
      "gender": "male",
      "aadhaarNumber": "3213 1234 1234",
      "dob": "2019-06-02",
      "bloodGroup": "A+",
      "class": {
          "name": "4",
          "section": "A",
          "teacherId": "65f46d4fce9386aa386f4089",
          
      },
      "medicalCondition": "na",
      "addresses": {
          "address1": "#902, North Block,",
          "address2": "Vidhya Nagar Layout, Thanisandra",
          "city": "Bangalore",
          "state": "Karnataka",
          "country": "India",
          "pincode": "560077",
          
      },
      
  }
  });
  useEffect(() => {
    if (id && id !== 'new') {
      if (data) {
        setFormData(data)
        setTimeout(() => {
          reset({ ...data });
          showProgressBar(false)
        }, 100);          
      } else {
        history.goBack();
      }
    } else {
      showProgressBar(false)
      setIsNewUser(true);
    }
  }, [])

  function getForm() {
    return  <>
    <form onSubmit={handleSubmit((data) => { showProgressBar(true); onSubmit(data, isNewUser) })}>
    <h5 className='pl-3 pt-3 pb-3 border-top border-bottom'>{_.capitalize(title)} Details</h5>
      <div className='bg-white p-3'>
        <div className="row">
          <div className='col-md-4 mb-4'>
            <label>{labels.FIRST_NAME}{astrix}</label>
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
            <input type='text' className='form-control' {...register("email", {...validationRules.required, ...validationRules.email})} />
            <ErrorMessage errors={errors} name="email" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
          </div>
        </div>
        <div className="row">
          <div className='col-md-4 mb-4'>
            <label>{labels.PRIMARY_MOBILE}</label>
            <input type='tel' className='form-control' {...register("primaryMobile", {...validationRules.required, ...validationRules.phone})} />
            <ErrorMessage errors={errors} name="primaryMobile" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
          </div>
          <div className='col-md-4 mb-4'>
            <label>{labels.SECONDARY_MOBILE}</label>
            <input type='tel' className='form-control' {...register("secondaryMobile", {...validationRules.phone})} />
            <ErrorMessage errors={errors} name="secondaryMobile" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
          </div>

          <div className='col-md-4 mb-4'>
            <label>{labels.GENDER}</label>
            <select className='form-control' {...register("gender", basicValidationRules)}>
              <AsyncDropdown dataType={'gender'} />
            </select>
            <ErrorMessage errors={errors} name="gender" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
          </div>
        </div>
        <div className="row">
          <div className='col-md-4 mb-4'>
            <label>{labels.AADHAAR}</label>
            <input type='text' className='form-control' {...register("aadhaarNumber", {...validationRules.required, ...validationRules.aadhaar})} />
            <ErrorMessage errors={errors} name="aadhaarNumber" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
          </div>
          <div className='col-md-4 mb-4'>
            <label>{labels.DOB}</label>
            <input type='date' className='form-control' {...register("dob", {...validationRules.required, ...validationRules.dob})} />
            <ErrorMessage errors={errors} name="dob" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
          </div>
          <div className='col-md-4 mb-4'>
            <label>{labels.BLOOD_GROUP}</label>
            <select className='form-control' {...register("bloodGroup", {...validationRules.required})}>
            <AsyncDropdown dataType={'bloodGroup'} />
            </select>
            <ErrorMessage errors={errors} name="bloodGroup" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
          </div>
        </div>
        <div className="row">
          <div className='col-md-4 mb-4'>
            <label>{labels.CLASS}</label>
            <select className='form-control' {...register("class.id", {...validationRules.required})}>
              <AsyncDropdown dataType={'classes'} value={_.get(formData, 'class.id')} />
            </select>
            <ErrorMessage errors={errors} name="class.id" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
          </div>
          <div className='col-md-4 mb-4'>
            <label>{labels.MEDICAL_CONDITION}</label>
            <input type='text' className='form-control' {...register("medicalCondition", {...validationRules.maxLength100})} />
            <ErrorMessage errors={errors} name="medicalCondition" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
          </div>
        </div>
      </div>
      <Collapsiable title={'Address Details'} body={<div className='bg-white p-3'>
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
            <input type='text' className='form-control'  {...register("addresses.pincode", {...validationRules.required, ...validationRules.pincode})} />
            <ErrorMessage errors={errors} name="addresses.pincode" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
          </div>
        </div>
      </div>} defaultCollapse={false} />

      <Collapsiable title={'Parents Details'} body={<><p className='bg-custom-gray p-3 m-0'>
        <strong>{_.chain(formData).get('parents[0].relationship').capitalize().value()}</strong>
      </p>
        <div className='bg-white p-3'>
          <div className='row'>
            <div className='col-md-4 mb-4'>
              <label>{labels.FIRST_NAME}</label>
              <input type='text' className='form-control' {...register("parents[0].firstName", basicValidationRules)} />
              <ErrorMessage errors={errors} name="parents[0].firstName" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.LAST_NAME}</label>
              <input type='text' className='form-control' {...register("parents[0].lastName", basicValidationRules)} />
              <ErrorMessage errors={errors} name="parents[0].lastName" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.EMAIL}</label>
              <input type='text' className='form-control' {...register("parents[0].email", { ...validationRules.email})} />
              <ErrorMessage errors={errors} name="parents[0].email" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 mb-4'>
              <label>{labels.PRIMARY_MOBILE}</label>
              <input type='tel' className='form-control' {...register("parents[0].primaryMobile", {...validationRules.required, ...validationRules.phone})} />
              <ErrorMessage errors={errors} name="parents[0].primaryMobile" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.OFFICE_ADDRESS}</label>
              <input type='text' className='form-control' {...register("parents[0].officeAddress", basicValidationRules)} />
              <ErrorMessage errors={errors} name="parents[0].officeAddress" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.DOB}</label>
              <input type='date' className='form-control' {...register("parents[0].dob", {...validationRules.required})} />
              <ErrorMessage errors={errors} name="parents[0].dob" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 mb-4'>
              <label>{labels.OCCUPATION}</label>
              <input type='text' className='form-control' {...register("parents[0].occupation", {...validationRules.maxLength50})} />
              <ErrorMessage errors={errors} name="parents[0].occupation" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.DESIGNATION}</label>
              <input type='text' className='form-control' {...register("parents[0].designation", {...validationRules.maxLength50})} />
              <ErrorMessage errors={errors} name="parents[0].designation" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.QUALIFICATION}</label>
              <input type='text' className='form-control' {...register("parents[0].qualification", {...validationRules.maxLength50})} />
              <ErrorMessage errors={errors} name="parents[0].qualification" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 mb-4'>
              <label>{labels.GENDER}</label>
              <select className='form-control' {...register("parents[0].gender", basicValidationRules)}>
                <AsyncDropdown dataType={'gender'} value={_.get(formData, 'parents[0].gender')} />
              </select>
              <ErrorMessage errors={errors} name="parents[0].gender" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.RELATIONSHIP}</label>
              <select className='form-control' {...register("parents[0].relationship", basicValidationRules)}>
                <AsyncDropdown dataType={'relationship'} value={_.get(formData, 'parents[0].relationship')} />
              </select>
              <ErrorMessage errors={errors} name="parents[0].relationship" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
          </div>
        </div>
        <p className='bg-custom-gray p-3 m-0'>
          <strong>{_.chain(formData).get('parents[1].relationship').capitalize().value()}</strong>
        </p>
        <div className='bg-white p-3'>
          <div className='row'>
            <div className='col-md-4 mb-4'>
              <label>{labels.FIRST_NAME}</label>
              <input type='text' className='form-control' {...register("parents[1].firstName", basicValidationRules)} />
              <ErrorMessage errors={errors} name="parents[1].firstName" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.LAST_NAME}</label>
              <input type='text' className='form-control' {...register("parents[1].lastName", basicValidationRules)} />
              <ErrorMessage errors={errors} name="parents[1].lastName" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.EMAIL}</label>
              <input type='text' className='form-control' {...register("parents[1].email", { ...validationRules.email})} />
              <ErrorMessage errors={errors} name="parents[1].email" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 mb-4'>
              <label>{labels.PRIMARY_MOBILE}</label>
              <input type='tel' className='form-control' {...register("parents[1].primaryMobile", {...validationRules.required, ...validationRules.phone})} />
              <ErrorMessage errors={errors} name="parents[1].primaryMobile" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.OFFICE_ADDRESS}</label>
              <input type='text' className='form-control' {...register("parents[1].officeAddress", basicValidationRules)} />
              <ErrorMessage errors={errors} name="parents[1].officeAddress" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.DOB}</label>
              <input type='date' className='form-control' {...register("parents[1].dob", {...validationRules.required})} />
              <ErrorMessage errors={errors} name="parents[1].dob" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 mb-4'>
              <label>{labels.OCCUPATION}</label>
              <input type='text' className='form-control' {...register("parents[1].occupation", {...validationRules.maxLength50})} />
              <ErrorMessage errors={errors} name="parents[1].occupation" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.DESIGNATION}</label>
              <input type='text' className='form-control' {...register("parents[1].designation", {...validationRules.maxLength50})} />
              <ErrorMessage errors={errors} name="parents[1].designation" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.QUALIFICATION}</label>
              <input type='text' className='form-control' {...register("parents[1].qualification", {...validationRules.maxLength50})} />
              <ErrorMessage errors={errors} name="parents[1].qualification" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 mb-4'>
              <label>{labels.GENDER}</label>
              <select className='form-control' {...register("parents[1].gender", basicValidationRules)}>
                <AsyncDropdown dataType={'gender'} value={ _.get(formData, 'parents[1].gender')} />
              </select>
              <ErrorMessage errors={errors} name="parents[1].gender" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.RELATIONSHIP}</label>
              <select className='form-control' {...register("parents[1].relationship", basicValidationRules)}>
                <AsyncDropdown dataType={'relationship'} value={_.get(formData, 'parents[1].relationship')} />
              </select>
              <ErrorMessage errors={errors} name="parents[1].relationship" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
          </div>
        </div></>} defaultCollapse={false} />

      <div className='row p-4'>
        <div className='d-flex w-100 justify-content-end'>
          <input type="submit" value={isNewUser ? labels.BUTTON_SAVE : labels.BUTTON_UPDATE} className='float-end btn btn-inline btn-primary mr-2' />
          <input type="button" value={labels.BUTTON_RESET} onClick={() => { reset({ ...data[0] }); }} className='float-end btn btn-inline btn-warning mr-2' />
          {/* <input type="button" value={labels.BUTTON_BACK} onClick={history.goBack} className='float-end btn btn-inline btn-secondary' /> */}
        </div>
      </div>
    </form>
  </>
  }

  const addNewForm = () => {
    return getForm([])
  }
  return (
    <div className="">
      <ToolBar title={title} mode={'Edit'} actionButtons={actionButtons} />
      <div className="pageContent bg-white ">
        {Object.keys(formData).length > 0 ? getForm(formData) : undefined}
        {isNewUser ? addNewForm() : undefined}
      </div>
    </div>
  );
}
