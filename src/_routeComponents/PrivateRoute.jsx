import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoogedIn } from '../_helpers';

function PrivateRoute({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if (!isLoogedIn()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // logged in so return component
            // return <Component {...props} />
          return <Redirect to={{ pathname: '/userHome', state: { from: props.location } }} />
           // return <Redirect to={{ pathname: '/user', state: { from: props.location } }} />
        }} />
    );
}

export { PrivateRoute };