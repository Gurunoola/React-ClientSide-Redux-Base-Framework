import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function Teachers(props) {
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
    { accessorFn: (row) => `${row.name}`, header: labels.CLASS + ' ' +labels.NAME, size: DEFAULT_COL_SIZE },
    { accessorFn: (row) => `${row.section}`, header: labels.SECTION, size: DEFAULT_COL_SIZE },
    { accessorFn: (row) => `${row.teacherId.firstName} ${row.teacherId.lastName}`,
    header: `${labels.TEACHER} ${labels.NAME}`,
    //Add a link in a cell render
    Cell: ({ renderedCellValue, row }) => (
      <Link id="viewTeacherLink" to={`/teachers/view/${row.original.teacherId.id}`}>
        {renderedCellValue}
      </Link>
    ),}
  ]
  
  // all states
  const [listData, setListData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [inActionData, setInActionData] = useState({ id: undefined, data: undefined });
  const [screen, setScreen] = useState({ mode: 'list', class: 'col-md-12 mr-3' });
  const [paginations, setPaginations] = useState({});

  const {
    setShowProgressBar: showProgressBar,
    state: {
      ['asyncDropdown']: {
        result
      },
    },
  } = props;

  const {
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
    if (newUser) {
      const {response, error} = await post({ ...values, teacherId: values.teacherId.id })
      if (response && response.data) {
        fetchList();
        if(isSaveAndNew){
          setInActionData({ id: 'new' });
          amendScreenView('new')
          return;
        } 
        
        onView(event, response.data.id);
        showProgressBar(false)
        toastSuccess(toastMessages.CREATED.SUCCESS)
      } else {
        showProgressBar(false)
        toastError(toastMessages.ERROR+': '+ error.message)
      }
    } else {
      const oldData = listData.filter(p => p.id === inActionData.id);
      const newData = { ...values }
      if (_.isEqual(oldData[0], newData)) {
        toastWarning(toastMessages.UPDATES.NO_CHANGES_MADE);
        showProgressBar(false);
        return;
      }      
      const {response, error} = await update({ ...newData, teacherId: values.teacherId.id});
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

  return <div className="overflow-hidden pl-3 pr-3">
    <div className='shadow-sm bg-white rounded-lg mt-3 mb-3'>
      <ToolBar title={title + "'s"} mode={'List'} actionButtons={actionButtons} />
    </div>
    <div className='row m-0 p-0'>
      <div className={`shadow-sm bg-white rounded-lg p-0 mb-3 ${screen.class} `}>
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
          showProgressBar={showProgressBar}
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
