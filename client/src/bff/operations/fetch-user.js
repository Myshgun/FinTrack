import { getSession, getUser } from "../api";
import { ROLE } from "../../constants";
import { sessions } from "../sessions";

export const fetchUser = async (userSessionHash) => {
	const accessRoles = [ROLE.ADMIN, ROLE.USER];

	const access = await sessions.access(userSessionHash, accessRoles);

	if (!access) {
		return {
			error: "Доступ запрещен",
			res: null,
		};
	}

	const session = await getSession(userSessionHash);

	const { email } = session.user;

	const user = await getUser(email);

	return {
		error: null,
		res: user,
	};
};
