import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { SearchScreen } from '../../componentes/search/SearchScreen';
import { MemoryRouter, Route } from 'react-router-dom';
import { historyMockBase } from '../fixtures/historyMock';

describe('Pruebas en el componente <SearchScreen />', () => {
    test('debe de mostrarse el componente con los valores por default', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
    });

    test('debe de mostrar la palabra batman en el input, en el queryString y la imagén ', () => {

        const queryValue = 'batman';

        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${queryValue}`]}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find('input').prop('value')).toBe(queryValue);
        expect(wrapper.find('HeroCard').exists()).toBe(true);

        expect(wrapper).toMatchSnapshot();
    })

    test('debe de mostrar un error si no se encuentra el hero indicado en el queryString', () => {

        const queryValue = 'undefined';

        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${queryValue}`]}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        // console.log(wrapper.html());
        expect(wrapper.find('.alert-danger').text().trim()).toBe(`Not found a hero ${queryValue}`);
        expect(wrapper.find('HeroCard').exists()).toBe(false);
        expect(wrapper).toMatchSnapshot();
    })

    test('debe llamar el push del history', () => {
        
        const queryValue = 'batman';

        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${queryValue}`]}>
                <Route 
                    path='/search' 
                    component={() => <SearchScreen history={historyMockBase} />} />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target:{
                name:'searchText',
                value:queryValue
            }
        });

        wrapper.find('form').props().onSubmit({
            preventDefault: jest.fn()
        });

        expect(historyMockBase.push).toHaveBeenCalledTimes(1);
        expect(historyMockBase.push).toHaveBeenCalledWith(`?q=${queryValue}`);

    })




});

