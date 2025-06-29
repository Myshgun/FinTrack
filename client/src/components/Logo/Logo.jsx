import { Link } from "react-router-dom";
import { Icon } from "../Icon/Icon";

import styled from "styled-components";

const LargeText = styled.div`
	font-size: ${({ fontSize }) => (fontSize ? fontSize : "48px")};
	font-weight: 600;
	line-height: 48px;
	margin: 0 auto;
`;

const LogoContainer = ({ className, fontSize, iconSize, redirectLink }) => (
	<Link className={className} to={redirectLink}>
		<Icon id="fa-line-chart" size={iconSize} margin="0 10px 0 0" />
		<LargeText fontSize={fontSize}>FinTrack</LargeText>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	align-items: center;
	margin: ${({ margin }) => (margin ? margin : "")};
`;
