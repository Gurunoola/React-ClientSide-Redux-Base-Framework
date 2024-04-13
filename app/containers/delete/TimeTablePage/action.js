import { connect } from 'react-redux';
import Timetables from './index'; //change for new component
import { events as EVENT } from '../ConstantManager';
import { allToastActions } from '../../components/toastActions';
import { componentNameCaps } from './componentName';

const {
  LIST_GET_REQUESTED,
  GET_REQUESTED,
  POST_REQUESTED,
  UPDATE_REQUESTED,
  DELETE_REQUESTED,
  LIST_GET_FIND_BY_QUERY_REQUESTED
} = EVENT[componentNameCaps];

const {
  GET_REQUESTED: attendanceListRequested,
} = EVENT['ATTENDANCES'];

const { RESET_EVENT} = EVENT

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  sagaMethods: {
    getList: (page, pageLimit) => {
      dispatch({ type: LIST_GET_REQUESTED, options: { page, pageLimit } });
    },
    get: id => {
      dispatch({ type: GET_REQUESTED, id });
    },
    post: data => {
      dispatch({ type: POST_REQUESTED, data });
    },
    update: data => {
      dispatch({ type: UPDATE_REQUESTED, data });
    },
    remove: id => {
      dispatch({ type: DELETE_REQUESTED, id });
    },
    resetEvent: () => { 
      dispatch({ type: RESET_EVENT }); 
    },
    findByQuery: query => {
      dispatch({type: LIST_GET_FIND_BY_QUERY_REQUESTED , query});
    },
    ...allToastActions,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timetables); //change for new component
