export const historyMockBase = {
    push: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn()
};

export const historyMockLgthEq2 = {
    ...historyMockBase,
    length: 2,
};

export const historyMockLgthEq10 = {
    ...historyMockBase,
    length:10
};