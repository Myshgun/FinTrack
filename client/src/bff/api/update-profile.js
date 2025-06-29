import { transformUser } from "../transformers";

export const updateProfile = ({
	id,
	firstName,
	lastName,
	middleName,
	email,
	phoneNumber,
	photoUrl,
}) =>
	fetch(`http://localhost:3005/users/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			first_name: firstName,
			last_name: lastName,
			middle_name: middleName,
			email,
			phone_number: phoneNumber,
			photo_url: photoUrl,
			updated_at: new Date().toISOString(),
		}),
	})
		.then((loadedUser) => loadedUser.json())
		.then((loadedUser) => loadedUser && transformUser(loadedUser));
