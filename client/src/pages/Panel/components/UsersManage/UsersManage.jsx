import { useEffect, useState } from "react";
import { Button, Content, Table, Tag } from "../../../../components";
import { useHttp } from "../../../../hooks";
import { useDispatch } from "react-redux";
import { setAlertMessage, SHOW_ALERT_MESSAGE } from "../../../../redux/actions";

import styled from "styled-components";

const StyledTable = styled(Table)`
	margin-left: 20px;
`;

export const UsersManage = () => {
	const [users, setUsers] = useState([]);

	const { request } = useHttp();
	const dispatch = useDispatch();

	const fetchUsers = async () => {
		try {
			const { users } = await request("/manage/users", "GET");

			if (users) {
				setUsers(users);
			}

			return;
		} catch (error) {}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const onToggleActive = async (id) => {
		const data = await request(`/manage/users/${id}`, "PATCH");

		if (data) {
			if (data.message) {
				dispatch(setAlertMessage(data.message));
				dispatch(SHOW_ALERT_MESSAGE);
			}

			if (data.users) {
				setUsers(data.users);
			}
		}
		return;
	};

	const columns = [
		{ header: "ФИО", key: "fullname" },
		{ header: "Email", key: "email" },
		{ header: "НМТ", key: "phonenumber" },
		{ header: "Роль", key: "role" },
		{ header: "Зарегистрирован", key: "createdat" },
		{ header: "Статус", key: "status" },
		{ header: "Действия", key: "actions" },
	];

	const tableData = users.map((item) => ({
		...item,
		status: item.isActive ? "активен" : "неактивен",
	}));

	const renderRow = (item) => (
		<tr key={item.id}>
			<td>{`${item.lastName} ${item.firstName} ${item.middleName}`}</td>
			<td>{item.email}</td>
			<td>{item.phoneNumber}</td>
			<td>{item.roleId}</td>
			<td>{item.createdAt}</td>
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
		<Content
			title="Управление пользователями"
			inside={true}
			view="horizontal"
		>
			<StyledTable
				columns={columns}
				data={tableData}
				renderRow={renderRow}
			/>
		</Content>
	);
};
