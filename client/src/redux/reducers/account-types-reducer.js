import { ACTION_TYPE } from "../actions";

const initialAccountTypesState = {
	accountTypes: [],
	isLoading: false,
};

export const accountTypesReducer = (
	state = initialAccountTypesState,
	action
) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ACCOUNT_TYPES_DATA:
			return {
				...state,
				accountTypes: action.payload,
				isLoading: false,
			};
		case ACTION_TYPE.SET_ACCOUNT_TYPES_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		default:
			return state;
	}
};
