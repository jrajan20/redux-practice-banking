import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  
};
const initialStateCustomer = {
    fullName: "",
    nationalId: "",
    createdAt: "",
}

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload
      };
    case "account/requestLoan":
    if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
      case "account/payLoan":
        return {
            ...state,
              loan: 0,
            loanPurpose: "",
            balance: state.balance - state.loan,
        };

    default:
      return state;
  }
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
const rootReducer = (state = {}, action) => {
    return {
        account: accountReducer(state.account, action),
        customer: customerReducer(state.customer, action),
    };
};
const store = createStore(rootReducer);
// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// store.dispatch({ type: "account/requestLoan", payload: { amount: 1000, purpose: "Buy a car" } });
// store.dispatch({ type: "account/payLoan" });

// console.log(store.getState());

function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function payLoan() {
  return {
    type: "account/payLoan",
  };
}

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateCustomer(fullName, nationalId) {
  return {
    type: "customer/updateCustomer",
    payload: { fullName },
  };
}

export { store, deposit, withdraw, requestLoan, payLoan, createCustomer, updateCustomer };