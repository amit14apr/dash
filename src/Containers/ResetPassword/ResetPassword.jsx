import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Input, Checkbox, Button, PasswordInput, PasswordStrengthIndicator, SelectBox } from '../../Components';
import { regex, useForm, formValidation } from '../../_constants';
import currentLang from '../../Lang';
import './style.less';

import { userActions } from '../../_actions';

function ResetPassword() {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(ResetPasswordSubmit, formValidation);
    const [showStrengthPassword, setStrengthPassword] = useState(false);
    const [passwordSuggestion, setPasswordSuggestion] = useState({
        minChar: null,
        upperCase: null,
        lowerCase: null,
        number: null,
        specialChar: null
    });
    let history = useHistory();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)

    function ResetPasswordSubmit() {
        console.log("Call reset end point")
        dispatch(userActions.resetpassword(values.password));
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
        if (users.resetPasswordSuccess) {
            history.push({
                pathname: '/successform',
                state: { module: "ResetPassword" }
            });
        }
    });

    return (
        <div className="forgotPass-cont">
            <h3 style={{ marginTop: '20px' }}>{currentLang.ResetPassword.TitleText}</h3>
            <br />
            <form name="form" className="resetPassword-form" onSubmit={e => handleSubmit(e, 'resetPasswordForm')} noValidate>
                <PasswordInput
                    placeholder="Enter your new password"
                    error={errors.password}
                    value={values.password || ''}
                    required={true}
                    name="password"
                    onChange={handleChange}
                    onFocus={e => handleFocus(e)}
                    onBlur={e => handleBlur(e)}
                    label={currentLang.ResetPassword.PasswordText} />
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
                    placeholder="Enter your new password again"
                    label={currentLang.ResetPassword.ConfirmPasswordText} />
                <Button label="Save" size="large" type="submit"></Button>
            </form>
        </div>
    );
}

export { ResetPassword };