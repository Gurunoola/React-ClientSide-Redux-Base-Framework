import React, { Component, useEffect, useState } from 'react'
import Icon from './icon'
function Collapsiable({body, title, defaultCollapsed = false}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const id = Math.random().toString(36).substring(2);
  return (
    <div className="card border-0 collapsiable">
      <div className="card-header rounded-0 cursorPointer" id="headingOne" onClick={() => setCollapsed(!collapsed)}>
        <button type='button' className="btn btn-block text-left mb-0">
        <Icon icon={collapsed ? 'plus-lg' : 'chevron-up'} size='14px' className='mr-2 align-middle' /> 
          {title}
        </button>
      </div>
      <div id={id} className={`collapse ${collapsed ? '' : 'show'}`} aria-labelledby="headingOne" data-parent="#accordionExample">
        <div className="card-body p-0">
          {body}
        </div>
      </div>
    </div>
  );


}


export default Collapsiable;