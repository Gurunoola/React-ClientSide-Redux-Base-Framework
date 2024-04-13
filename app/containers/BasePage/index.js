import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as _ from 'lodash';
import Modal from 'react-bootstrap/Modal';
import { Table } from '../../components';
import { Card } from '@mui/material';
import Edit from './edit';
import ActionBar from './actionBar';

import {
  events as EVENT,
  defaults as DEFAULT,
  toastMessages,
} from '../ConstantManager';
import { logger } from '../../services';
import { componentName, componentNameCaps, componentNameSingular } from './componentName';

export default function Main(props) { //change for new component
  const params = useParams();
  const uriId = params.id ? params.id.split(':')[1] : undefined;
  const title = componentNameSingular;
  const history = useHistory();
  const {
    LIST_GET_REQUESTED,
    LIST_GET_SUCCESS,
    LIST_GET_FAILED,
    GET_REQUESTED,
    GET_SUCCESS,
    GET_FAILED,
    POST_REQUESTED,
    POST_SUCCESS,
    POST_FAILED,
    UPDATE_REQUESTED,
    UPDATE_SUCCESS,
    UPDATE_FAILED,
    DELETE_REQUESTED,
    DELETE_SUCCESS,
    DELETE_FAILED,
  } = EVENT[componentNameCaps];

  // all states
  const [listData, setListData] = useState([]);

  const {
    setShowProgressBar: showProgressBar,
    state: {
      [componentName]: {
        type,
        results,
        totalPages,
        page: currPage,
        totalResults: tr
      },
    },
  } = props;

  let data = [];


  // All toast actions
  const {
    getList,
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo
  } = props.sagaMethods;

  results ? (data = results) : [];

  const columns = [{
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name.firstName', //access nested data with dot notation
    header: 'First Name',
    size: 150,

  },
  {
    accessorKey: 'name.lastName',
    header: 'Last Name',
    size: 150,
  },
  {
    accessorKey: 'address', //normal accessorKey
    header: 'Address',
    size: 200,
  },
  {
    accessorKey: 'city',
    header: 'City',
    size: 150,
  },
  {
    accessorKey: 'state',
    header: 'State',
    size: 150,
  }]

  useEffect(() => {
    // showProgressBar(true)
    // if (data.length === 0 || !data) { getList(1, 10) };
  }, []);

  useEffect(() => {
    let msg;
    switch (type) {
      case LIST_GET_SUCCESS:
        setListData(data)
        showProgressBar(false)
        logger("Getting list success", 'info')
        msg = "Base" + toastMessages.SUCCESS;
        break;
      case GET_SUCCESS:
        msg = "Base" + toastMessages.SUCCESS;
        break;
      case UPDATE_SUCCESS:
        msg = "Base" + toastMessages.UPDATES.SUCCESS;
        break;
      case LIST_GET_FAILED:
        logger("Getting list failed", 'error')
        msg = "Base" + toastMessages.ERROR;
        toastError(msg);
        return
      case DELETE_SUCCESS:
        msg = "Base" + toastMessages.DELETED.SUCCESS;
        break;
    }
    msg ? toastSuccess(msg) : undefined;
  }, [type]);

  const onEdit = (event, row) => {
    event.stopPropagation();
    history.push(`base/edit/id:${row.id}`);
  };

  const onDelete = (event, id) => {
    event.stopPropagation();
  };

  const listPage = () => {
    
    return <>
    <ActionBar title={title} mode={'List'} />
      <div className="pageContent">
        <div className="row">
          <div className="col-md-12">
            {/* <Table onEdit={onEdit} columns={columns} tabledata={listData} /> */}
          </div>
      </div>
      </div>

    </>

  }

  const editPage = () =>{
    return <>
        <ActionBar title={title} mode={'Edit'} />
      <div className="container-fluid pageContent">
        <div className="row">
          <div className="col-md-12">
            <Edit />
          </div>
      </div>
      </div>

    </>

  }

  const viewPage = () => {};


  return (
    <div className="overflow-hidden">
      {!uriId ? listPage() : editPage()}
    </div>
  );
}
