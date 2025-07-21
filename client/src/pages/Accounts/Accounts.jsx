import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Content, Form } from "../../components";
import { AccountCard, AccountForm } from "./components";
import { useHttp } from "../../hooks";
import { selectAccounts } from "../../redux/selectors";
import {
	addAccountAsync,
	setAlertMessage,
	SHOW_ALERT_MESSAGE,
} from "../../redux/actions";

export const Accounts = () => {
	const accounts = useSelector(selectAccounts);

	const fieldsToAddAccountForm = [
		{
			name: "name",
			label: "Название счета",
			type: "text",
			validation: yup.string().required("Введите название счета"),
		},
		{
			name: "type",
			label: "Тип счета",
			as: "select",
			options: [
				{ value: "cash", label: "Наличные" },
				{ value: "card", label: "Карта" },
				{ value: "deposit", label: "Депозит" },
			],
			validation: yup.string().required("Выберите тип счета"),
		},
	];

	const dispatch = useDispatch();
	const { request } = useHttp();

	const onAddAccount = async (data) => {
		dispatch(
			addAccountAsync(request, {
				...data,
			})
		).then((message) => {
			dispatch(setAlertMessage(message));
			dispatch(SHOW_ALERT_MESSAGE);
		});
	};

	return (
		<Content title="Счета">
			<Content inside={true} view="horizontal">
				<Form
					fields={fieldsToAddAccountForm}
					buttonText="Добавить счет"
					onSubmit={onAddAccount}
				/>
				<div>
					{accounts.map((account) => (
						<AccountCard key={account.id} account={account} />
					))}
				</div>
			</Content>
		</Content>
	);
};
