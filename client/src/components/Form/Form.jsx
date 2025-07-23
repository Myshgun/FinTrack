import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthFormError, Button, Input } from "../";
import { buildSchema, setDefaultValues } from "./utils";

import styled from "styled-components";

const StyledButton = styled(Button)`
	height: 36px;
	margin-top: ${({ view }) => (view === "horizontal" ? "26px" : "inherit")};
`;

const FormContainer = ({ className, fields, buttonText, onSubmit, view }) => {
	const formSchema = buildSchema(fields);

	const [serverError, setServerError] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: setDefaultValues(fields),
		resolver: yupResolver(formSchema),
	});

	const formError = errors?.name?.message || errors?.type?.message;
	const errorMessage = formError || serverError;

	const submitHandler = async (formData) => {
		setServerError(null);
		try {
			await onSubmit(formData);
			reset();
		} catch (error) {
			setServerError(error.message || "Ошибка сервера");
		}
	};

	return (
		<form className={className} onSubmit={handleSubmit(submitHandler)}>
			<div className="main-block">
				{fields.map(({ name, label, type, options, as }) => (
					<Input
						key={name}
						name={name}
						type={type}
						as={as}
						options={options}
						{...register(name, {
							onChange: () => setServerError(null),
						})}
					>
						{label}
					</Input>
				))}
				<StyledButton type="submit" style="success" view={view}>
					{buttonText}
				</StyledButton>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</div>
		</form>
	);
};

export const Form = styled(FormContainer)`
	display: flex;
	margin: 0 auto;

	.main-block {
		display: flex;
		gap: 10px;
		flex-direction: ${({ view }) =>
			view === "horizontal" ? "row" : "column"};
	}
`;
