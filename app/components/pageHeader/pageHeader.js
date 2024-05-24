import React, { useEffect, useState } from 'react'
import Icon from '../icon';
import './styles.css'
import { capitalizeString } from '../../helpers/utils'
import { Link } from 'react-router-dom';

function PageHeader({ title, actionButtons, className }) {
  const [pageTitle, setTitle] = useState('')

  useEffect(() => {
    setTitle(title);
  })

  const getActionButton = (actionButtonList) => {

    return actionButtonList.map(({ title, path, iconOptions, type = 'primary', onClick }) => {
      if(path)
      return <Link class={`btn btn-${type}`} to={path || undefined} onClick={onClick || undefined}>
        <Icon {...iconOptions} />
        {title}
      </Link>
      else
      return <button class={`btn btn-${type}`} onClick={onClick || undefined}>
        <Icon {...iconOptions} />
        {title} 
      </button>
    })
  }

  return (<>
    <div className={`d-sm-flex align-items-center justify-content-between p-2 ${className} `}>
      <p className="d-none d-sm-inline-block mb-0 text-primary">
        {capitalizeString(pageTitle)}
      </p>
      { actionButtons && actionButtons.length > 0 ? <div className="btn-group actionBarBtnGrp">
      <div className="btn-group btn-group-sm" role="group">
          {
            getActionButton(actionButtons)
          }
        </div>
      </div> : undefined
      }
    </div>
  </>
  );
}

export default PageHeader;



