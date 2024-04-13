import React from 'react';
import { PageHeader } from './imports';
export function ToolBar({title, mode, actionButtons=[]}) {
   return (
    <PageHeader
    title={`${title} / ${mode}`}
    actionButtons = {actionButtons}
    className={'pageHeader sticky-top bg-white border-bottom'}
  />
  );
}
