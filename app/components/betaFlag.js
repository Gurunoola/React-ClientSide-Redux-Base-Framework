import React, { Component } from 'react'
import { globalConfigs } from '../globalConfigs';
import GlobalStyle from '../globalStyles';

function BetaFlag(props) {
    const { color = 'white', bgColor = "transparent", position = "absolute", fontSize = 'h10' } = props;
    const ret = globalConfigs.appConfig.betaFlag ? <>
        <div className='betaFlag'>
            BETA
        </div> <GlobalStyle/></> : undefined
    return ret;
}


export default BetaFlag;