import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthFormError, Button, Input } from "../../components";
import { useHttp } from "../../hooks";
import { registerAsync } from "../../redux/actions";

import styled from "styled-components";

const regFormSchema = yup.object().shape({
	email: yup.string().required("Заполните почту").email("Почта не валидна"),
	password: yup
		.string()
		.required("Заполните пароль")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&()]).{8,}$/,
			"Пароль должен содержать минимум 8 символов, включая заглавную, строчную букву, цифру и спецсимвол"
		),
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
		mode: "onTouched",
		resolver: yupResolver(regFormSchema),
	});

	const { request } = useHttp();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async ({ email, password }) => {
		dispatch(registerAsync(request, { email, password }));
		navigate("/login");
	};

	const formError =
		errors?.email?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message;

	return (
		<div className={className}>
			<h2>Регистрация</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="auth-block">
				<Input
					name="email"
					type="text"
					{...register("email")}
					label="Почта"
				/>
				<Input
					name="password"
					type="password"
					label="Пароль"
					{...register("password")}
				/>
				<Input
					name="passcheck"
					type="password"
					label="Повтор пароля"
					{...register("passcheck")}
				/>
				<Button disabled={!!formError}>Зарегистрироваться</Button>
				{formError && <AuthFormError>{formError}</AuthFormError>}
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
