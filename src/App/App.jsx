import React, { Fragment, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history, isLoogedIn} from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_routeComponents';
import { Registration } from '../Containers/Registration';
import { Login } from '../Containers/Login';
import { ForgotPassword } from '../Containers/ForgotPassword';
import { ResetPassword } from '../Containers/ResetPassword';
import { UserHome } from '../Containers/UserHome';
import Grid from '@mui/material/Grid';
import './style.less';
import backgroundImage from '../_icons/background.svg';
import { Topbar, Bottombar, SuccessComponent, AlertMessage, Loader } from '../Components';
import { useTranslation, Trans } from "react-i18next";

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const changeLanguage = lng => {
        console.log('--->', i18n.changeLanguage(lng))
    };

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <Fragment>
            <AlertMessage />
            <Loader />
            <Grid container spacing={2} justifyContent="space-between" alignItems="stretch" direction="row" style={{ height: '100%' }}>
                {!localStorage.getItem('user') ? <><Grid item lg={5} sm={5}>
                    <div className="col-lg-10 offset-lg-1 root-header-css">
                        <Topbar onLangChange={changeLanguage} />
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={Login} />
                                <Route path="/login" component={Login} />
                                <Route path="/register" component={Registration} />
                                <Route path="/forgotpassword" component={ForgotPassword} />
                                <Route path="/resetpassword" component={ResetPassword} />
                                <Route path="/successform" component={SuccessComponent} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </Grid>
                    <Grid item sm={6} lg={7}>
                        <div className="background">
                            <img src={backgroundImage} alt="logo" style={{ width: "inherit", height: "100vh" }} />
                        </div>
                    </Grid></>
                    :
                    <Router history={history}>
                        <Switch>
                            <Route path="/" component={UserHome} />
                        </Switch>
                    </Router>
                }
            </Grid>
        </Fragment>
    );
}

export { App };