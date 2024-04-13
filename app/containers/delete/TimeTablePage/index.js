import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import * as _ from 'lodash';
import Edit from './edit';
import View from './view';
import ToolBar from './toolBar';
import { Table, ConfirmModal, Card, Icon } from '../../components';
import AsyncDropdown from '../AsyncDropdown/Loadable';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment-timezone'
import 'react-big-calendar/lib/css/react-big-calendar.css'
moment.tz.setDefault("IST");
const localizer = momentLocalizer(moment)
import {
  events as EVENT,
  defaults as DEFAULT,
  toastMessages,
  labels,
  events,
} from '../ConstantManager';
import { logger } from '../../services';
import { componentName, componentNameCaps, componentNameSingular } from './componentName';
import { useForm } from 'react-hook-form';
import { globalConfigs } from '../../globalConfigs';


export default function Timetables(props) { //change for new component
  const params = useParams();
  const id = params.id || undefined;
  const mode = params.mode || 'list';
  const title = componentNameSingular;
  const history = useHistory();
  const { schoolConfig: {
    dayStartTime, 
    dayEndTime, 
    classDuration, 
    breaks 
  } } = globalConfigs;
  const timeslotsPerHour = (60 / classDuration);
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
    LIST_GET_FIND_BY_QUERY_SUCCESS,
    LIST_GET_FIND_BY_QUERY_FAILED
  } = EVENT[componentNameCaps];

  const { NETWORK_ERROR, RESET_EVENT } = EVENT

  // all states
  const [listData, setListData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [collapse, setCollapseable] = useState(true);
  const [queryResult, setQueryResult] = useState([]);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [listView, setListView] = useState(true);
  const [idInAction, setIdInAction] = useState(undefined);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
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
    findByQuery,
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
      title: listView ? `Calendar View` : `List View`,
      iconOptions: { icon: listView ? 'calendar4-week' : 'list' },
      type: 'secondary',
      //path: `/${componentName}/edit/new`,
      onClick: () => {
        setListView(!listView);
        // history.push(`/${componentName}/edit/new`);
      },
    },
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
    { accessorFn: (row) => `${row.subject && row.subject.name || labels.UNKNOWN}`, header: labels.SUBJECT_NAME, size: defaultColSize },
    { accessorFn: (row) => `${row.class && row.class.name || labels.UNKNOWN}${row.class && row.class.section || ''}`, header: labels.CLASS, size: defaultColSize },
    { accessorFn: (row) => `${row.teacher && row.teacher.firstName || labels.UNKNOWN} ${row.teacher && row.teacher.lastName || labels.UNKNOWN}`, header: labels.TEACHER, size: defaultColSize },
    { accessorKey: 'date', header: labels.DATE, size: defaultColSize },
    { accessorFn: (row) => `${row.timeFrom}-${row.timeTo}`, header: labels.TIME, size: defaultColSize },


  ]
  useEffect(() => {
    showProgressBar(true)
    if (data && data.length === 0 || !data) {
      getList(1, 100)
    };
  }, []);
  const titleAccessor = (d) => {
    return d.title.split('$')[0];
  };

  const perpEvents = (data) => {
    setQueryResult(data.map((item, i) => {
      const [yyyy, mm, dd] = item.date.split('-');
      const [fhh, fmin] = item.timeFrom.split(':');
      const [thh, tmin] = item.timeTo.split(':');
      const intMM = mm !== "0" ? parseInt(mm) - 1 : mm;
      return {
        id: item.id,
        title: item.subject.name + '$' + item.teacher.firstName + ' ' + item.teacher.lastName,
        start: new Date(yyyy, intMM, dd, fhh, fmin),
        end: new Date(yyyy, intMM, dd, thh, tmin),
        allDay: false
      }
    }))
  }

  function generateYearlyBreakEvents(schoolBreaks) {
    const events = [];
    const currentYear = new Date().getFullYear();
  
    // Loop over each month
    for (let month = 0; month < 12; month++) {
      // Loop over each day of the month
      for (let day = 1; day <= 31; day++) {
        // Loop over each break
        schoolBreaks.forEach((breakItem, i) => {
          const [bhh, bmin] = breakItem.startTime.split(':');
          const [ehh, emin] = breakItem.endTime.split(':');
          const title = breakItem.title;
  
          // Create a new break event
          const event = {
            id: 'break-' + month + '-' + day + '-' + i,
            title,
            start: new Date(currentYear, month, day, bhh, bmin),
            end: new Date(currentYear, month, day, ehh, emin),
            allDay: false
          };
  
          // Add the event to the events array
          events.push(event);
        });
      }
    }
  
    return events;
  }

  function eventStyleGetter(event, start, end, isSelected) {
    let backgroundColor = 'var(--primary)'; // Default background color
    if (event.id.startsWith('break-')) {
      backgroundColor = 'var(--gray)'; // Background color for break events
    }
    let style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
      padding: '3px'
    };
    return {
      style: style
    };
  }
  
  // Usage:
  const yearlyBreakEvents = generateYearlyBreakEvents(breaks);

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
        perpEvents(data)
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
      case LIST_GET_FIND_BY_QUERY_SUCCESS:
        perpEvents(data)
        resetEvent()
        break;
        case LIST_GET_FIND_BY_QUERY_FAILED:
          // perpEvents(data)
          resetEvent()
          break
      case NETWORK_ERROR:
        showProgressBar(false)
        toastError(toastMessages.ERROR);
        resetEvent()
        break;
    }
    msg ? toastSuccess(msg) : undefined;
  }, [type]);

  const onEdit = (event, id) => {
    event ? event.stopPropagation() : undefined;
    if(!id.startsWith('break-')) {
      showProgressBar(true)
      history.push(`/${componentName}/edit/${id}`);
    }
  };

  const onView = (event, id) => {
    event.stopPropagation();
    showProgressBar(true)
    history.push(`/${componentName}/view/${id}`);
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
    const classId = values.class.id;
    const subjectId = values.subject.id;
    const teacherId = values.teacher.id;
    delete newData.class;
    delete newData.subject;
    delete newData.teacher;
    const finalData = { ...newData, class: classId, subject: subjectId, teacher: teacherId }
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

  const onChangeClass = (e) => {

    setFilterClass(e.target.value)
  }

  return <div className="overflow-hidden">
    {
      (mode === 'list') ? <>
        <ToolBar title={title + "'s"} mode={'List'} actionButtons={actionButtons} />
        <div className="pageContent">
          <div className="row">
            {!listView ? <div className="col-md-12">
              <div className='row bg-custom-gray p-3'>

                <div className="col-3">
                  <select className='form-control'
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}
                  >
                    <AsyncDropdown dataType={'classes'} />
                  </select>
                </div>
                <div className="col-1">
                  <button className='btn btn-inline btn-primary' onClick={() => { findByQuery(selectedOption) }}>Show</button>
                </div>
              </div>
              <Card className="shadow-sm" body={
                <Calendar
                  localizer={localizer}
                  toolbar={true}

                  events={[...queryResult, ...yearlyBreakEvents]}
                  style={{ height: 500 }}
                  min={moment(dayStartTime, 'h:mma').toDate()}
                  max={moment(dayEndTime, 'h:mma').toDate()}
                  defaultView={'week'}
                  eventPropGetter={eventStyleGetter}
                  titleAccessor={titleAccessor}
                  formats={{ eventTimeRangeEndFormat: '' }}
                  onSelectEvent={(d) => { onEdit(undefined, d.id) }}
                  //timeslots={ timeslotsPerHour }
                />

              } />

            </div> :
              <div className="col-md-12">
                <Table
                  enableRowActions={true}
                  onEdit={onEdit}
                  onDelete={confirmDelete}
                  rowActions={['edit', 'delete']}
                  onView={onEdit}
                  columns={columns}
                  tabledata={listData}
                  showColumnFilters={false}
                />
              </div>}
          </div>
        </div>
      </> : undefined}
    {(mode === 'view') ? <View showProgressBar={showProgressBar} props={props} componentName={componentName} data={listData.filter(p => p.id === id)} title={title} id={id} onEdit={onEdit} confirmDelete={confirmDelete} /> : undefined}
    {(mode === 'edit') ? <Edit showProgressBar={showProgressBar} props={props} componentName={componentName} data={listData.filter(p => p.id === id)} title={title} id={id} onSubmit={onSubmit} /> : undefined}
    <ConfirmModal loadButton={false} theme={'danger'} show={modalShow} onClose={() => { setModalShow(!modalShow); showProgressBar(false) }} onSubmit={() => { setModalShow(false); onDelete(idInAction) }} />
  </div>
    ;
}
