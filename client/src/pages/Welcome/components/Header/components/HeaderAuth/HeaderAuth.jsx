import { Link } from "react-router-dom";
import { Button } from "../../../../../../components";
import styled from "styled-components";

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const HeaderAuthContainer = ({ className }) => {
	return (
		<div className={className}>
			<RightAligned>
				<Link to="/login">
					<Button>Войти</Button>
				</Link>
			</RightAligned>
		</div>
	);
};

export const HeaderAuth = styled(HeaderAuthContainer)`
	display: flex;
	align-items: center;
`;
