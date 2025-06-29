import { addUser, getUser } from "../api";
import { sessions } from "../sessions";

export const register = async (regEmail, regPassword) => {
	const existedUser = await getUser(regEmail);

	if (existedUser) {
		return {
			error: "Такой логин уже занят",
			res: null,
		};
	}

	const user = await addUser(regEmail, regPassword);

	return {
		error: null,
		res: {
			id: user.id,
			email: user.email,
			roleId: user.role_id,
			session: sessions.create(user),
		},
	};
};
