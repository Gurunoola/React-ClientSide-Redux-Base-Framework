import React from 'react'
import { svgIconPaths } from '../containers/ConstantManager';
import ToolTip from './tooltip';


function Icon(props) {
  const {
    toolTip,
    icon,
    asSvg = false,
    type = "secondary",
    size = "18px",
    className = '',
    circular = false
  } = props;

  let title, placement, show;
  toolTip && ({ title, placement='top', show=true } = toolTip);

  const getSvg = (icon) => {
    return (<svg xmlns="http://www.w3.org/2000/svg" style={ circular ? {position: "absolute", margin: "-9px"} : undefined} width={size} height={size} fill="currentColor" className="bi">
          {svgIconPaths[icon]}
        </svg>
    );
  }

  const getSvgIcon = (icon) => {
    return (
    <i className={`bi ml-1 mr-1 bi-${icon} ${className} text-${ !circular && type}`} style={{fontSize: size}}>{getSvg(icon)}</i> 
    );
  }

  const getCircularIcon = (icon) => {
    return asSvg ? <div className={`icon-circle ml-2 mr-2 bg-${type} text-white`} style={{ width: size, height: size, float: "left" }}>
      {getSvgIcon(icon)}
    </div>
      : <div className={`icon-circle ml-2 mr-2 bg-${type}`} style={{ width: size, height: size, float: "left" }}>
    <i className={`bi ml-1 mr-1 bi-${icon} ${className} text-white`}></i>
  </div>
  }

  
  // const getToolTipIcon = (icon) => {
  //   return <OverlayTrigger placement={placement} overlay={<Tooltip id="button-tooltip-2">{title}</Tooltip>}>
  //   {({ ref, ...triggerHandler }) => {
  //     if(circular) {
  //       return getCircularIcon(icon, asSvg);
  //     } else if(asSvg) {
  //       return getSvgIcon(icon);
  //     } else {
  //       return <i {...triggerHandler} ref={ref} className={`bi ml-1 mr-1 bi-${icon} ${className} text-${type}`} style={{ fontSize: size }}></i>
  //     }
  //   }}
  // </OverlayTrigger>
  // }

  // const getToolTipIcon = (icon) => {
  //   return <OverlayTrigger placement={placement} overlay={<Tooltip id="button-tooltip-2">{title}</Tooltip>}>
  //   {({ ref, ...triggerHandler }) => {
  //     if(circular) {
  //       return getCircularIcon(icon, asSvg);
  //     } else if(asSvg) {
  //       return getSvgIcon(icon);
  //     } else {
  //       return <i {...triggerHandler} ref={ref} className={`bi ml-1 mr-1 bi-${icon} ${className} text-${type}`} style={{ fontSize: size }}></i>
  //     }
  //   }}
  // </OverlayTrigger>
  // }

  const getIcon = (icon) => {
    if(circular) {
      return getCircularIcon(icon, asSvg);
   } else if(asSvg) {
    return getSvgIcon(icon);
   } else {
    return <i className={`bi ml-1 mr-1 bi-${icon} ${className} text-${type}`} style={{ fontSize: size }}></i>
   }
  }

  const getToolTipIcon = (icon) => {
    const id = `my-tooltip-${icon}`
    return <ToolTip id={id} placement={placement} title={title} content={ getIcon(icon)} />
    }

  if(show)
  {
    return getToolTipIcon(icon);
  }
  if (circular) {
    return getCircularIcon(icon);
  }

  if (asSvg) {
    return getSvgIcon(icon);
  }

  return (
    <i className={`bi ml-1 mr-1 bi-${icon} ${className} text-${type}`} style={{ fontSize: size }}></i>
  );
}


export default Icon;