import { regex, userFormValidation } from '/';
export const formValidation = (values, formName) => {
  let errors = {};
  const validateSuggestionPassword = (password) => {
    let errorText = null;
    let number, specialChar = null;
    number = regex.IS_NUMBER.test(password) ? true : false;
    specialChar = regex.IS_SPECIAL_CHAR.test(password) ? true : false;
    if (number || specialChar) {
      errorText = null;
    } else {
      errorText = userFormValidation.passwordTextError;
    }
    if (values.password.length < 8) {
      errorText = userFormValidation.passwordLengthError;
    }
    if (!regex.IS_UPPERCASE.test(password)) {
      errorText = userFormValidation.passwordUpperTextError;
    }
    if (!regex.IS_LOWERCASE.test(password)) {
      errorText = userFormValidation.passwordLowerTextError;
    }
    return errorText;
  }
  switch (formName) {
    case 'loginForm':
      if (!values.email) {
        errors.email = userFormValidation.email;
      } else if (!regex.EMAIL.test(values.email)) {
        errors.email = userFormValidation.incorrectEmail;
      }
      if (!values.password) {
        errors.password = userFormValidation.password;
      } else if (values.password.length < 8) {
        errors.password = userFormValidation.passwordLengthError;
      }
      break;
    case 'registerForm':
      if (!values.firstName) {
        errors.firstName = userFormValidation.firstName;
      } else if (!regex.ALPHA.test(values.firstName)) {
        errors.firstName = userFormValidation.incorrectName;
      }
      if (!values.lastName) {
        errors.lastName = userFormValidation.lastName;
      } else if (!regex.ALPHA.test(values.lastName)) {
        errors.lastName = userFormValidation.incorrectName;
      }
      if (!values.email) {
        errors.email = userFormValidation.email;
      } else if (!regex.EMAIL.test(values.email)) {
        errors.email = userFormValidation.incorrectEmail;
      }
      if (!values.password) {
        errors.password = userFormValidation.password;
      } else if (values.password.length) {
        if (validateSuggestionPassword(values.password)) { errors.password = validateSuggestionPassword(values.password) };
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = userFormValidation.confirmPassword;
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = userFormValidation.comparePassword;
      }
      if (!values.country) {
        errors.country = userFormValidation.country;
      }
      break;
    case 'resetPasswordForm':
      if (!values.password) {
        errors.password = userFormValidation.password;
      } else if (values.password.length) {
        if (validateSuggestionPassword(values.password)) { errors.password = validateSuggestionPassword(values.password) };
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = userFormValidation.confirmPassword;
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = userFormValidation.comparePassword;
      }
      break;
    case 'forgetPasswordForm':
      if (!values.email) {
        errors.email = userFormValidation.email;
      } else if (!regex.EMAIL.test(values.email)) {
        errors.email = userFormValidation.incorrectEmail;
      }
    default:
      break;

  }
  return errors;
};