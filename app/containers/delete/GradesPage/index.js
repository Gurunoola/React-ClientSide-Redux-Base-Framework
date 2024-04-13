import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import * as _ from 'lodash';
import Edit from './edit';
import View from './view';
import ToolBar from './toolBar';
import { Table, ConfirmModal } from '../../components';

import {
  events as EVENT,
  defaults as DEFAULT,
  toastMessages,
  labels,
} from '../ConstantManager';
import { logger } from '../../services';
import { componentName, componentNameCaps, componentNameSingular } from './componentName';

export default function Grades(props) { //change for new component
  const params = useParams();
  const id = params.id || undefined;
  const mode = params.mode || 'list';
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

  const { NETWORK_ERROR, RESET_EVENT } = EVENT

  // all states
  const [listData, setListData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [idInAction, setIdInAction] = useState(undefined);


  const {
    setShowProgressBar: showProgressBar,
    isMobile,
    setShowSideBar: showSideBar,
    state: {
      [componentName]: {
        type,
        message,
        result
      },
    },
  } = props;

  let data = [];

  // All toast actions
  const {
    getList,
    remove,
    update,
    post,
    resetEvent,
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo
  } = props.sagaMethods;

  result ? (data = result.data) : [];
  const defaultColSize = 200;
  const actionButtons = [
    {
      title: `${labels.BUTTON_NEW} ${_.capitalize(componentNameSingular)}`,
      iconOptions: { icon: 'plus' },
      type: 'primary',
      path: `/${componentName}/edit/new`,
      onClick: () => {
        history.push(`/${componentName}/edit/new`);
      },
    }
  ];
  const columns = [
    { accessorKey: 'id', header: labels.USER_ID, size: defaultColSize },
    { accessorKey: 'name', header: labels.NAME, size: defaultColSize },
    { accessorKey: 'point', header: labels.GRADE_POINT, size: defaultColSize },
    { accessorKey: 'percentageFrom', header: labels.GRADE_PERCENTAGE_FROM, size: defaultColSize },
    { accessorKey: 'percentageTo', header: labels.GRADE_PERCENTAGE_TO, size: defaultColSize },
    { accessorKey: 'comments', header: labels.COMMENTS, size: defaultColSize },
  ]
  useEffect(() => {
    showProgressBar(true)
    if (data && data.length === 0 || !data) {
      getList(1, 100)
    };
  }, []);

  useEffect(() => {
    let msg;
    switch (type) {
      case LIST_GET_SUCCESS:
        setListData(data)
        showProgressBar(false)
        logger("Getting list success", 'info')
        break;
      case GET_SUCCESS:
        showProgressBar(false)
        break;
      case POST_SUCCESS:
        msg = toastMessages.CREATED.SUCCESS;
        getList(1, 100) //render the list again
        history.push(`/${componentName}`)
        break;
      case POST_FAILED:
      case UPDATE_FAILED:
        toastError(toastMessages.CREATED.ERROR + message);
        resetEvent()
        showProgressBar(false)
        break;
      case UPDATE_SUCCESS:
        msg = toastMessages.UPDATES.SUCCESS;
        history.goBack();
        getList(1, 100) //render the list again
        break;
      case LIST_GET_FAILED:
        toastError(toastMessages.ERROR + message);
        showProgressBar(false)
        return
      case DELETE_SUCCESS:
        msg = toastMessages.DELETED.SUCCESS;
        setModalShow(false);
        history.push(`/${componentName}`)
        getList(1, 100) //render the list again
        break;
      case DELETE_FAILED:
        toastError(toastMessages.DELETED.ERROR + message);
        setModalShow(false);
        getList(1, 100) //render the list again
        break;
      case NETWORK_ERROR:
        showProgressBar(false)
        toastError(toastMessages.ERROR);
        break;
    }
    msg ? toastSuccess(msg) : undefined;
  }, [type]);

  const onEdit = (event, id) => {
    event.stopPropagation();
    showProgressBar(true)
    history.push(`/${componentName}/edit/${id}`);
  };

  const onView = (event, id) => {
    event.stopPropagation();
    showProgressBar(true)
    if (!event.target.id === 'viewLink')
      history.push(`/${componentName}/view/${id}`);
    else if (event.target.id === "")
      onEdit(event, id)
  };

  const confirmDelete = (event, id) => {
    event.stopPropagation();
    setIdInAction(id);
    setModalShow(true);
  };

  const onDelete = (id) => {
    const data = listData.filter(p => p.id === id);
    remove(id);
    setIdInAction(undefined);
  }

  const onSubmit = (values, newUser = false) => {
    const newData = { ...values };
    const finalData = { ...newData }
    if (newUser) {
      post({ ...finalData })
    } else {
      const oldData = listData.filter(p => p.id === id);
      if (_.isEqual(oldData[0], finalData)) {
        toastWarning(toastMessages.UPDATES.NO_CHANGES_MADE);
        showProgressBar(false);
        return;
      }
      update({ ...finalData });
    }
  };

  return <div className="overflow-hidden">
    {
      (mode === 'list') ? <>
        <ToolBar title={title + "'s"} mode={'List'} actionButtons={actionButtons} />
        <div className="pageContent">
          <div className="row">
            <div className="col-md-12">
              <Table
                enableRowActions={true}
                rowActions={['edit', 'delete']}
                onDelete={confirmDelete}
                onEdit={onEdit}
                onView={onView}
                columns={columns}
                tabledata={listData}
                showColumnFilters={false}
              />
            </div>
          </div>
        </div>
      </> : undefined}
    {(mode === 'view') ? <View showProgressBar={showProgressBar} props={props} componentName={componentName} data={listData.filter(p => p.id === id)} title={title} id={id} onEdit={onEdit} confirmDelete={confirmDelete} /> : undefined}
    {(mode === 'edit') ? <Edit showProgressBar={showProgressBar} props={props} componentName={componentName} data={listData.filter(p => p.id === id)} title={title} id={id} onSubmit={onSubmit} /> : undefined}
    <ConfirmModal loadButton={false} theme={'danger'} show={modalShow} onClose={() => { setModalShow(!modalShow); showProgressBar(false) }} onSubmit={() => { setModalShow(false); onDelete(idInAction) }} />
  </div>
    ;
}
