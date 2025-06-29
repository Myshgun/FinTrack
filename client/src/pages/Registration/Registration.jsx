import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthFormError, Button, Input } from "../../components";
import { server } from "../../bff";
import { setUser } from "../../redux/actions";
import { selectUserRole } from "../../redux/selectors";
import { ROLE } from "../../constants";

import styled from "styled-components";

const regFormSchema = yup.object().shape({
	email: yup.string().required("Заполните почту").email("Почта не валидна"),
	password: yup
		.string()
		.required("Заполните пароль")
		.matches(
			/^[\w#%]+$/,
			"Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %"
		)
		.min(6, "Неверно заполнен пароль. Минимум 6 символов")
		.max(30, "Неверно заполнен пароль. Мaксимум 30 символов"),
	passcheck: yup
		.string()
		.required("Заполните повтор пароля")
		.oneOf([yup.ref("password"), null], "Повтор пароля не совпадает"),
});

const RegistrationPageContainer = ({ className }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
			passcheck: "",
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	const onSubmit = ({ email, password }) => {
		server.register(email, password).then(({ error, res }) => {
			console.log(res);
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
			localStorage.setItem("userData", JSON.stringify(res));
		});
	};

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId === ROLE.USER) {
		return <Navigate to="/dashboard" />;
	}

	return (
		<div className={className}>
			<h2>Регистрация</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="auth-block">
				<Input
					name="email"
					type="text"
					{...register("email", {
						onChange: () => setServerError(null),
					})}
				>
					Почта
				</Input>
				<Input
					name="password"
					type="password"
					{...register("password", {
						onChange: () => setServerError(null),
					})}
				>
					Пароль
				</Input>
				<Input
					name="passcheck"
					type="password"
					{...register("passcheck", {
						onChange: () => setServerError(null),
					})}
				>
					Повтор пароля
				</Input>
				<Button disabled={!!formError}>Зарегистрироваться</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationPageContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;

	& .auth-block {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 20px 30px;
		width: 460px;
		height: 350px;
		background-color: #2a2d3e;
		border-radius: 10px;
		box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
			rgba(0, 0, 0, 0.23) 0px 6px 6px;
	}

	& .auth-block > * {
		margin-bottom: 20px;
	}
`;
