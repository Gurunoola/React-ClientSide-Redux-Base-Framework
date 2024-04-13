import { labels, requiredAsterisk } from './labels';
import validationErrorMessages from './validationErrorMessages';
import events from './events';
import toastMessages from './toastMessages';
import defaults from './defaultValues';
import validationRules from './validationRules';
import svgIconPaths from './svgIconPaths';

const basicValidationRules = {
  ...validationRules.required,
  ...validationRules.minLength3,
  ...validationRules.maxLength50, 
}
export {
  labels,
  requiredAsterisk,
  validationErrorMessages,
  events,
  toastMessages,
  defaults,
  validationRules,
  basicValidationRules,
  svgIconPaths
};
