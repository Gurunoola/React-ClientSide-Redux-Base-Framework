import React, { useEffect, useState } from 'react';
import AsyncDropdown from '../AsyncDropdown/Loadable';
import FormBuilder from '../../components/formBuilder';
import {
  useForm,
  ErrorMessage,
  _,
  ToolBar,
  labels,
  validationRules,
  basicValidationRules,
  Collapsiable,
  useHistory
} from './imports'
import { set } from 'lodash';

export function Edit({ showProgressBar, data, title, id, onView, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [isNewUser, setIsNewUser] = useState(false);
  const [isSaveAndNew, setIsSaveAndNew] = useState(false);
  const astrix = labels.REQUIRED_ASTRIX

  const history = useHistory();



  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {}
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

  const actionButtons = [
    {
      title: ``,
      iconOptions: { icon: 'x-lg', type: 'secondary', toolTip: { title: 'Close', placement:'top'} },
      type: '',
      onClick: (event) => {
        onView(event, id)
      }
    },{
      // title: `${labels.BUTTON_SAVE_CLOSE}`,
      iconOptions: { icon: 'floppy', asSvg: true, type: 'secondary', toolTip: { title: 'Save', placement:'top'} },
      type: '',
      onClick: (event) => {
        document.getElementById('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
      }
    },
    {
      // title: `${labels.BUTTON_RESET}`,
      iconOptions: { icon: 'arrow-repeat', type: 'secondary', toolTip: { title: 'Reset', placement:'top'} },
      type: '',
      onClick: (event) => {
        reset();

      }
    },
  ];

  if(id === 'new'){
    actionButtons.splice(2, 0, {
      //title: `${labels.BUTTON_SAVE_CONTINUE}`,
      iconOptions: { icon: 'save', type: 'secondary', toolTip: { title: 'Save & Continue', placement:'top'} },
      type: '',
      onClick: (event) => {
        setIsSaveAndNew((prev) => true)
        setTimeout(() => {
        document.getElementById('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
        }, 100);
      }
    });
}

// const fData = {
//   "studentDetails": [
//   {
//     name: 'firstName',
//     label: labels.FIRST_NAME,
//     type: 'text',
//     validation: basicValidationRules
//   },
//   {
//     name: 'lastName',
//     label: labels.LAST_NAME,
//     type: 'text',
//     validation: basicValidationRules
//   },
//   {
//     name: 'email',
//     label: labels.EMAIL,
//     type: 'email',
//     validation: { ...validationRules.required, ...validationRules.email }
//   },
//   {
//     name: 'primaryMobile',
//     label: labels.PRIMARY_MOBILE,
//     type: 'number',
//     validation: { ...validationRules.required, ...validationRules.phone }
//   },
//   {
//     name: 'secondaryMobile',
//     label: labels.SECONDARY_MOBILE,
//     type: 'number',
//     validation: { ...validationRules.phone }
//   },
//   {
//     name: 'gender',
//     label: labels.GENDER,
//     type: 'select',
//     validation: basicValidationRules,
//     async: true,
//     asyncDataType: 'gender'
//   },
//   {
//     name: 'aadhaarNumber',
//     label: labels.AADHAAR,
//     type: 'text',
//     validation: { ...validationRules.required, ...validationRules.aadhaar }
//   },
//   {
//     name: 'dob',
//     label: labels.DOB,
//     type: 'date',
//     validation: { ...validationRules.required, ...validationRules.dob }
//   },
//   {
//     name: 'bloodGroup',
//     label: labels.BLOOD_GROUP,
//     type: 'select',
//     validation: { ...validationRules.required },
//     async: true,
//     asyncDataType: 'bloodGroup'
//   },
//   {
//     name: 'class.id',
//     label: labels.CLASS,
//     type: 'select',
//     validation: { ...validationRules.required },
//     async: true,
//     asyncDataType: 'classes'
//   },
//   {
//     name: 'medicalCondition',
//     label: labels.MEDICAL_CONDITION,
//     type: 'text',
//     validation: { ...validationRules.maxLength100 }
//   }
// ],
// "addressDetails": [
//   {
//     name: 'addresses.address1',
//     label: labels.ADDRESS_1,
//     type: 'text',
//     validation: basicValidationRules
//   },
//   {
//     name: 'addresses.address2',
//     label: labels.ADDRESS_2,
//     type: 'text',
//     validation: basicValidationRules
//   },
//   {
//     name: 'addresses.city',
//     label: labels.CITY,
//     type: 'text',
//     validation: basicValidationRules
//   },
//   {
//     name: 'addresses.state',
//     label: labels.STATE,
//     type: 'text',
//     validation: basicValidationRules
//   },
//   {
//     name: 'addresses.country',
//     label: labels.COUNTRY,
//     type: 'text',
//     validation: basicValidationRules
//   },
//   {
//     name: 'addresses.pincode',
//     label: labels.PIN_CODE,
//     type: 'number',
//     validation: { ...validationRules.required, ...validationRules.pincode }
//   }
// ],
// "parentDetails1": [
//   {
//     name: 'parents[0].relationship',
//     label: labels.RELATIONSHIP,
//     type: 'select',
//     validation: basicValidationRules,
//     async: true,
//     asyncDataType: 'relationship'
//   },
//   {
//     name: 'parents[0].firstName',
//     label: labels.FIRST_NAME,
//     type: 'text',
//     validation: basicValidationRules
//   },
//   {
//     name: 'parents[0].lastName',
//     label: labels.LAST_NAME,
//     type: 'text',
//     validation: basicValidationRules
//   },
//   {
//     name: 'parents[0].email',
//     label: labels.EMAIL,
//     type: 'email',
//     validation: { ...validationRules.email }
//   },
//   {
//     name: 'parents[0].primaryMobile',
//     label: labels.PRIMARY_MOBILE,
//     type: 'number',
//     validation: { ...validationRules.required, ...validationRules.phone }
//   },
//   {
//     name: 'parents[0].officeAddress',
//     label: labels.OFFICE_ADDRESS,
//     type: 'text',
//     validation: basicValidationRules
//   },
//   {
//     name: 'parents[0].dob',
//     label: labels.DOB,
//     type: 'date',
//     validation: { ...validationRules.required }
//   },
//   {
//     name: 'parents[0].gender',
//     label: labels.GENDER,
//     type: 'select',
//     validation: basicValidationRules,
//     async: true,
//     asyncDataType: 'gender'
//   },
//   {
//     name: 'parents[0].occupation',
//     label: labels.OCCUPATION,
//     type: 'text',
//     validation: { ...validationRules.maxLength50 }
//   },
//   {
//     name: 'parents[0].designation',
//     label: labels.DESIGNATION,
//     type: 'text',
//     validation: { ...validationRules.maxLength50 }
//   },
//   {
//     name: 'parents[0].qualification',
//     label: labels.QUALIFICATION,
//     type: 'text',
//     validation: { ...validationRules.maxLength50 }
//   }
// ],
// "parentDetails2": [
//   {
//     name: 'parents[1].relationship',
//     label: labels.RELATIONSHIP,
//     type: 'select',
//     validation: basicValidationRules,
//     async: true,
//     asyncDataType: 'relationship'
//   },
//   {
//     name: 'parents[1].firstName',
//     label: labels.FIRST_NAME,
//     type: 'text',
//     validation: basicValidationRules
//   },
//   {
//     name: 'parents[1].lastName',
//     label: labels.LAST_NAME,
//     type: 'text',
//     validation: basicValidationRules
//   },
//   {
//     name: 'parents[1].email',
//     label: labels.EMAIL,
//     type: 'email',
//     validation: { ...validationRules.email }
//   },
//   {
//     name: 'parents[1].primaryMobile',
//     label: labels.PRIMARY_MOBILE,
//     type: 'number',
//     validation: { ...validationRules.required, ...validationRules.phone }
//   },
//   {
//     name: 'parents[1].officeAddress',
//     label: labels.OFFICE_ADDRESS,
//     type: 'text',
//     validation: basicValidationRules
//   },
//   {
//     name: 'parents[1].dob',
//     label: labels.DOB,
//     type: 'date',
//     validation: { ...validationRules.required }
//   },
//   {
//     name: 'parents[1].gender',
//     label: labels.GENDER,
//     type: 'select',
//     validation: basicValidationRules,
//     async: true,
//     asyncDataType: 'gender'
//   },
//   {
//     name: 'parents[1].occupation',
//     label: labels.OCCUPATION,
//     type: 'text',
//     validation: { ...validationRules.maxLength50 }
//   },
//   {
//     name: 'parents[1].designation',
//     label: labels.DESIGNATION,
//     type: 'text',
//     validation: { ...validationRules.maxLength50 }
//   },
//   {
//     name: 'parents[1].qualification',
//     label: labels.QUALIFICATION,
//     type: 'text',
//     validation: { ...validationRules.maxLength50 }
//   }
// ]
// }
// function handleFormSubmit(data){
//   showProgressBar(true); onSubmit(data, isNewUser, isSaveAndNew)
// }
// function getForm2() {
//   return <div className='bg-white'>
//     <FormBuilder 
//       cols={3}  
//       id={'form'}
//       data={fData}
//       defaultValues={formData}
//       onSubmit={handleFormSubmit}
//     /></div>
// }

  function getForm() {
    return <>
      <form id='form' onSubmit={handleSubmit((data) => { onSubmit(data, isNewUser, isSaveAndNew) })}>
        <h5 className='pl-3 pt-3 pb-3 border-bottom'>{_.capitalize(title)} Details</h5>
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
              <select className='form-control' {...register("gender", basicValidationRules)}>
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
              <input type='date' className='form-control' {...register("dob", { ...validationRules.required, ...validationRules.dob })} />
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
              <label>{labels.CLASS}</label>
              <select className='form-control' {...register("class.id", { ...validationRules.required })}>
                <AsyncDropdown dataType={'classes'} value={_.get(formData, 'class.id')} />
              </select>
              <ErrorMessage errors={errors} name="class.id" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.MEDICAL_CONDITION}</label>
              <input type='text' className='form-control' {...register("medicalCondition", { ...validationRules.maxLength100 })} />
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
              <input type='text' className='form-control'  {...register("addresses.pincode", { ...validationRules.required, ...validationRules.pincode })} />
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
              <div className='col-md-4 mb-4'>§
                <label>{labels.LAST_NAME}</label>
                <input type='text' className='form-control' {...register("parents[0].lastName", basicValidationRules)} />
                <ErrorMessage errors={errors} name="parents[0].lastName" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.EMAIL}</label>
                <input type='text' className='form-control' {...register("parents[0].email", { ...validationRules.email })} />
                <ErrorMessage errors={errors} name="parents[0].email" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4 mb-4'>
                <label>{labels.PRIMARY_MOBILE}</label>
                <input type='tel' className='form-control' {...register("parents[0].primaryMobile", { ...validationRules.required, ...validationRules.phone })} />
                <ErrorMessage errors={errors} name="parents[0].primaryMobile" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.OFFICE_ADDRESS}</label>
                <input type='text' className='form-control' {...register("parents[0].officeAddress", basicValidationRules)} />
                <ErrorMessage errors={errors} name="parents[0].officeAddress" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.DOB}</label>
                <input type='date' className='form-control' {...register("parents[0].dob", { ...validationRules.required })} />
                <ErrorMessage errors={errors} name="parents[0].dob" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4 mb-4'>
                <label>{labels.OCCUPATION}</label>
                <input type='text' className='form-control' {...register("parents[0].occupation", { ...validationRules.maxLength50 })} />
                <ErrorMessage errors={errors} name="parents[0].occupation" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.DESIGNATION}</label>
                <input type='text' className='form-control' {...register("parents[0].designation", { ...validationRules.maxLength50 })} />
                <ErrorMessage errors={errors} name="parents[0].designation" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.QUALIFICATION}</label>
                <input type='text' className='form-control' {...register("parents[0].qualification", { ...validationRules.maxLength50 })} />
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
                <input type='text' className='form-control' {...register("parents[1].email", { ...validationRules.email })} />
                <ErrorMessage errors={errors} name="parents[1].email" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4 mb-4'>
                <label>{labels.PRIMARY_MOBILE}</label>
                <input type='tel' className='form-control' {...register("parents[1].primaryMobile", { ...validationRules.required, ...validationRules.phone })} />
                <ErrorMessage errors={errors} name="parents[1].primaryMobile" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.OFFICE_ADDRESS}</label>
                <input type='text' className='form-control' {...register("parents[1].officeAddress", basicValidationRules)} />
                <ErrorMessage errors={errors} name="parents[1].officeAddress" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.DOB}</label>
                <input type='date' className='form-control' {...register("parents[1].dob", { ...validationRules.required })} />
                <ErrorMessage errors={errors} name="parents[1].dob" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4 mb-4'>
                <label>{labels.OCCUPATION}</label>
                <input type='text' className='form-control' {...register("parents[1].occupation", { ...validationRules.maxLength50 })} />
                <ErrorMessage errors={errors} name="parents[1].occupation" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.DESIGNATION}</label>
                <input type='text' className='form-control' {...register("parents[1].designation", { ...validationRules.maxLength50 })} />
                <ErrorMessage errors={errors} name="parents[1].designation" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
              <div className='col-md-4 mb-4'>
                <label>{labels.QUALIFICATION}</label>
                <input type='text' className='form-control' {...register("parents[1].qualification", { ...validationRules.maxLength50 })} />
                <ErrorMessage errors={errors} name="parents[1].qualification" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4 mb-4'>
                <label>{labels.GENDER}</label>
                <select className='form-control' {...register("parents[1].gender", basicValidationRules)}>
                  <AsyncDropdown dataType={'gender'} value={_.get(formData, 'parents[1].gender')} />
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

        {/* <div className='row p-4'>
          <div className='d-flex w-100 justify-content-end'>
            <input type="submit" value={isNewUser ? labels.BUTTON_SAVE : labels.BUTTON_UPDATE} className='float-end btn btn-inline btn-primary mr-2' />
            <input type="button" value={labels.BUTTON_RESET} onClick={() => { reset(); }} className='float-end btn btn-inline btn-warning mr-2' />
          </div>
        </div> */}
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
        {Object.keys(formData).length > 0 && getForm(formData)}
        {isNewUser && getForm()}
      </div>
    </div>
  );
}
