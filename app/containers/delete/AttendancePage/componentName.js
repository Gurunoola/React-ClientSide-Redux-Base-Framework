import { capitalizeString } from "../../helpers/utils";

export const componentNameSingular = 'attendance' //change for new component in lowercase in singular
export const componentName = `${componentNameSingular}s` //change for new component plural
export const componentNameCaps = componentName.toUpperCase();
export const componentNameCapitalize= capitalizeString(componentName);