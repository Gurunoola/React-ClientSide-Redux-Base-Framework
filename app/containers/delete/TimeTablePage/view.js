import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import ToolBar from './toolBar';
import { Icon, HtmlTableBuilder } from '../../components';
import { dateFormat } from '../../helpers/utils';
import { labels } from '../ConstantManager';
import ClassView from '../ClassesPage/view';


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
    if (id) getAttendance(id)
  }, [])

  return (
    <div className="">
      <ToolBar title={title} mode={'View'} actionButtons={actionButtons} />
      <div className="pageContent shadow-sm-up bg-white ">
        <div className="row">
          
          <div className="col-lg-12 p-0 ">
            
          <h5 className='pl-5 p-3 border-bottom bg-custom-gray'>{_.capitalize(title)} Details</h5>
          <HtmlTableBuilder json={_.omit({...formData }, ['firstName', 'lastName', 'primaryMobile', 'id', 'middleName','parents','addresses'])} cols={3} mode={'view'}  />
        
         </div>
         
        </div>
      </div>
    </div>
  );
}