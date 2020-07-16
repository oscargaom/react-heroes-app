import React, { useReducer, useEffect } from 'react'
import { AppRouter } from './routers/AppRouter'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'

export const HeroresApp = () => {

    const init = () => {
        return JSON.parse(localStorage.getItem('user')) || { logged: false };
    };

    const [authUser, authDispatch] = useReducer(authReducer, {}, init)

    useEffect(() => {
        // console.log('==================');
        // console.log('useEffect');
        // console.log(authUser);
        // console.log('==================');
        localStorage.setItem('user', JSON.stringify(authUser));
    }, [authUser])

    return (
        <div>
            <AuthContext.Provider value={
                {
                    authUser,
                    authDispatch
                }
            }>
                <AppRouter />
            </AuthContext.Provider>
        </div>
    )
}
