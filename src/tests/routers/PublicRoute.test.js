import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { PublicRoute } from '../../routers/PublicRoute';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas del componente <PrivateRoute />', () => {

    const rest = {
        location: {
            pathname: '/marvel'
        }
    };


    test('debe de mostrar el componente de login si no esta autenticado', () => {

        /*  -> Recordemos que component es una componente de tipo react arrow function component.
            -> Invariant failed: You should not use <Route> outside a <Router>. Este error ocurre porque 
               queremos utilizar una ruta fuera de un <Router>, pero este error también ocurriría si 
               quisieramos probar un <Link>, <Redirect>, etc. para ello usamos el componente <MemoryRouter> 
               el cual nos permite realizar pruebas de rutas y navegación a través de react-router-dom.
               Cuando isAuthenticated=false el componente <Redirect to="" /> regresa una cadena vacía.
        */
        const wrapper = mount(
            <MemoryRouter>
                <PublicRoute
                    isAuthenticated={false}
                    component={() => <span>Componente a renderizar</span>}
                    {...rest} />
            </MemoryRouter>
        );


        expect(wrapper.find('span').exists()).toBe(true);
        expect(wrapper.find('span').text().trim()).toBe('Componente a renderizar');
    });

    test('debe de bloquear el componente login si ya esta autenticado', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PublicRoute
                    isAuthenticated={true}
                    component={() =>  <span>Componente a renderizar</span> }
                    {...rest}
                />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBe(false);
        expect(wrapper.html()).toBe('');
    })
});
