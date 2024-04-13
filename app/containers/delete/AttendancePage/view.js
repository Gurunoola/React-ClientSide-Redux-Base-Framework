import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import ToolBar from './toolBar';
import { Icon } from '../../components';
import { dateFormat } from '../../helpers/utils';
import { labels } from '../ConstantManager';


export default function View({ showProgressBar, props, data, title, id, onEdit, confirmDelete }) {
  const [formData, setFormData] = useState({});
  const {
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo
  } = props.sagaMethods;

  const actionButtons = [
    {
      title: `${labels.BUTTON_EDIT}`,
      iconOptions: { icon: 'pencil-square' },
      type: 'primary',
      path: `/students/edit/${id}`
    },
    {
      title: `${labels.BUTTON_DELETE}`,
      iconOptions: { icon: 'trash3' },
      type: 'danger',
      path: `/students/view/${id}`,
      onClick: (event) => {
        showProgressBar(true)
        confirmDelete(event, id)
      },
    }
  ];
  useEffect(() => {
    if (id) {
      if (data.length > 0)
        setFormData(data[0])
    }
  }, [data])

  return (
    <div className="">
      <ToolBar title={title} mode={'View'} actionButtons={actionButtons} />
      <div className="pageContent shadow-sm-up bg-white ">
        <div className="row">
          <div className="col col-lg-3 border-right border-bottom">
            <div className='profile-card'>
              <div className='col text-center'>
                {formData.gender === 'Male' ? <img className="rounded-circle mb-3" src={`${require("../../img/profile_male.svg")}`} style={{ width: '100px' }} /> : undefined}
                {formData.gender === 'Female' ? <img className="rounded-circle mb-3" src={`${require("../../img/profile_female.svg")}`} style={{ width: '100px' }} /> : undefined}
                <h4 className='text-primary text-capitalize'>{formData.firstName} {formData.lastName}</h4>
                <p><Icon circular={true} size='12px' type='info' icon={'telephone-fill'} /> {formData.contactNumber}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-9 p-0 profile-card">
            <table width="100%" height="100%" style={{ minHeight: '200px' }}>
              <tr>
                <td className='border-bottom p-3 pl-5 text-primary' style={{ width: '50%' }}>
                  <label className='text-gray-500'>{labels.EMAIL} :</label> <br /> {formData.email}
                </td>
                <td className='border-bottom p-3 pl-5'>
                  <label className='text-gray-500'>{labels.DOB} :</label> <br />  {(formData.birthDate) ? dateFormat(formData.birthDate, "YYYY-MM-DD") : ''}</td>
              </tr>
              <tr>
                <td className='border-bottom p-3 pl-5'>
                  <label className='text-gray-500'>{labels.ACC_YEAR} :</label> <br />  {formData.accYear}</td>
                <td className='border-bottom p-3 pl-5'>
                  <label className='text-gray-500'>{labels.CLASS} :</label> <br />  {formData.className}</td>
              </tr>
              <tr>
                <td className='border-bottom p-3 pl-5'>
                  <label className='text-gray-500'>{labels.ROLE} :</label> <br />  {formData.roleName}</td>
                <td className='border-bottom p-3 pl-5'>
                  <label className='text-gray-500'>{labels.ACTIVE} :</label> <br />
                  {formData.isActive ? <Icon size='32px' icon="toggle-on" type='success' /> : <Icon size='32px' icon="toggle-off" type='gray' />}</td>
              </tr>
              <tr>
                <td colSpan={2} className='border-bottom p-3 pl-5'>
                  <label className='text-gray-500'>{labels.ADDRESS} :</label> <br />  {formData.address}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
