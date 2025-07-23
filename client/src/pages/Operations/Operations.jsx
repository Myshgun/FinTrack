import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Content, Form } from "../../components";
import { useHttp } from "../../hooks";
import {
	selectAccounts,
	selectOperationCategories,
	selectOperations,
} from "../../redux/selectors";
import {
	addOperationAsync,
	setAlertMessage,
	SHOW_ALERT_MESSAGE,
} from "../../redux/actions";
import { removeOperationAsync } from "../../redux/actions";
import { OperationsTable } from "./components";

export const Operations = () => {
	const accounts = useSelector(selectAccounts);
	const categoriesOfOperation = useSelector(selectOperationCategories);
	const operations = useSelector(selectOperations);

	const fieldsToAddOperationForm = [
		{
			name: "account",
			label: "Счет",
			as: "select",
			options: accounts.map((account) => ({
				value: account.id,
				label: account.name,
			})),
			validation: yup.string().required("Выберите счет"),
		},
		{
			name: "amount",
			label: "Сумма",
			type: "number",
			step: "0.01",
			validation: yup
				.number()
				.required("Введите сумму")
				.moreThan(0, "Сумма должна быть больше 0"),
		},
		{
			name: "date",
			label: "Дата",
			type: "date",
			validation: yup.date().required("Выберите дату"),
		},
		{
			name: "category",
			label: "Категория",
			as: "select",
			options: categoriesOfOperation.map((category) => ({
				value: category.id,
				label: category.description,
			})),
			validation: yup.string().required("Выберите категорию"),
		},
		{
			name: "description",
			label: "Описание",
			type: "text",
			validation: yup.string().max(200, "Описание слишком длинное"),
		},
	];

	const dispatch = useDispatch();
	const { request } = useHttp();

	const onAddOperation = async (data) => {
		dispatch(
			addOperationAsync(request, {
				...data,
				amount: parseFloat(data.amount),
			})
		).then((message) => {
			dispatch(setAlertMessage(message));
			dispatch(SHOW_ALERT_MESSAGE);
		});
	};

	const onDeleteOperation = (id) => {
		dispatch(removeOperationAsync(request, id)).then((message) => {
			dispatch(setAlertMessage(message));
			dispatch(SHOW_ALERT_MESSAGE);
		});
	};

	return (
		<Content title="Операции">
			<Content inside={true}>
				<Form
					fields={fieldsToAddOperationForm}
					buttonText="Добавить операцию"
					onSubmit={onAddOperation}
					view="horizontal"
				/>

				<Content title="История операций" inside={true}>
					<OperationsTable
						operations={operations}
						onDelete={onDeleteOperation}
					/>
				</Content>
			</Content>
		</Content>
	);
};
