import { setUser } from "./set-user";

export const saveProfileAsync = (requestServer, newProfileData) => (dispatch) =>
	requestServer("saveProfile", newProfileData).then((updatedProfile) => {
		dispatch(setUser(updatedProfile.res));

		return updatedProfile.res;
	});
