import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';

import { HeroScreen } from '../../componentes/heroes/HeroScreen';
import { historyMockLgthEq2, historyMockLgthEq10 } from '../fixtures/authContextValue';


describe('Pruebas en el componente <HeroScreen />', () => {


    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe mostrarse el componente <Link to="/" /> si no hay argumentos en la url ', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <HeroScreen history={historyMockLgthEq2} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('Redirect').exists()).toBe(true);
    });

    test('debe de mostrar un hero si el parámetro existe en el query string y se encuentra en la ruta', () => {

        /*  initialEntries={['/hero/marvel-spider']} reemplaza el valor marvel-spider en el :heroId del path de
            <Route path="/hero/:heroId" .... /> , pero es importante que en ambos inicien con /hero/
            Route le proporciona todas las props a <HeroScreen /> a través de la función flecha en component={...}
        */
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                {/* <HeroScreen history={historyMockLgthEq10} /> */}
                <Route
                    path="/hero/:heroId"
                    component={() => <HeroScreen history={historyMockLgthEq2} />} />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        // console.log(wrapper.html());
        expect(wrapper.find('.row').exists()).toBe(true);
        expect(historyMockLgthEq2.goBack).not.toHaveBeenCalled();
        expect(historyMockLgthEq2.push).toBeCalledTimes(1);
        expect(historyMockLgthEq2.push).toHaveBeenCalledWith('/');
    });

    test('debe de regresar a la página anteior mediante history.goBack()', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path='/hero/:heroId' 
                    component={ () => <HeroScreen history={historyMockLgthEq10} />} >
                    {/* <HeroScreen history={historyMockLgthEq10} /> */}
                </Route>
            </MemoryRouter>
        );

        wrapper.find('button').props().onClick();
        expect(historyMockLgthEq10.push).not.toHaveBeenCalled();
        expect(historyMockLgthEq10.goBack).toHaveBeenCalledTimes(1);
    });

    test('debe llamar <Redirect to="/" /> si el hero no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider7']}>
                <Route
                    path='/hero/:heroId'
                    component={() => <HeroScreen history={historyMockLgthEq2} />}>
                </Route>
            </MemoryRouter>
        );

        /*  El <Redirect to="/" /> regresa una cadena vacía por eso no podemos buscar 
            por el nombre del componente, pero si podemos hacer la validación de la
            cadena vacía. */
        // expect(wrapper.find('Redirect').exists()).toBe(true);
        expect(wrapper.text()).toBe('');
    });

})


