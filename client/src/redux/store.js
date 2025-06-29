import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import {
	authReducer,
	userReducer,
	usersReducer,
	accountsReducer,
	operationsReducer,
} from "./reducers";

const reducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	users: usersReducer,
	accounts: accountsReducer,
	operations: operationsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk))
);
