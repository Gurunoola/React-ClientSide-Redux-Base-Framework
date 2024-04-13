import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components';
import * as _ from 'lodash';


export default function ToolBar({title, mode, actionButtons=[]}) { //change for new component
   return (
    <PageHeader
    title={`${title} / ${mode}`}
    actionButtons = {actionButtons}
    className={'pageHeader'}
  />
  );
}
