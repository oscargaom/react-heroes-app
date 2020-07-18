
export const authContextNotLoggedValue = {
    authUser: {
        name: "Claudia",
        logged: false
    },

    authDispatch: jest.fn()
};

export const authContextLoggedValue = {
    authUser: {
        name: "Manuel",
        logged: true
    },

    authDispatch: jest.fn()
};