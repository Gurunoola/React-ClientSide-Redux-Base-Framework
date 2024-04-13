import { _ } from './imports';

export const componentNameSingular = 'class' //change for new component in lowercase
export const componentName = `${componentNameSingular}s` //change for new component plural
export const componentNameCaps = _.toUpper(componentName);
export const componentNameCapitalize= _.capitalize(componentName);