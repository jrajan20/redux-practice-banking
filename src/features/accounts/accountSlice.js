const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
    isLoading: false,
  
};


function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
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
        case "account/convertCurrency":
          return {
            ...state,
            isLoading: true,
          };

    default:
      return state;
  }
}



// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// store.dispatch({ type: "account/requestLoan", payload: { amount: 1000, purpose: "Buy a car" } });
// store.dispatch({ type: "account/payLoan" });

// console.log(store.getState());

function deposit(amount, currency) {
    if (currency === "USD") return {
    type: "account/deposit",
    payload: amount,
  };
  return async function(dispatch, getState) {
    //API call to get the conversion rate
    dispatch({ type: "account/convertCurrency" });
    
    const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`)
    const data = await res.json();
    const convertedAmount = data.rates.USD;
    dispatch({
      type: "account/deposit",
      payload: convertedAmount,
    });
  }
  
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

export { deposit, withdraw, requestLoan, payLoan, accountReducer };