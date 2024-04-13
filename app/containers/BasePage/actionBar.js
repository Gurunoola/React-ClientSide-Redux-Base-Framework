import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components';
import * as _ from 'lodash';


export default function ActionBar({title, mode}) { //change for new component

  return (
    <PageHeader
    title={`${title}s - ${mode}`}
    actionButtons={[
      {
        title: `Add ${title}`,
        iconOptions: { icon: 'plus' },
        onClick: () => {
          history.push('/students');
        },
      },
      {
        title: 'Export',
        type: 'secondary',
        path: '/',
        iconOptions: { icon: 'download' },
      },
    ]}
    className={'pageHeader'}
  />
  );
}
