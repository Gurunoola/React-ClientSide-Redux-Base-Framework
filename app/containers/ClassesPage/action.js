import { connect } from 'react-redux';
import Classes from './index'; //change for new component
import { allToastActions } from './imports';
const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => ({
  sagaMethods: {
    ...allToastActions,
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Classes); //change for new component
