import styled from "styled-components";

const ContentContainer = ({
	className,
	children,
	title,
	inside = false,
	view,
}) => {
	return (
		<div className={className}>
			{!inside ? <h3>{title}</h3> : <h4>{title}</h4>}
			{children}
		</div>
	);
};

export const Content = styled(ContentContainer)`
	display: flex;
	align-items: center;
	flex-direction: ${({ view }) => (view === "horizontal" ? "row" : "column")};
	width: ${({ inside }) => (!inside ? "calc(100vw - 300px)" : "100%")};
	min-height: ${({ inside }) => (!inside ? "calc(100% - 60px)" : "100%")};
	padding: 10px 30px;
	font-size: 20px;
	border-radius: 10px;
	background-color: #2a2d3e;
	overflow-y: auto;

	& h3,
	h4 {
		text-align: center;
		align-self: center;
		color: ${({ inside }) => (!inside ? "inherit" : "#FDC4A5")};
	}
`;
