import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthFormError, Button, Input } from "../../components";
import { useHttp } from "../../hooks";
import { authorizeAsync } from "../../redux/actions";
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

	const { request } = useHttp();
	const dispatch = useDispatch();

	const onSubmit = async ({ email, password }) => {
		dispatch(authorizeAsync(request, { email, password }));
	};

	const formError = errors?.email?.message || errors?.password?.message;

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
					label="Почта"
					{...register("email")}
				/>
				<Input
					name="password"
					type="password"
					label="Пароль"
					{...register("password")}
				/>
				<Button disabled={!!formError}>Авторизоваться</Button>
				<StyledLink to="/register">Зарегистрироваться</StyledLink>
				{formError && <AuthFormError>{formError}</AuthFormError>}
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
