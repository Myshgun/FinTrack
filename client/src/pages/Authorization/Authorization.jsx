import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthFormError, Button, Input } from "../../components";
import { useAuth, useHttp } from "../../hooks";
import { setUser } from "../../redux/actions";
import { selectUserRole } from "../../redux/selectors";
import { ROLE } from "../../constants";

import styled from "styled-components";

const StyledLink = styled(Link)`
	text-decoration: underline;
	align-self: center;
`;

const authFormSchema = yup.object().shape({
	email: yup.string().required("Заполните почту").email("Почта не валидна"),
	password: yup
		.string()
		.required("Заполните пароль")
		.matches(
			/^[\w!@#$%^&()*]+$/,
			"Неверно заполнен пароль. Допускаются только буквы, цифры и спецсимволы"
		),
});

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(authFormSchema),
	});

	const roleId = useSelector(selectUserRole);
	const [serverError, setServerError] = useState(null);

	const { request } = useHttp();
	const { login } = useAuth();
	const dispatch = useDispatch();

	const onSubmit = async ({ email, password }) => {
		try {
			const { user } = await request("/auth/login", "POST", {
				email,
				password,
			});

			if (!user) {
				setServerError(
					"Произошла ошибка при авторизации. Попробуйте еще раз"
				);
				return;
			}

			login(user.id);
			dispatch(setUser(user));
		} catch (error) {
			setServerError(error);
			return;
		}
	};

	const formError = errors?.email?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId === ROLE.USER) {
		return <Navigate to="/dashboard" />;
	}

	if (roleId === ROLE.ADMIN) {
		return <Navigate to="/panel" />;
	}

	return (
		<div className={className}>
			<h2>Вход</h2>
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
				<Button disabled={!!formError}>Авторизоваться</Button>
				<StyledLink to="/register">Зарегистрироваться</StyledLink>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
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
		height: 300px;
		background-color: #2a2d3e;
		border-radius: 10px;
		box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
			rgba(0, 0, 0, 0.23) 0px 6px 6px;
	}

	& .auth-block > * {
		margin-bottom: 20px;
	}
`;
