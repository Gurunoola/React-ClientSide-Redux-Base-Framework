import { toast } from 'react-toastify';

import { globalConfigs } from '../globalConfigs';

export const allToastActions = {
  toastSuccess: (msg = 'Ok') => {
    toast.success(msg, {...globalConfigs.toastConfig});
  },
  toastError: (msg = 'Error') => {
    toast.error(msg, globalConfigs.toastConfig);
  },
  toastWarning: (msg = 'Warning') => {
    toast.warn(msg, globalConfigs.toastConfig);
  },
  toastInfo: (msg = 'Info') => {
    toast.info(msg, globalConfigs.toastConfig);
  },
  toastDefault: (msg = 'Default') => {
    toast(msg, globalConfigs.toastConfig);
  },
};
