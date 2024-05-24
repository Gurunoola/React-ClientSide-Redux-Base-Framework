import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import ToolBar from './toolBar';
import { Icon, HtmlTableBuilder, Collapsiable } from '../../components';
import { labels, toastMessages } from '../ConstantManager';
import { get } from './services';

export default function View({ showProgressBar, setView, props, title, id, onEdit, confirmDelete }) {
  const [formData, setFormData] = useState({});
  const {
    getAttendance,
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo
  } = props.sagaMethods;

  const defaultActionButtonIconOptions = { type: 'white' }

  const actionButtons = [
    {
      title: ``,
      iconOptions: { icon: 'x', ...defaultActionButtonIconOptions  },
      type: 'gray',
      onClick: (event) => {
        setView('list')
      }
    },
    {
      title: `${labels.BUTTON_EDIT}`,
      iconOptions: { icon: 'pencil-square', ...defaultActionButtonIconOptions  },
      type: 'primary',
      onClick: (event) => {
        onEdit(event, id, formData)
      }
    },
    {
      title: `${labels.BUTTON_DELETE}`,
      iconOptions: { icon: 'trash3', ...defaultActionButtonIconOptions  },
      type: 'danger',
      onClick: (event) => {
        
        confirmDelete(event, id)
      },
    }
  ];

  useEffect(() => {
    const fetchStudent = async (id) => {
      const { response, error } = await get(id)
      if (response && response.data) {
        setFormData(response.data)
      } else {

        toastError(toastMessages.ERROR + ': ' + error.message)
      }
    }

    if (id && id !== 'new') {
      fetchStudent(id)
    }
  }, [id])

  return (
    <div className=''>
      <ToolBar title={title} mode={'View'} actionButtons={actionButtons} />

      <div className='border-top w-100'></div>
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
              <div className='col'><Icon circular icon={'telephone'} size='32px' type={'primary'} /> {formData.primaryMobile}</div>
            </div>

          </div>
          <div className='col-md-5'>
            <div className='col p-1'><Icon icon={'easel'} size='14px' type={'primary'}/> {_.upperCase(formData && formData.class && formData.class.name + formData.class.section)}</div>
            <div className='col p-1'><Icon asSvg='true' icon={'cake'} size='16' type={'primary'}/> {formData.dob} 
            {
              new Date(formData.dob).toDateString() === new Date().toDateString() && 
              <span class="badge bg-success text-white">Today</span>
            }
            </div>
            <div className='col p-1'><Icon icon={'gender-ambiguous'} size='14px' type={'primary'}/> {_.capitalize(formData.gender)}</div>
          </div>
        </div>
      </div>
      <div className='col-md-12 p-0'>
        <Collapsiable title={`${_.capitalize(title)} Details`} body={<HtmlTableBuilder json={_.omit({ ...formData }, ['firstName', 'lastName', 'primaryMobile', 'id', 'middleName', 'parents', 'addresses', 'gender', 'dob'])} cols={3} mode={'view'} />} defaultCollapse={true} />
      </div>
      <div className='col p-0 '>
        <Collapsiable title={'Address Details'} body={
          <HtmlTableBuilder json={{ ...formData.addresses }} cols={3} mode={'view'} />
        } defaultCollapse={false} />
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
          </div>} defaultCollapse={false} />


      </div>


    </div>
  );
}