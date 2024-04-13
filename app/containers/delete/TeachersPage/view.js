import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import ToolBar from './toolBar';
import { Icon, HtmlTableBuilder } from '../../components';
import { dateFormat } from '../../helpers/utils';
import { labels } from '../ConstantManager';


export default function View({ showProgressBar, componentName, props, data, title, id, onEdit, confirmDelete }) {
  const [formData, setFormData] = useState({});
  const [showParentDiv, setShowParentDiv] = useState(true)
  const [showAddressDiv, setShowAddressDiv] = useState(true)
  const {
    getAttendance,
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
      path: `/${componentName}/edit/${id}`
    },
    {
      title: `${labels.BUTTON_DELETE}`,
      iconOptions: { icon: 'trash3' },
      type: 'danger',
      path: `/${componentName}/view/${id}`,
      onClick: (event) => {
        showProgressBar(true)
        confirmDelete(event, id)
      },
    }
  ];
  useEffect(() => {
    if (id) {
      if (data.length > 0) {
        setFormData(data[0])
      }
    }
  }, [data])

  useEffect(() => {
    if (id) { getAttendance(id);  showProgressBar(false) }
  }, [])

  return (
    <div className="">
      <ToolBar title={title} mode={'View'} actionButtons={actionButtons} />
      <div className="pageContent shadow-sm-up bg-white ">
        <div className="row">
          
          <div className="col-lg-12 p-0 ">
            <div className='row'>
          <div className="col col-lg-3 border-right border-bottom">
            <div className='profile-card'>
              <div className='col text-center'>
                <svg width="100" height="100" >
                  <circle cx="50" cy="50" r="50" className='bg-primary' />
                  <text x="50%" y="50%" alignment-baseline="central" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#fff">
                    {`${formData.firstName && _.upperCase(formData.firstName[0])}${formData.lastName && _.upperCase(formData.lastName[0])}`}
                  </text>
                </svg>
                {/* <img src='https://www.shutterstock.com/image-photo/portrait-cute-kid-boy-four-600nw-193469117.jpg' className='rounded-circle profileImage' /> */}
                <h4 className='text-primary text-capitalize mt-2'>{_.capitalize(formData.firstName)} {_.capitalize(formData.lastName)}</h4>
                <p><Icon circular={true} size='12px' type='info' icon={'telephone-fill'} /> {formData.primaryMobile}</p>
              </div>
            </div>
          </div>
            <div className='col-lg-9 p-0'>
          <h5 className='pl-5 p-3 border-bottom bg-custom-gray'>{_.capitalize(title)} Details</h5>
          <HtmlTableBuilder json={_.omit({...formData }, ['firstName', 'lastName', 'primaryMobile', 'id', 'middleName','parents','addresses'])} cols={3} mode={'view'}  />
         </div>
         </div>
         </div>
          <div className='col-lg-12 p-0 '>
          <h5 className='cursorPointer pl-5 p-3 border-bottom bg-custom-gray' onClick={()=>{setShowAddressDiv(!showAddressDiv)}}> <Icon icon={ showAddressDiv ? 'caret-up-square' : 'caret-down-square'} size='12px' /> Address Details </h5>
          {showAddressDiv ? <div>
          {
            formData.addresses && <HtmlTableBuilder json={{...formData.addresses}} cols={3} mode={'view'}  />  
          }
          </div> : undefined }
          </div>
          
        </div>
      </div>
    </div>
  );
}