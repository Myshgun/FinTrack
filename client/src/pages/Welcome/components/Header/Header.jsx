import { Logo } from "../../../../components";
import { HeaderAuth } from "./components";

import styled from "styled-components";

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo iconSize="60px" redirectLink="/" />
		<HeaderAuth />
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 100%;
	height: 100px;
	padding: 20px 40px;
	box-shadow: 0px -8px 17px #000;
	background: #2a2d3e;
`;
