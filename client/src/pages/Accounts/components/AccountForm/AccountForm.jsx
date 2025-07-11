import { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthFormError, Button, Input } from "../../../../components";
import { useHttp } from "../../../../hooks";
import {
	addAccountAsync,
	setAlertMessage,
	SHOW_ALERT_MESSAGE,
} from "../../../../redux/actions";

import styled from "styled-components";

const accountFormSchema = yup.object().shape({
	name: yup.string().required("Введите название счета"),
	type: yup.string().required("Выберите тип счета"),
});

const AccountFormContainer = ({ className }) => {
	const dispatch = useDispatch();
	const { request } = useHttp();

	const [serverError, setServerError] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			name: "",
			type: "",
		},
		resolver: yupResolver(accountFormSchema),
	});

	const formError = errors?.name?.message || errors?.type?.message;
	const errorMessage = formError || serverError;

	const onSave = (formData) => {
		dispatch(
			addAccountAsync(request, {
				...formData,
			})
		).then((message) => {
			dispatch(setAlertMessage(message));
			dispatch(SHOW_ALERT_MESSAGE);
			reset();
		});
	};

	return (
		<form className={className} onSubmit={handleSubmit(onSave)}>
			<div className="main-block">
				<Input
					name="name"
					type="text"
					{...register("name", {
						onChange: () => setServerError(null),
					})}
				>
					Название счета
				</Input>
				<Input
					name="type"
					as="select"
					options={[
						{ value: "cash", label: "Наличные" },
						{ value: "card", label: "Карта" },
						{ value: "deposit", label: "Депозит" },
					]}
					{...register("type", {
						onChange: () => setServerError(null),
					})}
				>
					Тип счета
				</Input>
				<Button style="success">Добавить счет</Button>
			</div>
			{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
		</form>
	);
};

export const AccountForm = styled(AccountFormContainer)`
	display: flex;
	flex-direction: column;

	.main-block {
		display: flex;
		gap: 10px;
	}
`;
