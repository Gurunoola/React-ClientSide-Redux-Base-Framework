import { connect } from 'react-redux';
import { events as EVENT } from '../ConstantManager';
import Login from './index';
import { allToastActions } from '../../components/toastActions';

const { LOGIN_GET_REQUESTED, AUTH_RESET, LOGOUT_GET_REQUESTED } = EVENT.AUTH;

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  sagaMethods: {
    login: data => {
      dispatch({ type: LOGIN_GET_REQUESTED, data });
    },
    authRest: () => {
      dispatch({ type: AUTH_RESET });
    },
    ...allToastActions
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
