import React, { useState } from 'react';
import Icon
 from './icon';
function TopBarSearch() {

  return (
    <form className=" d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search" style={{width: "60%"}} >
  <div className="input-group">
    <input type="text" className="form-control bg-white border-1 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
    <div className="input-group-append">
      <button className="btn btn-primary" type="button">
      <Icon icon={'search'} type="white" size='16px' />
      </button>
    </div>
  </div>
</form>
      
  );
}

export default TopBarSearch