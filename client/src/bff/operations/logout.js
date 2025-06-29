import { sessions } from "../sessions";

export const logout = async (userSession) => {
	sessions.remove(userSession);
};
