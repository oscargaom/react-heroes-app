import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { LoginScreen } from '../../componentes/login/LoginScreen';
import { AuthContext } from '../../auth/AuthContext';
import { authContextLoggedValue } from '../fixtures/authContextValue';
import { historyMockBase } from '../fixtures/historyMock';
import { types } from '../../types/types';

describe('Pruebas en el componente <LoginScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe mostrarse en el snapshot ', () => {

        const wrapper = mount(
            <AuthContext.Provider value={authContextLoggedValue}>
                <LoginScreen history={historyMockBase} />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('debe modificar el localStorage', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={authContextLoggedValue}>
                <LoginScreen history={historyMockBase} />
            </AuthContext.Provider>
        );

        const handleClick = wrapper.find('button').prop('onClick'); 

        localStorage.setItem('lastPath', '/dc');
        handleClick();
        expect(historyMockBase.replace).toHaveBeenCalledWith('/dc');
    });

    test('debe realizar el dispatch y la navegación', () => {

        Storage.prototype.getItem = jest.fn();

        const wrapper = mount(
            <AuthContext.Provider value={authContextLoggedValue}>
                <LoginScreen history={historyMockBase} />
            </AuthContext.Provider>
        );

        // console.log(wrapper.html())
        wrapper.find('button').prop('onClick')();
        expect(authContextLoggedValue.authDispatch).toHaveBeenCalledTimes(1);
        expect(authContextLoggedValue.authDispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Manuel',
                logged:true
            }
        });

        expect(historyMockBase.replace).toHaveBeenCalledTimes(1);
        expect(historyMockBase.replace).toHaveBeenCalledWith('/');

        expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem).toHaveBeenCalledWith('lastPath');
    });
})

