import React, { Component, useEffect, useState } from 'react'
import { Tooltip as TTip } from 'react-tooltip';
import _
 from 'lodash';
function ToolTip({title, content, placement, id=_.random(5)}) {
  return (
    <>
    <a
      data-tooltip-id={id}
      data-tooltip-place={placement}
      data-tooltip-content={title}
    >
      {
        content
      }
    </a><TTip id={id} /></>
  );


}


export default ToolTip;