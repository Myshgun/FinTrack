export const setDefaultValues = (fields) => {
	const defaults = {};
	fields.forEach(({ name, defaultValue, type }) => {
		if (defaultValue !== undefined) {
			defaults[name] = defaultValue;
		} else if (type === "color") {
			defaults[name] = "#000000";
		} else {
			defaults[name] = "";
		}
	});
	return defaults;
};
