export const setDefaultValues = (fields) =>
	fields.reduce((acc, field) => {
		acc[field.name] = field.defaultValue ?? "";
		return acc;
	}, {});
