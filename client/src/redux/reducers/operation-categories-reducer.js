import { ACTION_TYPE } from "../actions";

const initialOperationCategoriesState = [];

export const operationCategoriesReducer = (
	state = initialOperationCategoriesState,
	action
) => {
	switch (action.type) {
		case ACTION_TYPE.SET_OPERATION_CATEGORIES_DATA:
			return action.payload;
		default:
			return state;
	}
};
