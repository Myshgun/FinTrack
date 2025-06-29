import styled from "styled-components";

const InputContainer = ({ className, name, type, children, ...props }) => {
	return (
		<div className={className}>
			<label htmlFor={name}>{children}</label>
			<input type={type} name={name} {...props} />
		</div>
	);
};

export const Input = styled(InputContainer)`
	display: flex;
	flex-direction: column;

	& label {
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}

	& input {
		font-size: 0.9rem;
		padding: 0.5rem;
		border-radius: 0.5rem;
	}
`;
