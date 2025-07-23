import { ACTION_TYPE } from "../actions";

const initialOperationsState = [];

export const operationsReducer = (state = initialOperationsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_OPERATIONS_DATA:
			return action.payload;
		default:
			return state;
	}
};
