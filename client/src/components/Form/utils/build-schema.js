import * as yup from "yup";

export const buildSchema = (fields) => {
	const shape = {};
	fields.forEach(({ name, validation }) => {
		shape[name] = validation;
	});
	return yup.object().shape(shape);
};
