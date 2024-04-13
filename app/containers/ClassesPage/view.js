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
      // title: ``,
      iconOptions: { icon: 'x-lg',  type: 'secondary', toolTip: { title: 'Close', placement:'top'} },
      type: '',
      onClick: (event) => {
        setView('list')
      }
    },
    {
      // title: `${labels.BUTTON_EDIT}`,
      iconOptions: { icon: 'pencil',  type: 'secondary', toolTip: { title: 'Edit', placement:'top'}  },
      type: '',
      onClick: (event) => {
        onEdit(event, id, formData)
      }
    },
    {
      // title: `${labels.BUTTON_DELETE}`,
      iconOptions: { icon: 'trash3', type: 'secondary', toolTip: { title: 'Delete', placement:'top'}  },
      type: '',
      onClick: (event) => {        
        confirmDelete(event, id)
      },
    }
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
      <ToolBar title={title} mode={'View'} actionButtons={actionButtons} />
      <div className='col-md-12 p-0'>
        <Collapsiable title={`${_.capitalize(title)} Details`} body={
        <HtmlTableBuilder json={_.omit({ ...formData, teacher: _.get(formData, 'teacherId.firstName')+' '+_.get(formData, 'teacherId.lastName') }, ['id'])} cols={3} mode={'view'} />} 
        defaultCollapse={true} />
      </div>
    </div>
  );
}