import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas del componente <PrivateRoute />', () => {

    const rest = {
        location: {
            pathname: '/marvel'
        }
    };


    test('debe de mostrar el componente si esta autenticado y guardar en localStorage ', () => {

        Storage.prototype.setItem = jest.fn();

        /*  -> Recordemos que component es una componente de tipo react arrow function component.
            -> Invariant failed: You should not use <Route> outside a <Router>. Este error ocurre porque 
               queremos utilizar una ruta fuera de un <Router>, pero este error también ocurriría si 
               quisieramos probar un <Link>, <Redirect>, etc. para ello usamos el componente <MemoryRouter> 
               el cual nos permite realizar pruebas de rutas y navegación a través de react-router-dom.
               Cuando isAuthenticated=false el componente <Redirect to="" /> regresa una cadena vacía.
        */
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={true}
                    component={() => <span>Componente a renderizar</span>}
                    {...rest} />
            </MemoryRouter>
        );


        expect(wrapper.find('span').exists()).toBe(true);
        expect(wrapper.find('span').text().trim()).toBe('Componente a renderizar');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', rest.location.pathname);
    });

    test('debe de bloquear el componente si no esta autenticado', () => {

        Storage.prototype.setItem = jest.fn();

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={false}
                    component={() =>  <span>Componente a renderizar</span> }
                    {...rest}
                />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', rest.location.pathname);
        expect(wrapper.html()).toBe('');
    })
});
