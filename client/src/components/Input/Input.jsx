import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	font-size: 0.9rem;
	margin-bottom: 0.5rem;
	color: #333;
`;

const InputField = styled.input`
	font-size: 0.9rem;
	padding: 0.5rem;
	border-radius: 0.5rem;
	border: 1px solid #ccc;
	background: white;
	transition: border-color 0.2s ease;

	&:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
	}

	&:disabled {
		background-color: #f5f5f5;
		cursor: not-allowed;
		opacity: 0.7;
	}
`;

const SelectField = styled.select`
	font-size: 0.9rem;
	padding: 0.5rem;
	border-radius: 0.5rem;
	border: 1px solid #ccc;
	background: white;
	appearance: auto;
	transition: border-color 0.2s ease;

	&:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
	}

	&:disabled {
		background-color: #f5f5f5;
		cursor: not-allowed;
		opacity: 0.7;
	}
`;

export const Input = ({
	name,
	type,
	label,
	as = "input",
	options = [],
	...props
}) => {
	return (
		<Container>
			<Label htmlFor={name}>{label}</Label>
			{as === "select" ? (
				<SelectField name={name} id={name} {...props}>
					<option value="" disabled>
						Выберите...
					</option>
					{options.map(({ value, label }) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</SelectField>
			) : (
				<InputField type={type} name={name} id={name} {...props} />
			)}
		</Container>
	);
};
