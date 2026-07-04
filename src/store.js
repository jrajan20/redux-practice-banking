import { applyMiddleware, combineReducers, createStore } from "redux";
import {thunk} from "redux-thunk";
import {accountReducer} from "./features/accounts/accountSlice";
import {customerReducer} from "./features/customers/customerSlice";

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// store.dispatch({ type: "account/requestLoan", payload: { amount: 1000, purpose: "Buy a car" } });
// store.dispatch({ type: "account/payLoan" });

// console.log(store.getState());


export default store;