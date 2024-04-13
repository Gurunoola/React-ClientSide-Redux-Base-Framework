import { connect } from 'react-redux';
import Dashboard from './index'; //change for new component
import { allToastActions } from '../../components/toastActions';

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  sagaMethods: {
    ...allToastActions,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard); //change for new component
