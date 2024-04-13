import { events as EVENT } from '../ConstantManager';

const { 
  NETWORK_ERROR,
  UNAUTORIZED,
  STUDENTS:{
    LIST_GET_SUCCESS: studentsGetSuccess
  },
  ROLES: {
    LIST_GET_SUCCESS: rolesGetSuccess
  },
  ACADEMIC_YEAR: {
    LIST_GET_SUCCESS: academicYearsGetSuccess
  },
  CLASSES: {
    LIST_GET_SUCCESS: classesGetSuccess
  },
  TEACHERS: {
    LIST_GET_SUCCESS: teachersGetSuccess
  }

  } = EVENT;

export const asyncDropdownReducer = (state = [], sagaResponse) => { // change for new component
  const { type } = sagaResponse
  switch (type) {
    case rolesGetSuccess:
      return {...state, roles: sagaResponse, fetching: false };
    case academicYearsGetSuccess:
      return {...state, academicYears: sagaResponse, fetching: false };
    case classesGetSuccess:
      return {...state, classes: sagaResponse, fetching: false};
    case teachersGetSuccess:
      return {...state, teachers: sagaResponse, fetching: false};
    default:
      return state;
  }
};

export default asyncDropdownReducer;