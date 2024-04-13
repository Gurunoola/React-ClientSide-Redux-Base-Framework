import { connect } from 'react-redux';
import Main from './index'; //change for new component
import { events as EVENT } from '../ConstantManager';
import { allToastActions } from '../../components/toastActions';
import { componentName, componentNameCaps } from './componentName';

const {
  LIST_GET_REQUESTED,
  GET_REQUESTED,
  POST_REQUESTED,
  UPDATE_REQUESTED,
  DELETE_REQUESTED,
} = EVENT[componentNameCaps];

const mapStateToProps = state => ({ state });

export const getList = () => ({
  type: LIST_GET_REQUESTED,
})


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
    ...allToastActions,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main); //change for new component
