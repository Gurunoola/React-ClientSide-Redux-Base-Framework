import React, { useEffect, useState } from 'react';
import './styles.css';
import { 
  _ , 
  getList, post, 
  update, 
  remove, 
  Table, 
  config,
  ConfirmModal, 
  ToolBar, 
  Edit, 
  View, 
  componentNameSingular, 
  toastMessages,
  labels,
  Icon,
  isBirthday
} from './imports';

export default function Students(props) {
  const title = componentNameSingular;
  const {TABLE_LIMIT, TABLE_PAGE, POPULATE, DEFAULT_COL_SIZE} = config;
  let data = [];
  const actionButtons = [
    {
      title: `${labels.BUTTON_NEW} ${_.capitalize(componentNameSingular)}`,
      iconOptions: { icon: 'plus', type: 'white'},
      type: 'primary',
      onClick: () => {
        setInActionData({ id: 'new' });
        amendScreenView('new')
      },
    }
  ];
  const columns = [
    { accessorKey: 'id', header: labels.USER_ID, size: DEFAULT_COL_SIZE },
    { accessorFn: (row) => `${row.firstName} ${row.lastName}`, header: labels.NAME, size: 200 },
    { accessorKey: 'primaryMobile', header: labels.CONTACT, size: 100 },
    { accessorKey: 'email', header: labels.EMAIL, size: 200 },
    { accessorFn: (row) => `${row.class && row.class.name || labels.UNKNOWN}${row.class && row.class.section || ''}`, header: labels.CLASS, size: 50 },
    { accessorFn: (row) => `${row.dob}`,
    header: `${labels.DOB}`,
    size: 150,
    Cell: ({ renderedCellValue }) => {
      const bDay = isBirthday(renderedCellValue);
      return (
        <div>
          {renderedCellValue}
          {bDay ? <div className='badge ml-1'> <Icon asSvg icon={'cake'} type="danger" toolTip= {{ show: true, title: 'Birthday', placement:'top'}} /></div> : ''}
        </div>
      )
    },},
    { accessorKey: 'gender', header: labels.GENDER, size: 100 }
  ]
  
  // all states
  const [listData, setListData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [inActionData, setInActionData] = useState({ id: undefined, data: undefined });
  const [screen, setScreen] = useState({ mode: 'list', class: 'col-md-12 mr-3' });
  const [paginations, setPaginations] = useState({});

  const {
    state: {
      ['asyncDropdown']: {
        result
      },
    },
  } = props;

  const {
    showProgressBar,
    toastSuccess,
    toastWarning,
    toastError
  } = props.sagaMethods;
  
  result ? (data = result.data) : [];

  const fetchList = async (page=TABLE_PAGE, limit=TABLE_LIMIT) => {
    showProgressBar(true)
    const {response, error} = await getList({ page, limit, populate: POPULATE })
    if (response && response.data.results) {
      setListData(response.data.results)
      setPaginations(_.omit(response.data, ['results']))
      showProgressBar(false)
    } else {
      showProgressBar(false)
      toastError(toastMessages.ERROR+': '+ error.message)
    }
  }

  useEffect(() => {
    showProgressBar();
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

  const onSubmit = async (values, newUser = false, isSaveAndNew) => {
    showProgressBar(true);
    const action = newUser ? post : update;
    const id = newUser ? 'new' : inActionData.id;
    const data = { ...values, class: values.class.id };  
    if (!newUser) {
      const oldData = listData.find(p => p.id === id);
      if (_.isEqual(oldData, data)) {
        toastWarning(toastMessages.UPDATES.NO_CHANGES_MADE);
        showProgressBar(false);
        return;
      }
    }  
    const { response, error } = await action(data);
    if (response && response.data) {
      fetchList();
      if (newUser && isSaveAndNew) {
        setInActionData({ id: 'new' });
        amendScreenView('new');
      } else {
        onView(event, response.data.id);
      }
      showProgressBar(false);
      toastSuccess(newUser ? toastMessages.CREATED.SUCCESS : toastMessages.UPDATES.SUCCESS);
    } else {
      showProgressBar(false);
      toastError((newUser ? toastMessages.ERROR : toastMessages.UPDATES.ERROR) + ': ' + error.message);
    }
  };

  return <div className="overflow-hidden pl-3 pr-3">
    <div className='shadow-sm bg-white rounded-lg mt-3 mb-3'>
      <ToolBar title={title + "'s"} mode={'List'} actionButtons={actionButtons} />
    </div>
    <div className='row m-0 p-0'>
      <div className={`shadow-sm bg-white rounded-lg p-0 mb-3 ${screen.class} scrollAbleContent `}>
        <Table
          enableRowActions={false}
          onEdit={onEdit}
          onView={onView}
          columns={columns}
          tabledata={listData}
          showColumnFilters={false}
        />
      </div>
      {screen.mode === 'view' ? <div className='col  shadow-sm bg-white rounded-lg  p-0 mb-3 scrollAbleContent'>
        <View
          progressBar={showProgressBar}
          setView={amendScreenView}
          props={props}
          title={title}
          id={inActionData.id}
          onEdit={onEdit}
          confirmDelete={confirmDelete} />
      </div> : undefined}
      {screen.mode === 'edit' || screen.mode === 'new' ? <div className='col shadow-sm bg-white rounded-lg  p-0 mb-3 scrollAbleContent'>
        <Edit
          showProgressBar={showProgressBar}
          setView={amendScreenView}
          props={props}
          data={inActionData.data}
          title={title}
          id={inActionData.id}
          onView={onView}
          onSubmit={onSubmit} />
      </div> : undefined}
    </div>
    <ConfirmModal loadButton={false} theme={'danger'} show={modalShow} onClose={()=>{setModalShow(!modalShow); showProgressBar(false)}} onSubmit={()=>{ setModalShow(false); onDelete(inActionData.id)}}/>
  </div>

 
}
