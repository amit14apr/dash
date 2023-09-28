import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Input, Checkbox, Button } from '../../Components';
import { regex, useForm, formValidation } from '../../_constants';
import { userActions } from '../../_actions';
import currentLang from '../../Lang';
import './style.less';


function ForgotPassword() {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(ForgetPasswordSubmit, formValidation);

    const dispatch = useDispatch();
    let history = useHistory();
    const users = useSelector(state => state.users)
    function ForgetPasswordSubmit() {
        console.log('No errors, submit callback called!');
        dispatch(userActions.forgotpassword(values.email))
    }

    useEffect(() => {
        if (users.forgotPasswordSuccess) {
            history.push({
                pathname: '/successform',
                state: { module: "ForgotPassword" }
            });
        }
    });

    return (
        <div className="forgotPass-cont">
            <br />
            <Link to="/login" className="navigator">
                <ArrowBackIosNewIcon fontSize="small" />
                <span style={{ marginLeft: '10px' }}>{currentLang.ForgetPassword.BackToLogin}</span>
            </Link>
            <h3 style={{ marginTop: '20px' }}>{currentLang.ForgetPassword.TitleText}</h3>
            <br />
            <div className="helpText">
                {currentLang.ForgetPassword.InfoText_1}
                <br />
                {currentLang.ForgetPassword.InfoText_2}
            </div>
            <br />
            <br />
            <form name="form" className="forgotPass-form" onSubmit={e => handleSubmit(e, 'forgetPasswordForm')} noValidate>
                <Input
                    placeholder="Enter your e-mail address"
                    label={currentLang.ForgetPassword.EmailText}
                    name="email"
                    error={errors.email}
                    value={values.email || ''}
                    maxLength="30"
                    onChange={handleChange}></Input>
                <Button label="Reset Password" size="large" type="submit"></Button>
            </form>
        </div>
    );
}

export { ForgotPassword };