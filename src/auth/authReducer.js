import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
    
    // console.log('=========================')
    // console.log('authReducer');
    // console.log('state');
    // console.log(state);
    // console.log('action');
    // console.log(action);
    // console.log('=========================')
    
    switch (action?.type) {
        case types.login:
            return {
                ...action.payload, 
                logged: true
            }
        case types.logout:
            return {logged: false};
        default:
            return state;
    }
};
