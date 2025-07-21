import styled from "styled-components";

const selectColor = (style = "primary") => {
	switch (style) {
		case "primary":
			return ["#007bff", "#0056b3"];
		case "success":
			return ["#28a745", "#218838"];
		case "danger":
			return ["#dc3545", "#c82333"];
		default:
			return ["#007bff", "#0056b3"];
	}
};

const ButtonContainer = ({ className, children, style, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	padding: 10px 20px;
	color: #fff;
	border: none;
	background-color: ${({ style }) => selectColor(style)[0]};
	border-radius: 4px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	transition: background-color 0.3s, box-shadow 0.3s;

	&:hover {
		background-color: ${({ style }) => selectColor(style)[1]};
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
		cursor: pointer;
	}

	&:focus {
		outline: none;
	}
`;
