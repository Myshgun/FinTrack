import { ACTION_TYPE } from "../actions";

const initialAccountsState = [];

export const accountsReducer = (state = initialAccountsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ACCOUNTS_DATA:
			return action.payload;
		default:
			return state;
	}
};
