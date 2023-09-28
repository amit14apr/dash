import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Button } from '..';
import icon_success from '../../_icons/icon_success.png';
import icon_email from '../../_icons/icon_email.png';
import currentLang from '../../Lang';
import './style.less';
import { useState, useEffect } from 'react';

function SuccessComponent() {
    let history = useHistory();
    const location = useLocation();
    const [module, setModule] = useState();
    useEffect(() => {
        console.log(location.pathname);
        console.log(location.state); 
        setModule(location.state.module)
    }, [location]);

    const handleClick = () => {
        history.push('/login');
    }
    return (
        <div className="forgotPass-cont">
            <br />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <img src={module === "ForgotPassword" ? icon_email : icon_success} alt="logo" style={{ m: 1, maxWidth: 124 }} />
            </Typography>
            <h3 style={{ marginTop: '20px' }}>
                {module === "ForgotPassword" ? currentLang.SuccessComponent.EmailTitleText
                    : currentLang.SuccessComponent.SuccessTitleText }
            </h3>
            <br />
            <div className="helpText">
                {module === "ForgotPassword" ? currentLang.SuccessComponent.EmailInfoText 
                    : module === "ResetPassword" ? currentLang.SuccessComponent.ResetPasswordInfoText : currentLang.SuccessComponent.RegistrationInfoText
                }
            </div>
            <br />
            <br />
            <form name="form" className="forgotPass-form" >
                <Button label="Login" size="large" type="submit" onClick={handleClick}></Button>
            </form>
            {module === "ForgotPassword" &&
                <div style={{ marginTop: '10px' }}>
                    {currentLang.SuccessComponent.ResetPasswordLinktext_1} 
                    <b><a href="/forgotpassword" style={{ paddingLeft: "5px" }}>
                    {currentLang.SuccessComponent.ResetPasswordLinktext_2}</a></b></div>
            }
        </div>
    );
}

export { SuccessComponent };