import React, { useEffect, useState } from 'react';
import { 
    _,
    ToolBar,
    get,labels,
    toastMessages,Icon,
    HtmlTableBuilder,
    Collapsiable, 
    isBirthday
  } from './imports'

export function View({ setView, props, title, id, onEdit, confirmDelete }) {
  const [formData, setFormData] = useState({});
  const {
    toastError,
  } = props.sagaMethods;

  const actionButtons = [
    {
      iconOptions: { icon: 'pencil',  type: 'secondary', toolTip: { title: 'Edit', placement:'top'}  },
      type: '',
      onClick: (event) => {
        onEdit(event, id, formData)
      }
    },
    {
      iconOptions: { icon: 'trash3', type: 'secondary', toolTip: { title: 'Delete', placement:'top'}  },
      type: '',
      onClick: (event) => {        
        confirmDelete(event, id)
      }
    },
    {
      iconOptions: { icon: 'x-lg',  type: 'secondary', toolTip: { title: 'Close', placement:'top'} },
      type: '',
      onClick: (event) => {
        setView('list')
      }
    },
  ];

  useEffect(() => {
    const fetchDataById = async (id) => {
      const { response, error } = await get(id)
      if (response && response.data) {
        setFormData(response.data)
      } else {
        toastError(toastMessages.ERROR + ': ' + error.message)
      }
    }

    if (id && id !== 'new') {
      fetchDataById(id)
    }
  }, [id])

  return (
    <div className=''>
      <ToolBar title='/' mode={'View'} actionButtons={actionButtons} />
      <div className='col-md-12 p-4 bg-white text-center text-md-left text-lg-left '>
        <div className='row m-0 p-0'>
          <div className='col-md-2'>
            <svg width="100" height="100" >
              <circle cx="50" cy="50" r="50" className='bg-primary' />
              <text x="50%" y="50%" alignment-baseline="central" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#fff">
                {`${formData.firstName && _.upperCase(formData.firstName[0])}${formData.lastName && _.upperCase(formData.lastName[0])}`}
              </text>
            </svg>
          </div>
          <div className='col-md-5'>
            <h3 className='pl-3 text-primary text-capitalize mt-2'>{_.capitalize(formData.firstName)} {_.capitalize(formData.lastName)}</h3>
            <div className='row m-0 p-0'>
              <div className='col'><Icon toolTip={{title: labels.PRIMARY_MOBILE, placement: 'top'}} circular icon={'telephone'} size='32px' type={'primary'} /> {formData.primaryMobile}</div>
            </div>
          </div>
          <div className='col-md-5'>
            <div className='col p-1'><Icon toolTip={{title: labels.CLASS, placement: 'left'}} icon={'easel'} size='14px' type={'primary'}/> {_.upperCase(formData && formData.class && formData.class.name + formData.class.section)}</div>
            <div className='col p-1'><Icon toolTip={{title: labels.DOB, placement: 'left'}} asSvg='true' icon={'cake'} size='16' type={'primary'}/> {formData.dob}  &nbsp;  
            {
              isBirthday(formData.dob) && 
             <span class="badge bg-success text-white">Today</span>
            }
            </div>
            <div className='col p-1'><Icon toolTip={{title: labels.GENDER, placement: 'left'}} icon={'gender-ambiguous'} size='14px' type={'primary'}/> {_.capitalize(formData.gender)}</div>
          </div>
        </div>
      </div>
      <div className='col-md-12 p-0'>
        <Collapsiable title={`${_.capitalize(title)} Details`} body={<HtmlTableBuilder json={_.omit({ ...formData }, ['firstName', 'lastName', 'primaryMobile', 'id', 'middleName', 'parents', 'addresses', 'gender', 'dob'])} cols={3} mode={'view'} />} defaultCollapse={true} />
      </div>
      <div className='col p-0 '>
        <Collapsiable title={'Address Details'} body={
          <HtmlTableBuilder json={{ ...formData.addresses }} cols={3} mode={'view'} />
        } defaultCollapse={true} />
        <Collapsiable title={'Parent Details'} body={
          <div>
             <p className='p-3 bg-custom-gray'><strong>{_.chain(formData).get('parents[0].relationship').capitalize().value()}</strong></p>
            {
              formData.parents && formData.parents.length > 0 && <HtmlTableBuilder json={_.omit({ ...formData.parents[0] }, ['id'])} cols={3} mode={'view'} />
            }
            <p className='p-3 bg-custom-gray'><strong>{_.chain(formData).get('parents[1].relationship').capitalize().value()}</strong></p>
            {
              formData.parents && formData.parents.length > 0 && <HtmlTableBuilder json={_.omit({ ...formData.parents[1] }, ['id'])} cols={3} mode={'view'} />
            }
          </div>} defaultCollapse={true} />
      </div>
    </div>
  );
}