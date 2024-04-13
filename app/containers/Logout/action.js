import { connect } from 'react-redux';
import Logout from './index'; //change for new component
import { events as EVENT } from '../ConstantManager';
import { allToastActions } from '../../components/toastActions';


const {
  LOGOUT_GET_REQUESTED
} = EVENT.AUTH;

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  sagaMethods: {
    logout: (refreshToken) => {
      dispatch({ type: LOGOUT_GET_REQUESTED, refreshToken: refreshToken });
    },
    ...allToastActions,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout); //change for new component
