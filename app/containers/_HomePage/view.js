import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

import * as _ from 'lodash';
import { schema as uiSchema } from './Schema';

export default function View({initValue, uriId, title, onSubmit}) {
  const {id} = useParams();
  return (
    <div className="overflow-hidden">
     
        <p>in view mode for : {id}</p>
              <a href="#" className="btn btn-default">Default</a>&nbsp; 
              <a href="#" className="btn btn-primary">Primary</a>&nbsp; 
              <a href="#" className="btn btn-secondary">Secondary</a>&nbsp; 
              <a href="#" className="btn btn-success">Success</a>&nbsp; 
              <a href="#" className="btn btn-info">Info</a>&nbsp; 
              <a href="#" className="btn btn-warning">Warning</a>&nbsp; 
              <a href="#" className="btn btn-danger">Danger</a>&nbsp; 
              <a href="#" className="btn btn-link">Link</a>&nbsp; 
      
    </div>
  );
}
