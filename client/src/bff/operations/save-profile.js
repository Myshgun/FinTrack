import { updateProfile } from "../api";
import { ROLE } from "../../constants";
import { sessions } from "../sessions";

export const saveProfile = async (hash, newProfileData) => {
	const accessRoles = [ROLE.USER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: "Доступ запрещен",
			res: null,
		};
	}

	const savedProfile = await updateProfile(newProfileData);

	return {
		error: null,
		res: savedProfile,
	};
};
