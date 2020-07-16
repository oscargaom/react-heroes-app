import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {


    const { authUser, authDispatch } = useContext(AuthContext);

    const handleLogin = () => {

        const user = {
            ...authUser,
            name: "Manuel"
        };
        
        const action = {
            type: types.login,
            payload: user
        }

        authDispatch(action);

        const lastPath = localStorage.getItem('lastPath') || "/";
        // console.log(lastPath);

        // history.push("/");

        /*  Tenemos acceso al history y otras variables por medio de las props las cuales 
            son creadas por el react-router-dom; en este caso replace cambia la historia 
            de navegación en LoginScreen impidiendo de este modo navegaciones que pueden
            tener comportamiento no deseados en nuestra navegación.
        */
        history.replace(lastPath);
    };

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    )
}
