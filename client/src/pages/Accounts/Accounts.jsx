import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Content, Form } from "../../components";
import { AccountCard } from "./components";
import { useHttp } from "../../hooks";
import { selectAccounts, selectAccountTypes } from "../../redux/selectors";
import {
	addAccountAsync,
	setAlertMessage,
	SHOW_ALERT_MESSAGE,
} from "../../redux/actions";

import styled from "styled-components";

const StyledDiv = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	width: 100%;
	margin-top: 40px;
`;

export const Accounts = () => {
	const accounts = useSelector(selectAccounts);
	const typesOfAccounts = useSelector(selectAccountTypes);

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
			options: typesOfAccounts,
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
			<Content inside={true}>
				<Form
					fields={fieldsToAddAccountForm}
					buttonText="Добавить счет"
					onSubmit={onAddAccount}
				/>
				<StyledDiv>
					{accounts.map((account) => (
						<AccountCard key={account.id} account={account} />
					))}
				</StyledDiv>
			</Content>
		</Content>
	);
};
