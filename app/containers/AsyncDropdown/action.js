import { connect } from 'react-redux';
import AsyncDropdown from './index'; //change for new component
import { events as EVENT } from '../ConstantManager';
import { allToastActions } from '../../components/toastActions';

const { 
  
  STUDENTS:{
    LIST_GET_REQUESTED: studentGetRequested
  },
  ROLES:{
    LIST_GET_REQUESTED: rolesGetRequested
  },
  ACADEMIC_YEAR: {
    LIST_GET_REQUESTED: academicYearsGetRequested
  },
  CLASSES: {
    LIST_GET_REQUESTED: classesGetRequested
  },
  TEACHERS: {
    LIST_GET_REQUESTED: teachersGetRequested
  },
  SUBJECTS: {
    LIST_GET_REQUESTED: subjectsGetRequested
  },
  } = EVENT;

const mapStateToProps = state => ({ state });


const mapDispatchToProps = dispatch => ({
  sagaMethods: {
    getAcademicYearsList: (page, pageLimit) => {
      dispatch({ type: academicYearsGetRequested, options: { page, pageLimit } });
    },
    getRolesList: (page, pageLimit) => {
      dispatch({ type: rolesGetRequested, options: { page, pageLimit } });
    },
    getClassesList: (page, pageLimit) => {
      dispatch({ type: classesGetRequested, options: { page, pageLimit } });
    },
    getTeachersList: (page, pageLimit) => {
      dispatch({ type: teachersGetRequested, options: { page, pageLimit } });
    },
    getSubjectsList: (page, pageLimit) => {
      dispatch({ type: subjectsGetRequested, options: { page, pageLimit } });
    },
    getBloodGroupList: () =>{
      dispatch({ type: 'bloodGroupReq'});
    },
    ...allToastActions,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AsyncDropdown); //change for new component
