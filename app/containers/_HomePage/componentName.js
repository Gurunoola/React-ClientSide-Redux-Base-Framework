import { capitalizeString } from "../../helpers/utils";

export const componentNameSingular = 'home' //change for new component in lowercase
export const componentName = `${componentNameSingular}s` //change for new component plural
export const componentNameCaps = componentName.toUpperCase();
export const componentNameCapitalize= capitalizeString(componentName);

// export default {
//     componentNameSingular: 'home', 
//     componentName : `homes`,
//     componentNameCaps: 'HOMES',
//     componentNameCapitalize: 'Homes' 
// }