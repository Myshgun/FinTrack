import { Content } from "../../components";
import { AccountsManage, OperationsManage, UsersManage } from "./components";

import styled from "styled-components";

const StyledHr = styled.hr`
	height: 2px;
	margin: 24px 0;
	width: 100%;
	position: relative;
	background: linear-gradient(90deg, #3498db, #2ecc71, #3498db);
`;

export const Panel = () => {
	return (
		<Content title="Панель администратора">
			<AccountsManage />
			<StyledHr />
			<OperationsManage />
			<StyledHr />
			<UsersManage />
		</Content>
	);
};
