import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as _ from 'lodash';
import Edit from './edit';
import View from './view';
import ToolBar from './toolBar';
import { Table, ConfirmModal, Card, Icon } from '../../components';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import Select from 'react-select'

import {
  events as EVENT,
  defaults as DEFAULT,
  toastMessages,
  labels,
  validationErrorMessages
} from '../ConstantManager';
import { logger } from '../../services';
import { componentName, componentNameCaps, componentNameSingular } from './componentName';
import AsyncDropdown from '../AsyncDropdown/Loadable';
const localizer = momentLocalizer(moment)

export default function Attendances(props) { //change for new component
  const params = useParams();
  const id = parseInt(params.id) || undefined;
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

  const { LIST_GET_SUCCESS: studentListSuccess } = EVENT.STUDENTS

  const { NETWORK_ERROR, RESET_EVENT } = EVENT

  // all states
  const [listData, setListData] = useState([]);
  const [attListData, setAttListData] = useState([]);
  const [studentListData, setStudentListData] = useState([]);
  const [selectedClass, setSelectedClass] = useState(undefined);
  const [modalShow, setModalShow] = useState(false);
  const [collapse, setCollapseable] = useState(true);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const validate = {
    required: { required: validationErrorMessages.REQUIRED },
    minLength: { value: 3, message: validationErrorMessages.MIN_LENGTH + '3' }
  };
  const {
    setShowProgressBar: showProgressBar,
    isMobile,
    setShowSideBar: showSideBar,
    state: {
      "students": {
        result: studentsResult
      },
      [componentName]: {
        type,
        message,
        result
      },
    },
  } = props;

  let data = [];
  let studentData = []

  // All toast actions
  const {
    getList,
    getStudentsList,
    remove,
    update,
    post,
    resetEvent,
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo
  } = props.sagaMethods;

  studentsResult ? (studentData = studentsResult) : [];
  result ? (data = result) : [];

  const defaultColSize = 200;
  const actionButtons = [
    {
      title: 'Update Attendance',
      iconOptions: { icon: 'pencil-square' },
      type: 'primary',
      path: "/attendance/view/",
      onClick: () => {
        history.push('/attendance/view/');
      },
    }
  ];

  const columns = [
    { accessorKey: 'userId', header: labels.USER_ID, size: defaultColSize },
    { accessorKey: 'name', header: labels.NAME, size: defaultColSize },
    { accessorKey: 'icon', header: '', size: 2 },
    { accessorKey: 'status', header: 'Status', size: defaultColSize },
    { accessorKey: 'class', header: labels.CLASS, size: 20 },
  ]

  useEffect(() => {
    showProgressBar(true)
    if (data.length === 0 || !data) {
      //getList(1, 100)
    };
  }, []);

  useEffect(() => {
    showProgressBar(true)
    if (studentData.length === 0 || !studentData) {
      getStudentsList(1, 100);
      showProgressBar(false)
    } else {
      const data = studentData.filter(item => item.classId === parseInt(selectedClass));
      setStudentListData(data);
      showProgressBar(false)
    }
  }, [selectedClass]);

  useEffect(() => {
    console.log(listData)
  }, [listData])

  useEffect(() => {
    let msg;
    switch (type) {
      case studentListSuccess:
        setStudentListData(studentData);
        showProgressBar(false)
        logger("Getting list success", 'info')
        break;
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
        history.push('/students')
        break;
      case POST_FAILED:
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
        history.push('/students')
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
    history.push(`/${componentName}/edit/${id}`);
  };

  const onView = (event, id) => {
    event.stopPropagation();
    history.push(`/${componentName}/view/${id}`);
  };

  const onStudentRecordView = (event, id) => {
    event.stopPropagation();
    history.push(`/students/view/${id}`);
  };

  const confirmDelete = (event, id) => {
    event.stopPropagation();
    setModalShow(true);
  };

  const onDelete = (id) => {
    remove(id);
  }

  const markPresent = (ids) => {
    alert(ids)
    //post(ids)
  }

  const onSubmit = (values, newUser = false) => {
    if (newUser) {
      post({ ...values, usi: "0" })
    } else {
      const oldData = listData.filter(p => p.userId === id);
      const newData = { ...oldData[0], ...values }
      if (_.isEqual(oldData[0], newData)) {
        toastWarning(toastMessages.UPDATES.NO_CHANGES_MADE);
        return;
      }
      update({ ...newData });
    }
  };

  const showList = (data) => {
    const d = listData.filter((item)=>{
      return item.classId === parseInt(data.classId) && item.attendanceDate === data.attendanceDate
    })
    const newData = d.map((item)=>{
      const user = _.find(studentData, function(o) { return o.userId === item.userID; });
      return {
        userId: item.userID,
        name: `${user.firstName} ${user.lastName}`,
        icon: item.attendance ? <span title='present' className="badge bg-success text-white"><Icon icon={'check2'} /></span> : <span className="badge bg-danger text-white"><Icon icon={'x-lg'}/></span>,
        status: item.attendance ? 'Present' : 'Absent',


      }
    })
    setAttListData(newData)
    showProgressBar(false);
  }

  const toolBarActions = <select style={{ zoom: 1 }} className='form-control' onChange={(e) => { setSelectedClass(e.target.value) }}>
    <option selected >Please select a class</option>
    <AsyncDropdown dataType={'classes'} />
  </select>

  return <div className="overflow-hidden">
    {
      (mode === 'list') ? <>
        <ToolBar title={title + "'s"} mode={'List'} actionButtons={actionButtons} />
        <div className="pageContent">
          <div className="row p-2">
            <div className="col-md-4">
              <div className='card mb-3'>
                <div className="card-header bg-custom-gray">
                  <div className='row'>
                  <div className='col'>
                    Filter Box
                  </div>
                  <div className='col text-right'>
                    <button className='d-md-none d-lg-none btn btn-sm' onClick={()=>setCollapseable(!collapse)}>
                      <Icon icon={ collapse ? 'caret-up' : 'caret-down'} />
                    </button>
                  </div>
                  </div>
                </div>
                { collapse ? <div className="card-body">
                  <form onSubmit={handleSubmit((data) => { showProgressBar(true); showList(data) })} >
                    <div className='row'>
                      <div className='col-md-12 mb-4'>
                        <label>{labels.CLASS}</label>
                        <Select options={<AsyncDropdown dataType={'classes'} />}  />
                        {/* <select style={{ zoom: 1 }} className='form-control' {...register("classId", validate.required)}>
                          <option selected >Please select a class</option>
                          <AsyncDropdown dataType={'classes'} />
                        </select> */}

                        <ErrorMessage className={'text-danger'} errors={errors} name="firstName" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
                      </div>
                      <div className='col-md-12 mb-4'>
                        <label>{labels.SELECT_DATE}</label>
                        <input type='text' className='form-control' {...register("attendanceDate", validate.required)} />
                        <ErrorMessage errors={errors} name="lastName" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
                      </div>
                      <div className='col-md-12 mb-4'>
                        <button className='btn btn-block btn-primary'>Show</button>
                      </div>
                    </div></form>
                </div> : undefined }
              </div>
            </div>
            <div className="col-md-8">
              <Table

                enablePagination={false}
                onEdit={onEdit}
                onView={onStudentRecordView}
                columns={columns}
                tabledata={attListData}

              />

            </div>
          </div>
        </div>
      </> : undefined}
    {(mode === 'view') ? <View showProgressBar={showProgressBar} props={props} data={listData.filter(p => p.userId === id)} title={title} id={id} onEdit={onEdit} confirmDelete={confirmDelete} /> : undefined}
    {(mode === 'edit') ? <Edit showProgressBar={showProgressBar} props={props} data={listData.filter(p => p.userId === id)} title={title} id={id} onSubmit={onSubmit} /> : undefined}
    <ConfirmModal loadButton={false} theme={'danger'} show={modalShow} onClose={() => { setModalShow(!modalShow); showProgressBar(false) }} onSubmit={() => { setModalShow(false); onDelete(id) }} />
  </div>
    ;
}
