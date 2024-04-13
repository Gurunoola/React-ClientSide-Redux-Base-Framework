import React, { Component, useEffect, useState } from 'react'
import NavItem from './nav-item';

function Nav(props) {
  const [childComponents, setChildComponents] = useState([])
  useEffect(()=>{ props.children ? setChildComponents(props.children) : setChildComponents([])},[])

  return (
    <ul className="navbar-nav">
          
        {props.children}
         
    </ul>
  );


}


export default Nav;