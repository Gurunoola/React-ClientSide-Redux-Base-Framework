import React, { useState } from 'react';
import { Dropdown, Badge, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { CustomToggle } from './customToggle';
import Icon from './icon';


function TopBarAlerts() {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="alertsDropdown">
        <a to={'#'} className="nav-link">
          <Icon icon={'bell-fill'} />
          <span className="badge badge-danger badge-counter">3+</span>
        </a>
      </Dropdown.Toggle>
      <Dropdown.Menu className='dropdown-list dropdown-menu shadow'>
      <h6 className="dropdown-header bg-white border-0 text-secondary">
      Alerts Center
    </h6>
        <Dropdown.Item eventKey="1">
          <Link className=" d-flex text-decoration-none align-items-center" to="#">
            <div className="mr-3">
              <div className="icon-circle bg-primary">
                <Icon icon={'file-earmark'} type={'white'} />
              </div>
            </div>
            <div>
              <div className="small text-gray-500">December 12, 2019</div>
              <span className="font-weight-bold">A new monthly report is ready to download!</span>
            </div>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item eventKey="1">
          <Link className=" d-flex text-decoration-none align-items-center" to="#">
            <div className="mr-3">
              <div className="icon-circle bg-primary">
                <Icon icon={'file-earmark'} type={'white'} />
              </div>
            </div>
            <div>
              <div className="small text-gray-500">December 12, 2019</div>
              <span className="font-weight-bold">A new monthly report is ready to download!</span>
            </div>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item eventKey="1">
          <Link className=" d-flex text-decoration-none align-items-center" to="#">
            <div className="mr-3">
              <div className="icon-circle bg-primary">
                <Icon icon={'file-earmark'} type={'white'} />
              </div>
            </div>
            <div>
              <div className="small text-gray-500">December 12, 2019</div>
              <span className="font-weight-bold">A new monthly report is ready to download!</span>
            </div>
          </Link>
        </Dropdown.Item>       
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TopBarAlerts