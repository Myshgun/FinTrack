import * as yup from "yup";
import { Button, Content, Form, Table } from "../../../../components";
import {
	addAccountTypeAsync,
	SHOW_ALERT_MESSAGE,
	toggleAccountTypeActiveAsync,
} from "../../../../redux/actions";
import { useHttp } from "../../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { selectAccountTypes } from "../../../../redux/selectors";

import styled from "styled-components";

const StyledTable = styled(Table)`
	margin-left: 20px;
`;

const StyledForm = styled(Form)`
	margin-left: 20px;
`;

export const AccountsManage = () => {
	const fieldsToAddAccountForm = [
		{
			name: "type",
			label: "Тип",
			type: "text",
			validation: yup.string().required("Введите тип"),
		},
		{
			name: "description",
			label: "Название",
			type: "text",
			validation: yup.string().required("Введите название"),
		},
	];

	const accountTypes = useSelector(selectAccountTypes);

	const { request } = useHttp();
	const dispatch = useDispatch();

	const onAddAccountType = (data) => {
		dispatch(addAccountTypeAsync(request, { ...data }));
	};

	const onToggleActive = (id) => {
		dispatch(toggleAccountTypeActiveAsync(request, id));
	};

	const columns = [
		{ header: "Тип", key: "type" },
		{ header: "Название", key: "description" },
		{ header: "Статус", key: "status" },
		{ header: "Действия", key: "actions" },
	];

	const tableData = accountTypes.map((item) => ({
		...item,
		status: item.isActive ? "активен" : "неактивен",
	}));

	const renderRow = (item) => (
		<tr key={item.id}>
			<td>{item.type}</td>
			<td>{item.description}</td>
			<td>{item.status}</td>
			<td>
				<Button
					style={item.isActive ? "danger" : "success"}
					onClick={() => onToggleActive(item.id)}
				>
					{item.isActive ? "Деактивировать" : "Активировать"}
				</Button>
			</td>
		</tr>
	);

	return (
		<Content title="Управление счетами" inside={true} view="horizontal">
			<StyledForm
				fields={fieldsToAddAccountForm}
				buttonText="Добавить тип"
				onSubmit={onAddAccountType}
			/>
			<StyledTable
				columns={columns}
				data={tableData}
				renderRow={renderRow}
			/>
		</Content>
	);
};
