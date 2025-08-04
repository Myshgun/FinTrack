import styled from "styled-components";

const IconContainer = ({ className, id, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = "24px" }) => size};
	margin: ${({ margin = "0" }) => margin};

	&:hover {
		cursor: ${({ $active = true }) => ($active ? "default" : "pointer")};
	}
`;
