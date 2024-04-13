import React, { Component, useEffect } from 'react';
import { labels } from '../ConstantManager';

function PageNotFound(props) {
  
  return <>
    <div className='row mt-5'>
      <div className='col text-center'>
        <h4>{props.unauthorized ?  labels.UNAUTHORIZED_ACCESS : labels.PAGE_NOT_FOUND}</h4>
        <img className='' src={require('../../img/404.gif')} style={{width: "100%", maxWidth: '500px', "mix-blend-mode":"multiply"}} />
      </div>
    </div>
  </>;
}

export default PageNotFound;
