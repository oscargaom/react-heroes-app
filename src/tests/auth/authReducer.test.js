import '@testing-library/jest-dom';
import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Pruebas de authReducer', () => {

    const user = {
        name: "Eliky"
    };

    test('debe de retornar el estado por defecto ', () => {

        const state = authReducer({ logged: false });

        expect(state).toEqual({ logged: false });

    });

    test('debe de autenticar y colocar el name del usuario', () => {

        const state = authReducer({}, {
            type: types.login,
            payload: user
        });

        const { name, logged } = state;
        
        expect(name).toBe(user.name);
        expect(logged).toBe(true);
    });

    test('debe de borrar el valor de name y setear logged en false del usuario', () => {
        
        const state = authReducer({},{
            type: types.logout,
            payload: {...user, logged: true}
        });

        const { name, logged } = state;
        
        expect(name).toBe(undefined);
        expect(logged).toBe(false);
    });
});


