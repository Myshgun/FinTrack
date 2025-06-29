export const transformUser = (dbUser) => ({
	id: dbUser.id,
	email: dbUser.email,
	password: dbUser.password,
	firstName: dbUser.first_name,
	lastName: dbUser.last_name,
	middleName: dbUser.middle_name,
	phoneNumber: dbUser.phone_number,
	registeredAt: dbUser.registered_at,
	photoUrl: dbUser.photo_url,
	updatedAt: dbUser.updated_at,
	roleId: dbUser.role_id,
});
