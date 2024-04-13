import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as _ from 'lodash';
import { Icon, Chart, Card } from '../../components';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { WidthProvider, Responsive } from "react-grid-layout";
import {  events as EVENT,  toastMessages,} from '../ConstantManager';
import { logger } from '../../services';
import { componentName, componentNameCaps, componentNameSingular } from './componentName';

const localizer = momentLocalizer(moment)
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function Home(props) { //change for new component
  const params = useParams();
  const title = componentNameSingular;
  const history = useHistory();

  //Once implemented with backed, these vlaues has to be removed
  const chartLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  const chartData = [12, 19, 3, 5, 2, 3];

  const [layout, setLayout] = useState({ ...JSON.parse(localStorage.getItem('rgl-8')) } || {});
  
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
  let data = [];
  const { NETWORK_ERROR } = EVENT
  const [listData, setListData] = useState([]);
  const {
    setShowProgressBar: showProgressBar
  } = props;

  // All toast actions
  const {
    getList,
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo
  } = props.sagaMethods;

  //results ? (data = results) : [];

  useEffect(() => {
    showProgressBar(true);
    const ls = getFromLS("layouts") || {};
    setLayout(ls)
  }, [])

  useEffect(() => {
    saveToLS("layouts", { ...layout });
  }, [layout]);

  useEffect(() => {
    let msg;
    switch (type) {
      case LIST_GET_SUCCESS:
        setListData(data)
        logger("Getting list success", 'info')
        msg = toastMessages.SUCCESS;
        break;
      case GET_SUCCESS:
        msg = toastMessages.SUCCESS;
        break;
      case UPDATE_SUCCESS:
        msg = toastMessages.UPDATES.SUCCESS;
        break;
      case LIST_GET_FAILED:
        logger("Getting list failed", 'error')
        msg = toastMessages.ERROR;
        // toastError(msg);
        return
      case DELETE_SUCCESS:
        msg = toastMessages.DELETED.SUCCESS;
        break;
      case NETWORK_ERROR:
        //toastError(toastMessages.ERROR);
        showProgressBar(false)
        break;
    }
    //msg ? toastSuccess("Home" + msg) : undefined;
    showProgressBar(false);
  }, [type]);

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
