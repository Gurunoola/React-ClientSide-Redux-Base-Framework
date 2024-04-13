import React, { useState } from 'react';
import { Dropdown, Badge, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { CustomToggle } from './customToggle';

import Icon from './icon';

function TopBarMessages() {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <a className="nav-link" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <Icon icon={'envelope-fill'} />
          {/* <!-- Counter - Messages --> */}
          <span className="badge badge-danger badge-counter">7</span>
        </a>
      </Dropdown.Toggle>
      <Dropdown.Menu className='dropdown-list dropdown-menu shadow'>
        <h6 className="dropdown-header bg-white border-0 text-secondary">
          Message Center
        </h6>
        <Dropdown.Item eventKey="1">
          <Link className="d-flex text-decoration-none align-items-center" to="#">
            <div className="dropdown-list-image mr-3">
              <img className="rounded-circle" src={`${require("../img/profile_female.svg")}`} />
              <div className="status-indicator bg-success"></div>
            </div>
            <div className="font-weight-bold">
              <div className="text-truncate">Hi there! I am wondering if you can help me with a
                problem I've been having.</div>
              <div className="small text-gray-500">Emily Fowler · 58m</div>
            </div>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item eventKey="1">
          <Link className="d-flex text-decoration-none align-items-center" to="#">
            <div className="dropdown-list-image mr-3">
              <img className="rounded-circle" src={`${require("../img/profile_male.svg")}`} />
              <div className="status-indicator bg-success"></div>
            </div>
            <div className="font-weight-bold">
              <div className="text-truncate">Hi there! I am wondering if you can help me with a
                problem I've been having.</div>
              <div className="small text-gray-500">Emily Fowler · 58m</div>
            </div>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item eventKey="1">
          <Link className="d-flex text-decoration-none align-items-center" to="#">
            <div className="dropdown-list-image mr-3">
              <img className="rounded-circle" src={`${require("../img/profile_female.svg")}`} />
              <div className="status-indicator bg-success"></div>
            </div>
            <div className="font-weight-bold">
              <div className="text-truncate">Hi there! I am wondering if you can help me with a
                problem I've been having.</div>
              <div className="small text-gray-500">Emily Fowler · 58m</div>
            </div>
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TopBarMessages