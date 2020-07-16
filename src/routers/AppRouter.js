import React, { useContext } from 'react';

import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import { LoginScreen } from '../componentes/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute'
import { AuthContext } from '../auth/AuthContext';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

    const {authUser:{logged}} = useContext(AuthContext);

    return (
        <div>
            <Router>
                <div>
                    {/* A <Switch> looks through its children <Route>s and
                        renders the first one that matches the current URL. */}
                    <Switch>
                        {/* Route nos provee por default la prop con la información del history 
                            y demás props como location y match gracias al react-router-dom */}
                        {/* <Route exact path="/login" component={LoginScreen} /> */}
                        <PublicRoute exact 
                                    path="/login" 
                                    component={LoginScreen} 
                                    isAuthenticated={logged}            
                        />

                        {/* <Route path="/" component={DashboardRoutes} /> */}
                        <PrivateRoute 
                            path="/" 
                            component={DashboardRoutes} 
                            isAuthenticated={logged} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
