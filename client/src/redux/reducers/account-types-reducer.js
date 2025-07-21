import { ACTION_TYPE } from "../actions";

const initialAccountTypesState = [];

export const accountTypesReducer = (
	state = initialAccountTypesState,
	action
) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ACCOUNT_TYPES_DATA:
			return action.payload;
		default:
			return state;
	}
};
