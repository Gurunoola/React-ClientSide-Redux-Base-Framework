import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components';
import * as _ from 'lodash';


export default function ToolBar({title, mode}) { //change for new component

  return (
    <PageHeader
    title={`${title} / ${mode}`}
    actionButtons={[
      {
        title: `Add Student`,
        iconOptions: { icon: 'plus' },
        type: 'secondary',
        path:"/student/new",
        onClick: () => {
          history.push('/students');
        },
      },
      {
        title: 'Add User',
        type: 'secondary',
        path: '/user/new',
        iconOptions: { icon: 'plus' },
      },
      {
        title: 'Export',
        type: 'secondary',
        path: '/export',
        iconOptions: { icon: 'download' },
      },
    ]}
    className={'pageHeader'}
  />
  );
}
