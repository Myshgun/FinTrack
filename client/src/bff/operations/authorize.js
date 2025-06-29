import { getUser } from "../api";
import { sessions } from "../sessions";

export const authorize = async (authEmail, authPassword) => {
	const user = await getUser(authEmail);

	if (!user) {
		return {
			error: "Такой пользователь не найден",
			res: null,
		};
	}

	const {
		id,
		email,
		password,
		firstName,
		lastName,
		middleName,
		phoneNumber,
		registeredAt,
		updatedAt,
		roleId,
	} = user;

	if (authPassword !== password) {
		return {
			error: "Неверный пароль",
			res: null,
		};
	}

	return {
		error: null,
		res: {
			id,
			email,
			roleId,
			session: sessions.create(user),
		},
	};
};
