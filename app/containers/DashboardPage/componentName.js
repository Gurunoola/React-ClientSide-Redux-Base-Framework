import { capitalizeString } from "../../helpers/utils";

export const componentNameSingular = 'dashboard' //change for new component in lowercase
export const componentName = `${componentNameSingular}s` //change for new component plural
export const componentNameCaps = componentName.toUpperCase();
export const componentNameCapitalize= capitalizeString(componentName);