import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Navbar } from '../../../componentes/ui/Navbar';
import { AuthContext } from '../../../auth/AuthContext';
import { authContextLoggedValue, authContextNotLoggedValue } from '../../fixtures/authContextValue';
import { MemoryRouter, Router } from 'react-router-dom';
import { types } from '../../../types/types';

describe('Pruebas en el componente <Navbar />', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe mostrarse correctamente', () => {

        const wrapper = mount(
            <AuthContext.Provider value={authContextLoggedValue}>
                <MemoryRouter>
                    <Navbar />;
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });

    test('debe de llamar el logout y usar el history', () => {
        /*  Este Warning nos aparece porque queremos introducir la prop history en el componente 
            <MemoryRouter />: ignores the history prop. To use a custom history, use `import 
            { Router }` instead of `import { MemoryRouter as Router }`.
            Por ello usamos el componente <Router /> y aquì hacemos la inyección de la prop.

            Derivado de este Warning: Failed prop type: Invalid prop `history` of type `function` 
            supplied to `Router`, expected `object`. Agregamos listen al objeto propHistory.
            
            Derivado de este TypeError: history.createHref is not a function. Agregamos 
            createHref: jest.fn() al objeto history.

            Derivado de este TypeError: Cannot read property 'pathname' of undefined. Agregamos
            location: { pathname: '' } al objeto propHistory.

            Derivado de TypeError: history.replace is not a function. Agregamos 
            replace: jest.fn() al objeto propHistory.

        */
        const propHistory = {
            listen: jest.fn(),
            location: {
                pathname: ''
            },
            createHref: jest.fn(),
            replace: jest.fn()
        };

        const wrapper = mount(
            <AuthContext.Provider value={authContextNotLoggedValue}>
                <MemoryRouter>
                    <Router history={propHistory}>
                        <Navbar />
                    </Router>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // console.log(wrapper.find('button').html())
        wrapper.find('button').props().onClick();

        expect(authContextNotLoggedValue.authDispatch).toHaveBeenCalledTimes(1);
        expect(authContextNotLoggedValue.authDispatch).toHaveBeenCalledWith({
            type: types.logout
        });

        expect(propHistory.replace).toBeCalledTimes(1);
        expect(propHistory.replace).toHaveBeenCalledWith("/login");
    })

})

