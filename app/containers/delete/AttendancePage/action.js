import { connect } from 'react-redux';
import Attendances from './index'; //change for new component
import { events as EVENT } from '../ConstantManager';
import { allToastActions } from '../../components/toastActions';
import { componentNameCaps } from './componentName';

const {
  LIST_GET_REQUESTED,
  GET_REQUESTED,
  POST_REQUESTED,
  UPDATE_REQUESTED,
  DELETE_REQUESTED,
} = EVENT[componentNameCaps];

const {
  LIST_GET_REQUESTED: studentsListRequested,
} = EVENT.STUDENTS;

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
    getStudentsList: (page, pageLimit) => {
      dispatch({type: studentsListRequested, options: { page, pageLimit } })
    },
    ...allToastActions,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Attendances); //change for new component
