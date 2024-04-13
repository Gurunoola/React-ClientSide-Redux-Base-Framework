import { connect } from 'react-redux';
import { events as EVENT } from '../ConstantManager';
import Registration from './index';
import { allToastActions } from '../../components/toastActions';

const { REGISTRATION_POST_REQUESTED, REGISTRATION_POST_SUCCESS, REGISTRATION_POST_FAILED } = EVENT.REGISTRATION;
const { POST_REQUESTED } = EVENT.STUDENTS;
const {RESET_EVENT} = EVENT

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  sagaMethods: {
    postRegister: data => {
      dispatch({ type: POST_REQUESTED, data });
    },
    resetEvent: () => { 
      dispatch({ type: RESET_EVENT }); 
    },
    ...allToastActions
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
