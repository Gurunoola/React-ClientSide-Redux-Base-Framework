import React, { Component } from 'react'
import { globalConfigs } from '../globalConfigs';
import GlobalStyle from '../globalStyles';

function PoweredBy(props) {
    const { brandConfig } = globalConfigs;
    const { color = 'white', bgColor = "transparent", position = "absolute", fontSize = 'h10' } = props;
    const ret = brandConfig.showPoweredBy ? <>
        <div className={`brandLogo position-${position} text-${color} bg-${bgColor} ${fontSize}`} style={{ bottom: 0 }}>
            <div className='row'>
                <div className='col text-center'> 
                    <span className='d-none d-sm-inline'>Powered by&nbsp; </span>
                    <img src={brandConfig.icon} /> &nbsp; 
                    <a href={brandConfig.website} target="_blank" style={{verticalAlign: "middle"}} className={`text-${color} `}>{brandConfig.abrivation}</a>
                </div>
            </div>
        </div> <GlobalStyle/></> : undefined
    return ret;
}


export default PoweredBy;