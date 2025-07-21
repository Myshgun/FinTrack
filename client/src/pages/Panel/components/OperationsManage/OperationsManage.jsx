import * as yup from "yup";
import { Button, Content, Form, Table, Tag } from "../../../../components";
import {
	addOperationCategoryAsync,
	setAlertMessage,
	SHOW_ALERT_MESSAGE,
	toggleOperationCategoryActiveAsync,
} from "../../../../redux/actions";
import { useHttp } from "../../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { selectOperationCategories } from "../../../../redux/selectors";

import styled from "styled-components";
import { OPERATION } from "../../../../constants";

const StyledTable = styled(Table)`
	margin-left: 20px;
`;

const StyledForm = styled(Form)`
	margin-left: 20px;
`;

export const OperationsManage = () => {
	const fieldsToAddOperationForm = [
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
		{
			name: "direction",
			label: "Вид",
			type: "text",
			as: "select",
			options: [
				{ value: OPERATION.INCOME, label: "Доход" },
				{ value: OPERATION.OUTCOME, label: "Расход" },
			],
			validation: yup.string().required("Введите название"),
		},
		{
			name: "color",
			label: "Цвет",
			type: "color",
			validation: yup
				.string()
				.required("Выберите цвет")
				.matches(
					/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
					"Некорректный HEX-формат цвета"
				),
		},
	];

	const operationCategories = useSelector(selectOperationCategories);

	const { request } = useHttp();
	const dispatch = useDispatch();

	const onAddOperationCategory = (data) => {
		dispatch(
			addOperationCategoryAsync(request, {
				...data,
			})
		).then((message) => {
			dispatch(setAlertMessage(message));
			dispatch(SHOW_ALERT_MESSAGE);
		});
	};

	const onToggleActive = (id) => {
		dispatch(toggleOperationCategoryActiveAsync(request, id)).then(
			(message) => {
				dispatch(setAlertMessage(message));
				dispatch(SHOW_ALERT_MESSAGE);
			}
		);
	};

	const columns = [
		{ header: "Тип", key: "type" },
		{ header: "Название", key: "description" },
		{ header: "Вид", key: "direction" },
		{ header: "Статус", key: "status" },
		{ header: "Действия", key: "actions" },
	];

	const tableData = operationCategories.map((item) => ({
		...item,
		direction: item.direction === OPERATION.INCOME ? "Доход" : "Расход",
		status: item.isActive ? "активен" : "неактивен",
	}));

	const renderRow = (item) => (
		<tr key={item.id}>
			<td>{item.type}</td>
			<td>
				<Tag color={item.color}>{item.description}</Tag>
			</td>
			<td>{item.direction}</td>
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
		<Content title="Управление операциями" inside={true} view="horizontal">
			<StyledForm
				fields={fieldsToAddOperationForm}
				buttonText="Добавить категорию"
				onSubmit={onAddOperationCategory}
			/>
			<StyledTable
				columns={columns}
				data={tableData}
				renderRow={renderRow}
			/>
		</Content>
	);
};
