import { ACTION_TYPE } from "../actions";

const initialAnalyticsState = {
	budget: null,
	categories: null,
	expenses: null,
	growth: null,
	incomes: null,
	savings: null,

	isLoading: false,
};

export const analyticsReducer = (state = initialAnalyticsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_BUDGET_DATA:
			return {
				...state,
				budget: action.payload,
			};
		case ACTION_TYPE.SET_CATEGORIES_DATA:
			return {
				...state,
				categories: action.payload,
			};
		case ACTION_TYPE.SET_EXPENSES_DATA:
			return {
				...state,
				expenses: action.payload,
			};
		case ACTION_TYPE.SET_GROWTH_DATA:
			return {
				...state,
				growth: action.payload,
			};
		case ACTION_TYPE.SET_INCOMES_DATA:
			return {
				...state,
				incomes: action.payload,
			};
		case ACTION_TYPE.SET_SAVINGS_DATA:
			return {
				...state,
				savings: action.payload,
			};
		case ACTION_TYPE.SET_ANALYTICS_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		default:
			return state;
	}
};
