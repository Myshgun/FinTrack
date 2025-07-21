import styled from "styled-components";

const DefaultTag = styled.span`
	display: inline-block;
	padding: 4px 12px;
	font-size: 14px;
	border-radius: 9999px;
	border: 1.5px solid #007bff;
	background-color: #e7f1ff;
	color: #007bff;
	user-select: none;
	white-space: nowrap;
`;

export const Tag = styled(DefaultTag)`
	border-color: ${({ color }) => color || "#007bff"};
	background-color: ${({ color }) => (color ? `${color}33` : "#e7f1ff")};
	color: ${({ color }) => color || "#007bff"};
`;
