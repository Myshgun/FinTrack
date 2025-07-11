import { Content } from "../../components";
import { AccountsManage, OperationsManage, UsersManage } from "./components";

export const Panel = () => {
	return (
		<Content title="Панель администратора">
			<AccountsManage />
			<OperationsManage />
			<UsersManage />
		</Content>
	);
};
