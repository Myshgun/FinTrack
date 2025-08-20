import { ACTION_TYPE } from "../actions";
import { ROLE } from "../../constants";

const initialUserState = {
	id: null,
	roleId: ROLE.GUEST,
	firstName: "",
	lastName: "",
	middleName: "",
	email: "",
	phoneNumber: "",
	registeredAt: "",
	photoUrl: "",

	isLoading: false,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.SET_USER_LOADING:
			return { ...state, isLoading: action.payload };
		case ACTION_TYPE.LOGOUT:
			return initialUserState;
		default:
			return state;
	}
};
