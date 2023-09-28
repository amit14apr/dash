import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Checkbox, Button, PasswordInput, PasswordStrengthIndicator, SelectBox } from '../../Components';
import { regex, useForm, formValidation } from '../../_constants';
import currentLang from '../../Lang';
import './style.less';

import { userActions } from '../../_actions';

function Registration() {

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(RegistrationSubmit, formValidation);
    const dispatch = useDispatch();
    const users = useSelector(state => state)
    const [showStrengthPassword, setStrengthPassword] = useState(false);
    const [passwordSuggestion, setPasswordSuggestion] = useState({
        minChar: null,
        upperCase: null,
        lowerCase: null,
        number: null,
        specialChar: null
    });
    let history = useHistory();

    function RegistrationSubmit() {
        console.log('No errors, submit callback called!');
        const userData = {}
        userData.firstName = values.firstName;
        userData.lastName = values.lastName;
        userData.email = values.email;
        userData.userName = values.email;
        userData.password = values.password;
        userData.countryCode = values.country;
        dispatch(userActions.register(userData));
    }

    const handleFocus = (e) => {
        setStrengthPassword(true);
    }
    const handleBlur = (e) => {
        setStrengthPassword(false);
    }

    useEffect(() => {
        if (values.password || values.password == "") {
            const password = values.password;
            setPasswordSuggestion({
                minChar: password.length >= 8 ? true : false,
                upperCase: regex.IS_UPPERCASE.test(password) ? true : false,
                lowerCase: regex.IS_LOWERCASE.test(password) ? true : false,
                number: regex.IS_NUMBER.test(password) ? true : false,
                specialChar: regex.IS_SPECIAL_CHAR.test(password) ? true : false
            });
        }
    }, [values]);

    useEffect(() => {
        if (users.registration.register) {
            history.push({
                pathname: '/successform',
                state: { module: "Registration" }
            });
        }
    });

    return (
        <div className="register-module" style={{ marginTop: '40px' }}>
            <h4>{currentLang.Registration.CreateAccountText}</h4>
            <form name="form" className="register-form" onSubmit={e => handleSubmit(e, 'registerForm')} noValidate>
                <div className="comman-row-input-field" >
                    <Input
                        placeholder="Enter your first name"
                        error={errors.firstName}
                        value={values.firstName || ''}
                        onChange={handleChange}
                        required={true}
                        name="firstName"
                        fullWidth={false}
                        label={currentLang.Registration.FirstNameText}></Input>
                    <Input
                        placeholder="Enter your last name"
                        error={errors.lastName}
                        value={values.lastName || ''}
                        required={true}
                        name="lastName"
                        onChange={handleChange}
                        fullWidth={false}
                        label={currentLang.Registration.LastNameText}></Input>
                </div>
                <Input
                    placeholder="Enter your E-mail Address"
                    error={errors.email}
                    value={values.email || ''}
                    required={true}
                    name="email"
                    onChange={handleChange}
                    label={currentLang.Registration.EmailText}></Input>
                <PasswordInput
                    placeholder="Enter your password"
                    error={errors.password}
                    value={values.password || ''}
                    required={true}
                    name="password"
                    onChange={handleChange}
                    onFocus={e => handleFocus(e)}
                    onBlur={e => handleBlur(e)}
                    label={currentLang.Registration.PasswordText} />
                {showStrengthPassword && (
                    <PasswordStrengthIndicator
                        validity={passwordSuggestion}
                    />
                )}
                <PasswordInput
                    error={errors.confirmPassword}
                    value={values.confirmPassword || ''}
                    required={true}
                    name="confirmPassword"
                    onChange={handleChange}
                    onFocus={e => e}
                    onBlur={e => e}
                    placeholder="Enter your password again"
                    label={currentLang.Registration.ConfirmPasswordText} />
               
                <SelectBox
                    label={currentLang.Registration.CountryText}
                    error={errors.country}
                    name="country"
                    value={values.country}
                    options={['New Jersey', 'California', 'Ohio', 'New York']}
                    onChange={handleChange}
                />
                
                <Button label="Create account" size="large" type="submit"></Button>
            </form>
            <div style={{ marginTop: '10px' }}>{currentLang.Registration.AlreadyHaveAccountText} <b><a href="/login">{currentLang.Registration.LoginLinkText}</a></b></div>
        </div>
    );
}

export { Registration };