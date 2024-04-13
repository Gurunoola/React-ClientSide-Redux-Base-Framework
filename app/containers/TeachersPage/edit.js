import React, { useEffect, useState } from 'react';
import AsyncDropdown from '../AsyncDropdown/Loadable';
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
  const formId = 'formClass';


  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {}});
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
        document.getElementById(formId).dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
      }
    },
    {
      // title: `${labels.BUTTON_RESET}`,
      iconOptions: { icon: 'arrow-repeat', type: 'secondary', toolTip: { title: 'Reset', placement:'top'} },
      type: '',
      onClick: (event) => {
        reset()
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
        document.getElementById(formId).dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
        }, 100);
      }
    });
}

  function getForm() {
    return <>
      <form id={formId} onSubmit={handleSubmit((data) => { showProgressBar(true); onSubmit(data, isNewUser, isSaveAndNew) })}>
        <h5 className='pl-3 pt-3 pb-3 border-bottom'>{_.capitalize(title)} Details</h5>
        <div className='bg-light p-3'>
        <div className="row">
          <div className='col-md-4 mb-4'>
            <label>{labels.CLASS}</label>
            <input type='text' className='form-control' {...register("name", {...validationRules.required, ...validationRules.maxLength50})} />
            <ErrorMessage errors={errors} name="name" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
          </div>
          <div className='col-md-4 mb-4'>
            <label>{labels.SECTION}</label>
            <input type='text' className='form-control' {...register("section", {...validationRules.required, ...validationRules.maxLength50})} />
            <ErrorMessage errors={errors} name="section" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
          </div>
          <div className='col-md-4 mb-4'>
            <label>{labels.SELECT_TEACHER}</label>
            <select className='form-control' {...register("teacherId.id", { ...validationRules.required })}>
                <AsyncDropdown dataType={'teachers'} value={_.get(formData, 'teacherId.id')} />
              </select>
            <ErrorMessage errors={errors} name="teacherId.id" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />              </div>
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
        {Object.keys(formData).length > 0 && getForm(formData)}
        {isNewUser && addNewForm()}
      </div>
    </div>
  );
}
