import { ACTION_TYPE } from "../actions";

const initialAccountsState = {
	accounts: [],
	isLoading: false,
};

export const accountsReducer = (state = initialAccountsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ACCOUNTS_LOADING:
			return { ...state, isLoading: action.payload };
		case ACTION_TYPE.SET_ACCOUNTS_DATA:
			return { ...state, accounts: action.payload };
		default:
			return state;
	}
};
