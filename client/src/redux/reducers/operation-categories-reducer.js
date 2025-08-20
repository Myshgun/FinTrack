import { ACTION_TYPE } from "../actions";

const initialOperationCategoriesState = {
	operationCategories: [],
	isLoading: false,
};

export const operationCategoriesReducer = (
	state = initialOperationCategoriesState,
	action
) => {
	switch (action.type) {
		case ACTION_TYPE.SET_OPERATION_CATEGORIES_DATA:
			return {
				...state,
				operationCategories: action.payload,
				isLoading: false,
			};
		case ACTION_TYPE.SET_OPERATION_CATEGORIES_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		default:
			return state;
	}
};
