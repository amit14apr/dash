export const regex = {
    ALPHA: /^[a-zA-Z]+$/,
    EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    IS_NUMBER : /\d/,
    IS_UPPERCASE : /(?=.*[A-Z])/,
    IS_LOWERCASE : /(?=.*[a-z])/,
    IS_SPECIAL_CHAR : /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
}
export const userFormValidation = {
    firstName: "Please enter your first name",
    lastName: "Please enter your last name",
    incorrectName: "Please enter only alphabets",
    email: "Please enter your email",
    incorrectEmail: "Email is Incorrect",
    password: "Please enter your password",
    passwordLowerTextError : "Password must contain a lowercase letter",
    passwordUpperTextError : "Password must contain an uppercase letter",
    passwordTextError : "Password must contain a number or symbol",
    passwordLengthError: "Password must be 8 or more characters",
    confirmPassword: "Please enter your confirm password",
    comparePassword: "Password and confirm password should be same",
    country: "Please select emirate",
}