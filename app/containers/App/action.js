import { connect } from 'react-redux';
import App from './index';
import { events as EVENT } from '../ConstantManager';

const { SHOW_SUCCESS_ALERT, SHOW_PROGRESSBAR } = EVENT.ALERTS;

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  sagaMethods: {
    showSuccess: msg => {
      dispatch({ type: SHOW_SUCCESS_ALERT, msg });
    },
    showProgressBar: status => {
      dispatch({ type: SHOW_PROGRESSBAR, status });
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
