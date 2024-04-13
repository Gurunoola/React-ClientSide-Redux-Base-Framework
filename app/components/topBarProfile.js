import React, { useState } from 'react';
import { Dropdown, Badge, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { CustomToggle } from './customToggle';
import Icon from './icon';
import { Link, useHistory } from 'react-router-dom';
import ConfirmModal from './confirmModal';
import { labels, toastMessages } from '../containers/ConstantManager';

function TopBarProfile(props) {
  const history = useHistory();
  const [logoutConfirmShow, setLogoutConfirmShow] = useState(false);
  const onLogoutSubmit = () => {
    history.push('/logout');
  };

  const onLogoutClose = () => {
    setLogoutConfirmShow(false);  
  }
  return (
    <>    <Dropdown className='nav-link'>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <a className="nav-link" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="mr-2 d-none d-lg-inline text-gray-600 small text-capitalize"> Hello, {props.user.firstName} {props.user.lastName}</span>
          <img className="img-profile rounded-circle" src={require("img/profile_male.svg")} />
        </a>
      </Dropdown.Toggle>
      <Dropdown.Menu className='shadow'>
        <Dropdown.Item eventKey="1">
        <Link to="/profile">
          <Icon className='mr-3' icon={'person-fill'} />
          Profile
          </Link>
        </Dropdown.Item>
        <Dropdown.Item eventKey="4">
          <Link to="#" onClick={()=>setLogoutConfirmShow(true)}>
            <Icon className='mr-3' icon={'box-arrow-right'} />
            Logout
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <ConfirmModal show={logoutConfirmShow} onSubmit={onLogoutSubmit} onClose={onLogoutClose}  header={toastMessages.LOGGING_OUT} body={toastMessages.ARE_YOU_SURE_MSG} />
    
    </>
  );
}

export default TopBarProfile