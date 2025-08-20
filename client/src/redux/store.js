import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import {
	authReducer,
	userReducer,
	accountsReducer,
	operationsReducer,
	appReducer,
	accountTypesReducer,
	operationCategoriesReducer,
	analyticsReducer,
} from "./reducers";

const reducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	user: userReducer,
	accounts: accountsReducer,
	accountTypes: accountTypesReducer,
	operations: operationsReducer,
	operationCategories: operationCategoriesReducer,
	analytics: analyticsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk))
);
