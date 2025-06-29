import { setUser } from "./set-user";

export const setUserAsync = (requestServer, hash) => (dispatch) => {
	requestServer("fetchUser", hash).then((userData) => {
		dispatch(setUser(userData.res));
	});
};
