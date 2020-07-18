import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';
import { authContextNotLoggedValue, authContextLoggedValue } from '../fixtures/authContextValue';

describe('Pruebas en el componente <AppRouter /> ', () => {

    // const authContextValue = {
    //     authUser: {
    //         name: "Gpe",
    //         logged: false
    //     },
    //     dispatch: jest.fn()
    // };

    test('debe mostrar login si no está autenticado', () => {

        /*  Cuando se ejecuta esta prueba y pasa por el componente <AppRouter /> se hace la
            evaluación en el componente <PublicRoute /> el cual regresa el componente <LoginScreen />
            porque el valor de logged es false; a continuación se hace la evaluación para el componente 
            <PrivateRoute /> pero al ser logged false regresa <Redirect to="/login" /> el cual regresa 
            una cadena vacía, por eso al final lo único que vemos es el contenido del login.
        */
            
        const wrapper = mount(
            <AuthContext.Provider value={ authContextNotLoggedValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        // console.log(wrapper.html());
        expect(wrapper).toMatchSnapshot();

    });

    test('debe de mostrase el componente <MarvelScreen /> si está autenticado', () => {
        /*  Cuando se ejecuta esta prueba y pasa por el componente <AppRouter /> se hace la
            evaluación en el componente <PublicRoute /> el cual regresa <Redirect to="/" /> (igual a 
            vacío) porque el valor de logged es true; a continuación se hace la evaluación para el 
            componente <PrivateRoute /> y como al ser logged igual true y path="/" regresa el componente 
            <Component {...props} /> el cual es igual el componente <DashboardRoutes />, este último evalua
            el path igual a "/" y hace un default a <Redirect to="/marvel" />, por eso en la salida se ve el
            componente de marvel, pero si fuera <Redirect to="/dc" /> mostraría el componente de dc.
        */
        
        const wrapper = mount(
            <AuthContext.Provider value={ authContextLoggedValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        //console.log(wrapper.html());
        expect(wrapper.find('.navbar').exists()).toBe(true);
    })
})
