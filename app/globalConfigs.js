import { labels } from "./containers/ConstantManager";

const toastConfig = {
  position: 'bottom-left',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

const routes = {
  dashboard: { title: 'Dashboard', enabled: true, icon: 'columns-gap', path: '/', roles: ['admin', 'superAdmin']},
  students:{ title: 'Students', enabled: true, icon: 'mortarboard', path: '/students', roles:['admin', 'superAdmin', 'student', 'teacher']},
  classes : { title: 'Classes', enabled: true, icon: 'easel', roles:['admin', 'superAdmin'], path: '/classes'},
  teachers : { title: 'Teachers', enabled: true, icon: 'person-video3', roles:['admin', 'superAdmin', 'teacher'], path: '/teachers'},
  subjects : { title: 'Subjects', enabled: true, icon: 'journal-text', roles:['admin', 'superAdmin'], path: '/subjects'},
  exams : {  title: 'Exams', enabled: true, icon: 'book', roles:['admin', 'superAdmin'], 
    subMenu:[
      { title: 'Exams Schedule', enabled: true, icon: 'bookmark-star', roles:['admin', 'superAdmin'], path: '/exams'},
      { title: 'Exam Grades', enabled: true, icon: 'list-stars', roles:['admin', 'superAdmin'], path: '/grades'}
    ]},
  timetables: { title: 'TimeTable', enabled: true, icon: 'calendar-week', roles:['admin', 'superAdmin'], path: '/timetables'},
  attendance: { title: 'Attendance', enabled: true, icon: 'calendar2-check', roles:['admin', 'superAdmin'], path: '/attendance'},
  finances : { title: 'Finance', enabled: true, icon: 'currency-rupee', roles:['admin', 'superAdmin'], path: '/finance'},
  staff : { title: 'Staff', enabled: true, icon: 'person', roles:['admin', 'superAdmin'], path: '/finance'},
  transport : { title: 'Transport', enabled: true, icon: 'truck', roles:['admin', 'superAdmin'], path: '/finance'},
  userManagment : { title: 'User Managment', enabled: true, icon: 'person-check', roles:['superAdmin'], path: '/users'},
  contactDirectory : { title: 'Contact Directory', enabled: true, icon: 'person-video2', roles:['superAdmin'], path: '/contactDirectory'},
  org : { title: 'Organization', enabled: true, icon: 'building', roles:['superAdmin'], path: '/finance'},
  settings : { title: 'Settings', enabled: true, icon: 'sliders', roles:['superAdmin'], path: '/finance'}
}

const rolesRootPage = {
  superAdmin: '/',
  admin: '/',
  student: '/students',
  teacher: '/students'
}

const loggerConfigs = {
  tag: "V.E.D.I:",
  defaultSymbols: {
    trace: '??',
    success: '√',
    ok: '√',
    debug: 'i',
    info: 'i',
    warning: '‼',
    warn: '‼',
    error: '×'
  },
  terminalColors: {
    trace: '#3C9DFF',
    trace_: '#3C9DFF',
    success: '#26FF5C',
    success_: '#26FF5C',
    ok: '#26FF5C',
    ok_: '#26FF5C',
    debug: '#34DADA',
    debug_: '#34DADA',
    info: '#3C9DFF',
    info_: '#3C9DFF',
    warning: '#FFC926',
    warning_: '#FFC926',
    warn: '#FFC926',
    warn_: '#FFC926',
    error: '#F55256',
    error_: '#F55256',
  }
}

const httpCodes = {
  200: "OK",
  404: "Not Found",
  500: "Internal Server Error",
  401: "Unauthorized",
  405: "Method Not Allowed",
  410: "Gone",
  304: "Not Modified",
  501: "Not Implemented"
}

const brandConfig = {
  name: 'V.E.D.I',
  abrivation: 'V.E.D.I',
  website: 'https://www.vediapp.com/',
  logo: require('./img/brand.svg'),
  icon: require('./img/brandLogoIcon.png'),
  favIcon: require('./img/favicon.png'),
  showPoweredBy: true,
}

const appConfig = {
  secretKey: "my-secret-key-2",
  betaFlag: false,
  showSideBarOnLoad: true,
  showSideBarMoblieOnLoad: false,
  sideBarCollapsiable: true,
  showTopSearch: false,
  showTermsAndPrivacyPolicy: false,
  showRegistartionLink: false,
}

const dropDownOptions = {
  gender:[ labels.GENDER_MALE, labels.GENDER_FEMALE], 
  roles:[ labels.ROLE_SUPER_ADMIN, labels.ROLE_ADMIN,labels.ROLE_TEACHER, labels.ROLE_STUDENT],
  department:[ 'maths','physics','biology','kanada','english'],
  bloodGroup:[ labels.BLOOD_GROUP_AP,labels.BLOOD_GROUP_AN,labels.BLOOD_GROUP_BP,labels.BLOOD_GROUP_BN,labels.BLOOD_GROUP_ABP,
   labels.BLOOD_GROUP_ABN,labels.BLOOD_GROUP_OP,labels.BLOOD_GROUP_ON],
  maritalStatus:[ labels.MARRIED, labels.UNMARRIED],
  relationship:[ labels.FATHER, labels.MOTHER, labels.GUARDIAN]
}

const schoolConfig = {
  name: "School new",
  tagLine: "School Tag Line",
  address: "School Address",
  contact: "School Contact",
  email: "School Email",
  logo: require('./img/clientLogo.png'),
  logoIcon: require('./img/clientLogoIcon.png'),
  favIcon: require('./img/favicon.png'),
  website: "School Website",
  socialMedia: "School Social Media",
  about: "School About",
  motto: "School Motto",
  vision: "School Vision",
  mission: "School Mission",
  history: "School History",
  affiliation: "School Affiliation",
  board: "School Board",
  principal: "School Principal",
  vicePrincipal: "School Vice Principal",
  chairman: "School Chairman",
  dayStartTime: '8:00 AM',
  dayEndTime: '4:00 PM',
  classDuration: "45 min",
  breaks: [
    { breakNumber: 1, title:"Quick Break", startTime: '10:00', endTime: '10:15' },
    { breakNumber: 2, title: "Lunch Break", startTime: '12:15', endTime: '13:00' }
  ],
}

export const globalConfigs = {
  appConfig,
  toastConfig,
  loggerConfigs,
  routes,
  rolesRootPage,
  httpCodes,
  dropDownOptions,
  schoolConfig,
  brandConfig
};


