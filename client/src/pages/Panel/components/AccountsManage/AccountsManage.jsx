import * as yup from "yup";
import { Content, Form } from "../../../../components";

export const AccountsManage = () => {
	const fieldsToAddAccountForm = [
		{
			name: "name",
			label: "Название типа счета",
			type: "text",
			validation: yup.string().required("Введите название счета"),
		},
	];

	const onAddAccount = (values) => {};

	return (
		<Content title="Управление счетами" inside={true}>
			<Form
				fields={fieldsToAddAccountForm}
				buttonText="Добавить счет"
				onSubmit={onAddAccount}
			/>
		</Content>
	);
};
