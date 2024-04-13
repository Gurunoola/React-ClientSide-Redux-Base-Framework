import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as _ from 'lodash';
import Edit from './edit';
import View from './view';
import ToolBar from './toolBar';
import { Table, ConfirmModal } from '../../components';
import { getList, post, update, remove } from './services';
import { Icon, Chart, Card } from '../../components';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { WidthProvider, Responsive } from "react-grid-layout";
import './styles.css';
import {
  events as EVENT,
  defaults as DEFAULT,
  toastMessages,
  labels,
} from '../ConstantManager';
import { componentName, componentNameCaps, componentNameSingular } from './componentName';


const localizer = momentLocalizer(moment)
const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default function Dashboard(props) { //change for new component
  const params = useParams();
  const paramsId = params.id || undefined;
  const mode = params.mode || 'list';
  const title = componentNameSingular;
  const history = useHistory();
  const limit = 10;
  const page = 1;
  const populate = 'addresses,parents,class';

  const chartLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  const chartData = [12, 19, 3, 5, 2, 3];

  const [layout, setLayout] = useState({ ...JSON.parse(localStorage.getItem('rgl-8')) } || {});


  // all states
  const [listData, setListData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [inActionData, setInActionData] = useState({ id: paramsId, data: undefined });
  const [screen, setScreen] = useState({ mode: 'list', class: 'col-md-12 mr-3' });

  useEffect(() => {
    showProgressBar(true);
    const ls = getFromLS("layouts") || {};
    setLayout(ls)
  }, [])

  useEffect(() => {
    saveToLS("layouts", { ...layout });
  }, [layout]);
  


  function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  }

  function saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }

  function doOnLayoutChange(layout, layouts) {
    localStorage.setItem("rgl-8", JSON.stringify(layouts))
    setLayout({ ...layouts });
  }

  const {
    setShowProgressBar: showProgressBar,
    setShowSideBar: showSideBar,
    state: {
      ['asyncDropdown']: {
        type,
        message,
        result
      },
    },
  } = props;

  const {
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo
  } = props.sagaMethods;

  let data = [];
  const defaultColSize = 200;
  const actionButtons = [
    {
      title: `${labels.BUTTON_NEW} ${_.capitalize(componentNameSingular)}`,
      iconOptions: { icon: 'plus', type: 'white'},
      type: 'primary',
      // path: `/${componentName}/edit/new`,
      onClick: () => {
        setInActionData({ id: 'new' });
        amendScreenView('new')
      },
    }
  ];

  const columns = [
    { accessorKey: 'id', header: labels.USER_ID, size: defaultColSize },
    { accessorFn: (row) => `${row.firstName} ${row.lastName}`, header: labels.NAME, size: defaultColSize },
    // { accessorKey: 'email', header: labels.EMAIL, size: 250 },
    { accessorKey: 'primaryMobile', header: labels.CONTACT, size: defaultColSize },
    { accessorFn: (row) => `${row.class && row.class.name || labels.UNKNOWN}${row.class && row.class.section || ''}`, header: labels.CLASS, size: 50 },
    { accessorKey: 'gender', header: labels.GENDER, size: 100 }
  ]


  result ? (data = result.data) : [];

  const fetchList = async () => {
    showProgressBar(true)
    const {response, error} = await getList({ page, limit, populate })
    if (response && response.data.results) {
      setListData(response.data.results)
      showProgressBar(false)
    } else {
      showProgressBar(false)
      toastError(toastMessages.ERROR+': '+ error.message)
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  const amendScreenView = (mode) => {
    let cl = 'col-md-12 mr-3';
    switch (mode) {
      case 'view':
      case 'new':
      case 'edit':
        cl = 'col-md-4 mr-3';
      break;
  }
  setScreen({ mode: mode, class: cl });
}

  const onEdit = (event, id, data) => {
    event.stopPropagation();
    amendScreenView('edit')
    setInActionData({ id: id, data });
  };

  const onView = (event, id) => {
    if (event)
      event.stopPropagation();
    if(id === 'new') {      
      amendScreenView('list')
      return
    }
    amendScreenView('view')
    setInActionData({ id: id });
  };

  const confirmDelete = (event, id) => {
    event.stopPropagation();
    setModalShow(true);
  };

  const onDelete = async (id) => {
    const {response, error} = await remove(id);
    if (response && response.status === 204) {
      toastSuccess(toastMessages.DELETED.SUCCESS)
      fetchList();
      showProgressBar(false)
      amendScreenView('list')
     
    } else {
      showProgressBar(false)
      toastError(toastMessages.ERROR+': '+ error.message)
    }
  }

  const onSubmit = async (values, newUser = false) => {
    if (newUser) {
      const {response, error} = await post({ ...values, class: values.class.id })
      if (response && response.data) {
        fetchList();
        onView(event, response.data.id);
        showProgressBar(false)
        toastSuccess(toastMessages.CREATED.SUCCESS)
      } else {
        showProgressBar(false)
        toastError(toastMessages.ERROR+': '+ error.message)
      }
    } else {
      const oldData = listData.filter(p => p.id === inActionData.id);
      const newData = { ...oldData[0], ...values }
      if (_.isEqual(oldData[0], newData)) {
        toastWarning(toastMessages.UPDATES.NO_CHANGES_MADE);
        showProgressBar(false);
        return;
      }      
      const {response, error} = await update({ ...newData, class: newData.class.id });
      if (response && response.data) {
        fetchList();
        onView(undefined, newData.id);
        showProgressBar(false)
        toastSuccess(toastMessages.UPDATES.SUCCESS)
      } else {
        showProgressBar(false)
        toastError(toastMessages.UPDATES.ERROR +' '+ error.message)
      }
    }
    
  };

  return (
    <div className="overflow-hidden">
      <div className='p-2'>
        <ResponsiveReactGridLayout
          className="layout"
          rowHeight={30}
          layouts={layout}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          onLayoutChange={(layout, layouts) => {
            doOnLayoutChange(layout, layouts)
          }}
        >
          <div key="0" className="shadow-sm" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2 }}>
            <Card
              body={<div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Students</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">4000</div>
                </div>
                <div className="col-auto">
                  <Icon icon={'mortarboard-fill'} size='30px' />
                </div>
              </div>}
              options={{ border: 'border-left-primary', shadow: false }}
              headerClass='bg-white'
            />
          </div>
          <div key="6" className="shadow-sm" data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}>
            <Card
              body={<div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Fees pending</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">5</div>
                </div>
                <div className="col-auto">
                  <Icon icon={'exclamation-circle-fill'} type="danger" size='30px' />
                </div>
              </div>}
              options={{ border: 'border-left-primary', shadow: false }}
            />
          </div>
          <div key="1" className="shadow-sm" data-grid={{ w: 4, h: 9, x: 0, y: 0, minW: 2 }}>
            <Chart title='Placements' data={chartData} type={'Bar'} labels={chartLabels} description={'Some Desc goes here'} />
          </div>
          <div key="2" className="shadow-sm" data-grid={{ w: 4, h: 12, x: 4, y: 0, minW: 2 }}>
            <Chart title='Annual Performance' data={chartData} type={'Donught'} labels={chartLabels} description={'Some Desc goes here'} />
          </div>
          <div key="3" className="shadow-sm" data-grid={{ w: 4, h: 8, x: 0, y: 9, minW: 2 }}>
            <Chart title='Admissions' data={chartData} type={'Bar'} labels={chartLabels} description={'Some Desc goes here'} />
          </div>
          <div key="4" className="shadow-sm" data-grid={{ w: 4, h: 8, x: 4, y: 12, minW: 2 }}>
            <Chart title='Weeks Attendance' data={chartData} type={'Line'} labels={chartLabels} description={'Some Desc goes here'} />
          </div>
          <div key="5" className="shadow-sm" data-grid={{ w: 4, h: 15, x: 8, y: 0, minW: 2, minH: 3 }}>
            <Card
              title={`${moment().format('MMMM')} Calander`}
              body=
              <Calendar
                localizer={localizer}
                toolbar={false}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
              /> />
          </div>
        </ResponsiveReactGridLayout>
      </div>
    </div>
  );
        }
