import { ACTION_TYPE } from "../actions";
import { ROLE } from "../../constants";

const initialUserState = {
	id: null,
	roleId: ROLE.GUEST,
	session: null,
	firstName: "",
	lastName: "",
	middleName: "",
	email: "",
	phoneNumber: "",
	registeredAt: "",
	photoUrl: "",
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.LOGOUT:
			return initialUserState;
		default:
			return state;
	}
};
