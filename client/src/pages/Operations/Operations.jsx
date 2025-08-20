import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Content, Form } from "../../components";
import { OperationInfo, OperationsTable } from "./components";
import { useHttp } from "../../hooks";
import {
	selectAccounts,
	selectOperationCategories,
	selectOperations,
	selectOperationsPagination,
} from "../../redux/selectors";
import { addOperationAsync } from "../../redux/actions";
import { getOperationById } from "./utils";

export const Operations = () => {
	const accounts = useSelector(selectAccounts);
	const categoriesOfOperation = useSelector(selectOperationCategories);
	const operations = useSelector(selectOperations);
	const pagination = useSelector(selectOperationsPagination);

	const [currentPage, setCurrentPage] = useState(pagination.page);
	const [limit, setLimit] = useState(pagination.limit);

	const dispatch = useDispatch();
	const { request } = useHttp();

	const { id } = useParams();

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

	const onAddOperation = async (data) => {
		dispatch(
			addOperationAsync(
				request,
				{
					...data,
					amount: parseFloat(data.amount),
				},
				limit
			)
		);
		setCurrentPage(1);
	};

	return (
		<Content title="Операции">
			<Content inside={true}>
				{id ? (
					<OperationInfo
						operation={getOperationById(operations, id)}
					/>
				) : (
					<>
						<Form
							fields={fieldsToAddOperationForm}
							buttonText="Добавить операцию"
							onSubmit={onAddOperation}
							view="horizontal"
						/>

						<Content title="История операций" inside={true}>
							<OperationsTable
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
								limit={limit}
								setLimit={setLimit}
							/>
						</Content>
					</>
				)}
			</Content>
		</Content>
	);
};
