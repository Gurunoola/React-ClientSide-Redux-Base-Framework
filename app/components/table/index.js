import React, { useMemo } from 'react';
import { 
  MaterialReactTable,
  MRT_FullScreenToggleButton,
  MRT_ToggleDensePaddingButton,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  MRT_ToggleGlobalFilterButton 
} from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';
import {  Box,  IconButton,  Tooltip,} from '@mui/material';
import {Icon } from '../'


const icons = {
  ClearAllIcon: () => <Icon size='18px' icon='x' type="secondary" />,
  DensityLargeIcon: () => <Icon size='18px' icon='view-list' type="warning" />,
  DensityMediumIcon: () => <Icon size='18px' icon='view-list' type="secondary" />,
  DensitySmallIcon: () => <Icon size='18px' icon='view-list' type="primary" />,
  FilterListIcon: () => <Icon size='18px' icon='funnel' type="secondary" />,
  FilterListOffIcon: () => <Icon size='18px' icon='funnel' type="primary" />,
  FullscreenExitIcon: () => <Icon size='18px'  icon='fullscreen-exit' type="primary" />,
  FullscreenIcon: () => <Icon size='18px' icon='fullscreen' type="secondary" />,
  SearchIcon: () => <Icon size='18px' icon='search'  type="secondary" />,
  SearchOffIcon: () => <Icon size='18px' icon='search' type="primary" />,
  SortIcon: (props) => (
    <Icon size='18px' icon='arrow-down' type="primary" {...props} />
  )
};

const Table = ({ 
  toolBar,
  markPresent,
  columns,
  tabledata,
  onEdit,
  onView,
  onDelete,
  enableRowActions = false,
  rowActions = ['edit'],
  enableDensityToggle = true,
  enableColumnActions = false,
  enableClickToCopy = false,
  enablePagination = true,
  enableColumnFilterModes = false,
  enableHiding = false,
  enableGlobalFilterModes = true,
  enableRowSelection = false,
  enableColumnResizing = false,
  positionActionsColumn = 'last',
  layoutMode = 'grid-no-grow',
  showColumnFilters = false,
  columnVisibility = {'id': false}
}) => {
  
  const memoColumns = useMemo(() => columns,[]);

  return <MaterialReactTable
    columns={memoColumns}
    data={tabledata}
    enableRowActions={enableRowActions}
    enableDensityToggle={enableDensityToggle}
    enableColumnActions={enableColumnActions}
    enableClickToCopy={enableClickToCopy}
    enablePagination={enablePagination}
    enableColumnFilterModes={enableColumnFilterModes}
    enableHiding={enableHiding}
    enableGlobalFilterModes= {enableGlobalFilterModes}
    enableRowSelection={enableRowSelection}
    enableColumnResizing={enableColumnResizing}
    positionActionsColumn={positionActionsColumn}
    layoutMode={layoutMode}    
    getRowId={(row) => row.id}
    icons={icons}
    muiTableBodyRowProps={({ row }) => ({
      onClick: (event) => {
        event.preventDefault();
        onView(event, row.id) },
        sx: { cursor: 'pointer' },
    })}
    initialState={{
      columnVisibility: { ...columnVisibility },
      showColumnFilters: showColumnFilters
    }}
    renderRowActions={({ row }) => (
      rowActions.map((action) => {
        if (action === 'edit') {
          return (
            <Box sx={{ display: 'inline', gap: '2px' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton size='small' onClick={(event) => onEdit(event, row.id)}>
                <Edit fontSize='12px' style={{color: 'var(--primary)'}} />
              </IconButton>
            </Tooltip>
          </Box>
          );
        } else if (action === 'delete') {
          return (
            <Box sx={{ display: 'inline', gap: '2px' }}>
            <Tooltip arrow placement="left" title="Delete">
              <IconButton size='small' onClick={(event) => onDelete(event, row.id)}>
                <Delete fontSize='12px' style={{color: 'var(--danger)'}} />
              </IconButton>
            </Tooltip>
          </Box>
          );
        }
      })
    )}
    renderTopToolbar={({ table }) => {
      const handleMarkingAttendance = () => {
        const list = table.getSelectedRowModel().flatRows.map(item=>item.id)
        markPresent(list)
      };
      return (
        <div className="row mr-0 ml-0 pb-0 border-bottom pt-1 pb-1" style={{backgroundColor: '#f1f3fa'}}>
          <div className='col-6'>
            <div className="d-flex flex-row align-items-stretch">
              <div className='bg-gray-200 rounded-sm mr-1 ml-1'>
                {toolBar}
              </div>
              { markPresent ? <div className='bg-gray-200 rounded-sm mr-1 ml-1'> 
                <button className='btn text-primary' color="primary" onClick={handleMarkingAttendance} variant="contained">
                  Mark Present
                </button> 
              </div> : undefined }
            </div>
          </div>
          <div className='col-6'>
            <div className="d-flex flex-row-reverse">
              <div className=''><MRT_FullScreenToggleButton className='text-primary p-1 pt-2 pb-2' table={table} /></div>
              <div className=''><MRT_ToggleDensePaddingButton className='text-primary p-1 pt-2 pb-2' table={table} /></div>
              <div className=''><MRT_ToggleFiltersButton  className='text-primary p-1 pt-2 pb-2' table={table} /></div>
              <div className=''> <MRT_ToggleGlobalFilterButton className='text-primary p-1 pt-2 pb-2' table={table} /></div>
              <div className=''> <MRT_GlobalFilterTextField className='text-primary p-1 pt-2 pb-2' showGlobalFilter={false} table={table} /></div>
            </div>
          </div>
        </div>
      );
    }}
  />;
};

export default Table;
