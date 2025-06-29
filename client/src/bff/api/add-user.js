import { generateDate } from "../utils";

export const addUser = (email, password) =>
	fetch("http://localhost:3005/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			email,
			password,
			full_name: "",
			phone_number: "",
			registered_at: generateDate(),
			updated_at: generateDate(),
			role_id: 1,
		}),
	}).then((createdUser) => createdUser.json());
