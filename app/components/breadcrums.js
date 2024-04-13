import React, { Component, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


function BreadCrums({current, link}) {
    const [currPage, setCurrPage] = useState([{"text": "Dashboard", "path":"/"}])

    useEffect(()=>{
        const cu = currPage;
        cu.push({"text": current, "path": link});
        setCurrPage(cu)
    },[])
  return ( 
        <Breadcrumb className='h10'>
        { currPage.map((item)=>{
            return <Breadcrumb.Item href={`${item.path}`}>{item.text}</Breadcrumb.Item>
        })}
      </Breadcrumb>
  );
}


export default BreadCrums;