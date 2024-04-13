import React, { Component } from 'react'

function NavItem(props) {
  return (
    <li key={props.key} className={`nav-item ${props.className}`}>
      {props.children}
    </li>  
  );


}


export default NavItem;