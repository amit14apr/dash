import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, Checkbox, Button, PasswordInput, Loader } from '../../Components';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import _appConfig from '../../_appConfig/_appConfig';
import currentLang from '../../Lang';
import { userActions } from '../../_actions';
import { useForm, formValidation } from "../../_constants";
import './style.less';

function Login() {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(LoginSubmit, formValidation);
    const [auth, setAuth] = React.useState(false);
    const dispatch = useDispatch();
    const users = useSelector(state => state)
    let history = useHistory();

    function LoginSubmit() {
        console.log('No errors, submit callback called!');
        dispatch(userActions.login(values.email, values.password))
    }
    return (
        <div className="login-module" style={{ marginTop: '40px' }} >
            <h4>{currentLang.Login.TitleText_1}<br /> {currentLang.Login.TitleText_2}</h4>
            <h6 style={{ padding: "10px 0", color: "#746F95" }}>{currentLang.Login.SignInText}</h6>
            <br />
            {/* <Button label="Login with bolttech Okta" size="large" type="submit" style={{ padding: "10px" }}></Button>
            <Divider style={{ padding: "10px" }}>
                <Chip label="or" />
            </Divider> */}
            <form name="form" className="login-form" onSubmit={e => handleSubmit(e, 'loginForm')} noValidate>
                <Input
                    placeholder="Enter your email"
                    onChange={handleChange}
                    required={true}
                    name="email"
                    error={errors.email}
                    value={values.email || ''}
                    label={currentLang.Login.UserNameText}></Input>
                <PasswordInput
                    placeholder="Enter your password"
                    error={errors.password}
                    value={values.password || ''}
                    required={true}
                    name="password"
                    onChange={handleChange}
                    onBlur={e => e}
                    onFocus={e => e}
                    label={currentLang.Login.PasswordText} />
                <div className="reminder-forgot-cont">
                <Button label="Login" size="large" type="submit" endIcon={<Loader />}></Button>
                 {/* <a href="/forgotpassword">{currentLang.Login.ForgetPasswordText}</a> */}
                </div>
                
            </form>
            <div style={{ marginTop: '10px' }}>
             {currentLang.Login.AccountConfirmationText}
                { <b><a href="/register" style={{ paddingLeft: "5px" }}>
                    {currentLang.Login.CreateAccountLinkText}</a></b> }
                    
                    </div>
        </div>
    );
}

export { Login };