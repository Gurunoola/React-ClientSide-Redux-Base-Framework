export default {
  // common
  UNAUTORIZED: 'unautorizedAccess',
  NETWORK_ERROR: 'network/error',
  RESET_EVENT: 'reset/event',
  PROGRESS_BAR: 'event/progressBar',
  PROGRESS_BAR_SHOW: 'show/progressBar',
  PROGRESS_BAR_HIDE: 'hide/progressBar',

  AUTH: {
    LOGOUT_GET_REQUESTED: 'logout/GetRequested',
    LOGOUT_GET_SUCCESS: 'logout/GetSuccess',
    LOGOUT_GET_FAILED: 'logout/GetFailed',
    LOGIN_GET_REQUESTED: 'login/GetRequested',
    LOGIN_GET_SUCCESS: 'login/GetSuccess',
    LOGIN_GET_FAILED: 'login/GetFailed',
    AUTH_RESET: 'auth/Reset',
  },
  REGISTRATION: {
    REGISTRATION_POST_REQUESTED: 'registration/PostRequested',
    REGISTRATION_POST_SUCCESS: 'registration/PostSuccess',
    REGISTRATION_POST_FAILED: 'registration/PostFailed',
  },
  BASES: {
    LIST_GET_REQUESTED: 'bases/GetRequested',
    LIST_GET_SUCCESS: 'bases/GetSuccess',
    LIST_GET_FAILED: 'bases/GetFailed',

    GET_REQUESTED: 'base/GetRequested',
    GET_SUCCESS: 'base/GetSuccess',
    GET_FAILED: 'base/GetFailed',

    POST_REQUESTED: 'base/PostRequested',
    POST_SUCCESS: 'base/PostSuccess',
    POST_FAILED: 'base/PostFailed',

    UPDATE_REQUESTED: 'base/UpdatedRequested',
    UPDATE_SUCCESS: 'base/UpdatedSuccess',
    UPDATE_FAILED: 'base/UpdatedFailed',

    DELETE_REQUESTED: 'base/DeleteRequested',
    DELETE_SUCCESS: 'base/DeleteSuccess',
    DELETE_FAILED: 'base/DeleteFailed',
  },
  HOMES: {
    LIST_GET_REQUESTED: 'homes/GetRequested',
    LIST_GET_SUCCESS: 'homes/GetSuccess',
    LIST_GET_FAILED: 'homes/GetFailed',

    GET_REQUESTED: 'home/GetRequested',
    GET_SUCCESS: 'home/GetSuccess',
    GET_FAILED: 'home/GetFailed',

    POST_REQUESTED: 'home/PostRequested',
    POST_SUCCESS: 'home/PostSuccess',
    POST_FAILED: 'home/PostFailed',

    UPDATE_REQUESTED: 'home/UpdatedRequested',
    UPDATE_SUCCESS: 'home/UpdatedSuccess',
    UPDATE_FAILED: 'home/UpdatedFailed',

    DELETE_REQUESTED: 'home/DeleteRequested',
    DELETE_SUCCESS: 'home/DeleteSuccess',
    DELETE_FAILED: 'home/DeleteFailed',
  },
  STUDENTS: {
    LIST_GET_REQUESTED: 'students/GetRequested',
    LIST_GET_SUCCESS: 'students/GetSuccess',
    LIST_GET_FAILED: 'students/GetFailed',

    GET_REQUESTED: 'student/GetRequested',
    GET_SUCCESS: 'student/GetSuccess',
    GET_FAILED: 'student/GetFailed',

    POST_REQUESTED: 'student/PostRequested',
    POST_SUCCESS: 'student/PostSuccess',
    POST_FAILED: 'student/PostFailed',

    UPDATE_REQUESTED: 'student/UpdatedRequested',
    UPDATE_SUCCESS: 'student/UpdatedSuccess',
    UPDATE_FAILED: 'student/UpdatedFailed',

    DELETE_REQUESTED: 'student/DeleteRequested',
    DELETE_SUCCESS: 'student/DeleteSuccess',
    DELETE_FAILED: 'student/DeleteFailed',
  },
  USERS: {
    LIST_GET_REQUESTED: 'users/GetRequested',
    LIST_GET_SUCCESS: 'users/GetSuccess',
    LIST_GET_FAILED: 'users/GetFailed',

    GET_REQUESTED: 'user/GetRequested',
    GET_SUCCESS: 'user/GetSuccess',
    GET_FAILED: 'user/GetFailed',

    POST_REQUESTED: 'user/PostRequested',
    POST_SUCCESS: 'user/PostSuccess',
    POST_FAILED: 'user/PostFailed',

    UPDATE_REQUESTED: 'user/UpdatedRequested',
    UPDATE_SUCCESS: 'user/UpdatedSuccess',
    UPDATE_FAILED: 'user/UpdatedFailed',

    DELETE_REQUESTED: 'user/DeleteRequested',
    DELETE_SUCCESS: 'user/DeleteSuccess',
    DELETE_FAILED: 'user/DeleteFailed',
  },
  TEACHERS: {
    LIST_GET_REQUESTED: 'teachers/GetRequested',
    LIST_GET_SUCCESS: 'teachers/GetSuccess',
    LIST_GET_FAILED: 'teachers/GetFailed',

    GET_REQUESTED: 'teacher/GetRequested',
    GET_SUCCESS: 'teacher/GetSuccess',
    GET_FAILED: 'teacher/GetFailed',

    POST_REQUESTED: 'teacher/PostRequested',
    POST_SUCCESS: 'teacher/PostSuccess',
    POST_FAILED: 'teacher/PostFailed',

    UPDATE_REQUESTED: 'teacher/UpdatedRequested',
    UPDATE_SUCCESS: 'teacher/UpdatedSuccess',
    UPDATE_FAILED: 'teacher/UpdatedFailed',

    DELETE_REQUESTED: 'teacher/DeleteRequested',
    DELETE_SUCCESS: 'teacher/DeleteSuccess',
    DELETE_FAILED: 'teacher/DeleteFailed',
  },
  ATTENDANCES: {
    LIST_GET_REQUESTED: 'attendances/GetRequested',
    LIST_GET_SUCCESS: 'attendances/GetSuccess',
    LIST_GET_FAILED: 'attendances/GetFailed',

    GET_REQUESTED: 'attendance/GetRequested',
    GET_SUCCESS: 'attendance/GetSuccess',
    GET_FAILED: 'attendance/GetFailed',

    POST_REQUESTED: 'attendance/PostRequested',
    POST_SUCCESS: 'attendance/PostSuccess',
    POST_FAILED: 'attendance/PostFailed',

    UPDATE_REQUESTED: 'attendance/UpdatedRequested',
    UPDATE_SUCCESS: 'attendance/UpdatedSuccess',
    UPDATE_FAILED: 'attendance/UpdatedFailed',

    DELETE_REQUESTED: 'attendance/DeleteRequested',
    DELETE_SUCCESS: 'attendance/DeleteSuccess',
    DELETE_FAILED: 'attendance/DeleteFailed',
  },
  ROLES: {
    LIST_GET_REQUESTED: 'roles/GetRequested',
    LIST_GET_SUCCESS: 'roles/GetSuccess',
    LIST_GET_FAILED: 'roles/GetFailed',

    GET_REQUESTED: 'role/GetRequested',
    GET_SUCCESS: 'role/GetSuccess',
    GET_FAILED: 'role/GetFailed',

    POST_REQUESTED: 'role/PostRequested',
    POST_SUCCESS: 'role/PostSuccess',
    POST_FAILED: 'role/PostFailed',

    UPDATE_REQUESTED: 'role/UpdatedRequested',
    UPDATE_SUCCESS: 'role/UpdatedSuccess',
    UPDATE_FAILED: 'role/UpdatedFailed',

    DELETE_REQUESTED: 'role/DeleteRequested',
    DELETE_SUCCESS: 'role/DeleteSuccess',
    DELETE_FAILED: 'role/DeleteFailed',
  },
  ACADEMIC_YEAR: {
    LIST_GET_REQUESTED: 'academicYears/GetRequested',
    LIST_GET_SUCCESS: 'academicYears/GetSuccess',
    LIST_GET_FAILED: 'academicYears/GetFailed',

    GET_REQUESTED: 'academicYear/GetRequested',
    GET_SUCCESS: 'academicYear/GetSuccess',
    GET_FAILED: 'academicYear/GetFailed',

    POST_REQUESTED: 'academicYear/PostRequested',
    POST_SUCCESS: 'academicYear/PostSuccess',
    POST_FAILED: 'academicYear/PostFailed',

    UPDATE_REQUESTED: 'academicYear/UpdatedRequested',
    UPDATE_SUCCESS: 'academicYear/UpdatedSuccess',
    UPDATE_FAILED: 'academicYear/UpdatedFailed',

    DELETE_REQUESTED: 'academicYear/DeleteRequested',
    DELETE_SUCCESS: 'academicYear/DeleteSuccess',
    DELETE_FAILED: 'academicYear/DeleteFailed',
  },
  CLASSES: {
    LIST_GET_REQUESTED: 'classes/GetRequested',
    LIST_GET_SUCCESS: 'classes/GetSuccess',
    LIST_GET_FAILED: 'classes/GetFailed',

    GET_REQUESTED: 'class/GetRequested',
    GET_SUCCESS: 'class/GetSuccess',
    GET_FAILED: 'class/GetFailed',

    POST_REQUESTED: 'class/PostRequested',
    POST_SUCCESS: 'class/PostSuccess',
    POST_FAILED: 'class/PostFailed',

    UPDATE_REQUESTED: 'class/UpdatedRequested',
    UPDATE_SUCCESS: 'class/UpdatedSuccess',
    UPDATE_FAILED: 'class/UpdatedFailed',

    DELETE_REQUESTED: 'class/DeleteRequested',
    DELETE_SUCCESS: 'class/DeleteSuccess',
    DELETE_FAILED: 'class/DeleteFailed',
  },
  SUBJECTS: {
    LIST_GET_REQUESTED: 'subjects/GetRequested',
    LIST_GET_SUCCESS: 'subjects/GetSuccess',
    LIST_GET_FAILED: 'subjects/GetFailed',

    GET_REQUESTED: 'subject/GetRequested',
    GET_SUCCESS: 'subject/GetSuccess',
    GET_FAILED: 'subject/GetFailed',

    POST_REQUESTED: 'subject/PostRequested',
    POST_SUCCESS: 'subject/PostSuccess',
    POST_FAILED: 'subject/PostFailed',

    UPDATE_REQUESTED: 'subject/UpdatedRequested',
    UPDATE_SUCCESS: 'subject/UpdatedSuccess',
    UPDATE_FAILED: 'subject/UpdatedFailed',

    DELETE_REQUESTED: 'subject/DeleteRequested',
    DELETE_SUCCESS: 'subject/DeleteSuccess',
    DELETE_FAILED: 'subject/DeleteFailed',
  },
  EXAMS: {
    LIST_GET_REQUESTED: 'exams/GetRequested',
    LIST_GET_SUCCESS: 'exams/GetSuccess',
    LIST_GET_FAILED: 'exams/GetFailed',

    GET_REQUESTED: 'exam/GetRequested',
    GET_SUCCESS: 'exam/GetSuccess',
    GET_FAILED: 'exam/GetFailed',

    POST_REQUESTED: 'exam/PostRequested',
    POST_SUCCESS: 'exam/PostSuccess',
    POST_FAILED: 'exam/PostFailed',

    UPDATE_REQUESTED: 'exam/UpdatedRequested',
    UPDATE_SUCCESS: 'exam/UpdatedSuccess',
    UPDATE_FAILED: 'exam/UpdatedFailed',

    DELETE_REQUESTED: 'exam/DeleteRequested',
    DELETE_SUCCESS: 'exam/DeleteSuccess',
    DELETE_FAILED: 'exam/DeleteFailed',
  },
  ADDRESS: {
    LIST_GET_REQUESTED: 'addresss/GetRequested',
    LIST_GET_SUCCESS: 'addresss/GetSuccess',
    LIST_GET_FAILED: 'addresss/GetFailed',

    GET_REQUESTED: 'address/GetRequested',
    GET_SUCCESS: 'address/GetSuccess',
    GET_FAILED: 'address/GetFailed',

    POST_REQUESTED: 'address/PostRequested',
    POST_SUCCESS: 'address/PostSuccess',
    POST_FAILED: 'address/PostFailed',

    UPDATE_REQUESTED: 'address/UpdatedRequested',
    UPDATE_SUCCESS: 'address/UpdatedSuccess',
    UPDATE_FAILED: 'address/UpdatedFailed',

    DELETE_REQUESTED: 'address/DeleteRequested',
    DELETE_SUCCESS: 'address/DeleteSuccess',
    DELETE_FAILED: 'address/DeleteFailed',
  },
  ALERTS: {
    SHOW_SUCCESS_ALERT: 'alerts/ShowSuccess',
  },
  GRADES: {
    LIST_GET_REQUESTED: 'grades/GetRequested',
    LIST_GET_SUCCESS: 'grades/GetSuccess',
    LIST_GET_FAILED: 'grades/GetFailed',

    GET_REQUESTED: 'grade/GetRequested',
    GET_SUCCESS: 'grade/GetSuccess',
    GET_FAILED: 'grade/GetFailed',

    POST_REQUESTED: 'grade/PostRequested',
    POST_SUCCESS: 'grade/PostSuccess',
    POST_FAILED: 'grade/PostFailed',

    UPDATE_REQUESTED: 'grade/UpdatedRequested',
    UPDATE_SUCCESS: 'grade/UpdatedSuccess',
    UPDATE_FAILED: 'grade/UpdatedFailed',

    DELETE_REQUESTED: 'grade/DeleteRequested',
    DELETE_SUCCESS: 'grade/DeleteSuccess',
    DELETE_FAILED: 'grade/DeleteFailed',
  },
  TIMETABLES: {
    LIST_GET_REQUESTED: 'timetables/GetRequested',
    LIST_GET_SUCCESS: 'timetables/GetSuccess',
    LIST_GET_FAILED: 'timetables/GetFailed',
    LIST_GET_FIND_BY_QUERY_REQUESTED: 'timetables/GetFindByQuery/Requested',
    LIST_GET_FIND_BY_QUERY_SUCCESS: 'timetables/GetFindByQuery/Success',
    LIST_GET_FIND_BY_QUERY_FAILED: 'timetables/GetFindByQuery/Failed',


    GET_REQUESTED: 'timetable/GetRequested',
    GET_SUCCESS: 'timetable/GetSuccess',
    GET_FAILED: 'timetable/GetFailed',

    POST_REQUESTED: 'timetable/PostRequested',
    POST_SUCCESS: 'timetable/PostSuccess',
    POST_FAILED: 'timetable/PostFailed',

    UPDATE_REQUESTED: 'timetable/UpdatedRequested',
    UPDATE_SUCCESS: 'timetable/UpdatedSuccess',
    UPDATE_FAILED: 'timetable/UpdatedFailed',

    DELETE_REQUESTED: 'timetable/DeleteRequested',
    DELETE_SUCCESS: 'timetable/DeleteSuccess',
    DELETE_FAILED: 'timetable/DeleteFailed',
  },
};
