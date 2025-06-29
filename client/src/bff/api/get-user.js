import { transformUser } from "../transformers";

export const getUser = async (emailToFind) =>
	fetch(`http://localhost:3005/users?email=${emailToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser));
