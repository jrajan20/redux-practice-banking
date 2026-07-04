const initialStateCustomer={
  fullName: "",
  nationalId: "",
  createdAt: "",
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalId: action.payload.nationalId,
                createdAt: action.payload.createdAt,
            };
        case "customer/updateCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
            };
        default:
            return state;
    }
} 

function createCustomer(fullName, nationalId) {
    return {
        type: "customer/createCustomer",
        payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
        },
    };
}

function updateCustomer(fullName) {
    return {
        type: "customer/updateCustomer",
        payload: {
            fullName,
        },
    };
}

export {createCustomer, updateCustomer, customerReducer};