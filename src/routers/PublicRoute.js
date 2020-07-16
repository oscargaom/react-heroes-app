import React from 'react'
import PropTypes from 'prop-types'

import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({isAuthenticated, component: Component, ...rest}) => {

    // console.log('=====================');
    // console.log('isAuthenticated');
    // console.log(isAuthenticated);
    // console.log('component');
    // console.log(Component);
    // console.log('rest');
    // console.log(rest);

    return(
        <Route {...rest} 
            component={props => (
                (!isAuthenticated)
                ? <Component {...props} />
                : <Redirect to="/" />
            )}
        />
    );
};

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}