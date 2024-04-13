import validationErrorMessages from './validationErrorMessages';
export default {
    required: { required: validationErrorMessages.REQUIRED },
    minLength3: { minLength: {value: 3, message: validationErrorMessages.MIN_LENGTH + '3' }},
    maxLength50: { maxLength:{value: 50, message: validationErrorMessages.MAX_LENGTH + '50' }},
    maxLength100: { maxLength:{value: 100, message: validationErrorMessages.MAX_LENGTH + '100' }},
    phone: {
      message: validationErrorMessages.PHONE,
      pattern: {
        value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
        message: "Invalid phone number"
      }
    },
    email: {
      message: validationErrorMessages.EMAIL,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Invalid email address"
      }
    },
    aadhaar: {
      message: validationErrorMessages.AADHAAR,
      pattern: {
        value: /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/,
        message: "Invalid Aadhaar number"
      }
    },
    pan: {
      message: validationErrorMessages.PAN,
      pattern: {
        value: /^[A-Z]{5}\d{4}[A-Za-z]{1}$/,
        message: "Invalid PAN number"
      }
    },
    pincode: {
      message: validationErrorMessages.PINCODE,
      pattern: {
        value: /^\d{6}$/,
        message: "Invalid pin code"
      }
    },
    dob: {
      message: validationErrorMessages.DOB,
      validate: {
        value: (value) => {
          const dob = new Date(value);
          const threeYearsAgo = new Date();
          threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
          return dob <= threeYearsAgo || "Must be at least 3 years old";
        }
      }
    },
    number: {
      pattern: {
        value: /^\d+(\.\d+)?$/,
        message: "Invalid Value"
      }
    }

  };