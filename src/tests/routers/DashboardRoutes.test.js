import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { AuthContext } from '../../auth/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { authContextNotLoggedValue } from '../fixtures/authContextValue';

describe('Pruebas en el componente <DashboardRoutes />', () => {
    test('debe mostrarse el componenete correctamente', () => {

        // const contextValue = {
        //     authUser: {
        //         name: "Manuel",
        //         logged: false
        //     },
        //     authDispatch: jest.fn(),
        // };

        /*  
        */

        /*  Nos aparece este error sino se coloca <MemoryRouter />: Invariant failed: You should not use 
            <Switch> outside a <Router>.
            Cuando se ejecuta esta prueba y pasa por el componente <DashboardRoutes /> se hace la
            evaluación en el componente <Switch /> y a su vez en cada <Route exact path=".." component={..} />
            el cual regresa <Redirect to="/marvel" /> porque el path es igual a vacío , por eso en la salida 
            se ve el componente de marvel, pero si fuera <Redirect to="/dc" /> mostraría el componente de dc y lo
            mismo aplicaría si el path fuera "/search" o "/hero/:heroId".
        */

        const wrapper = mount(
            <AuthContext.Provider value={
                authContextNotLoggedValue
            } >
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper.html()).toMatchSnapshot();
        expect((wrapper.find('.text-info').text().trim()))
            .toBe(authContextNotLoggedValue.authUser.name);
    });
})

