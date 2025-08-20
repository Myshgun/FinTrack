import { ACTION_TYPE } from "../actions";

const initialOperationsState = {
	operations: [],
	pagination: {
		page: 1,
		limit: 10,
		pages: 1,
		total: 0,
	},
	isLoading: false,
};

export const operationsReducer = (state = initialOperationsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_OPERATIONS_DATA:
			return {
				...state,
				operations: action.payload.operations,
				pagination: action.payload.pagination,
				isLoading: false,
			};
		case ACTION_TYPE.SET_OPERATIONS_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		default:
			return state;
	}
};
