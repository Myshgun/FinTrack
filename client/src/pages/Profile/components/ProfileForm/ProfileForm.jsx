import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AuthFormError, Icon, Input } from "../../../../components";
import { useHttp } from "../../../../hooks";
import {
	setAlertMessage,
	SHOW_ALERT_MESSAGE,
	updateProfileAsync,
} from "../../../../redux/actions";
import { selectUser } from "../../../../redux/selectors";

import styled from "styled-components";

const StyledButton = styled.button`
	margin-left: 20px;
	border: none;
	background: none;
	color: #fff;
`;

const profileFormSchema = yup.object().shape({
	firstName: yup.string(),
	lastName: yup.string(),
	middleName: yup.string(),
	email: yup.string().email("Почта не валидна"),
	phoneNumber: yup
		.string()
		.matches(
			/^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
			"Введите корректный номер телефона"
		),
	photoUrl: yup.string().url(),
});

const ProfileFormContainer = ({ className }) => {
	const dispatch = useDispatch();
	const { request } = useHttp();
	const navigate = useNavigate();

	const {
		id,
		firstName,
		lastName,
		middleName,
		email,
		phoneNumber,
		photoUrl,
	} = useSelector(selectUser);

	const [serverError, setServerError] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: firstName,
			lastName: lastName,
			middleName: middleName,
			email: email,
			phoneNumber: phoneNumber,
			photoUrl: photoUrl,
		},
		resolver: yupResolver(profileFormSchema),
	});

	const formError =
		errors?.firstName?.message ||
		errors?.lastName?.message ||
		errors?.middleName?.message ||
		errors?.email?.message ||
		errors?.phoneNumber?.message ||
		errors?.photoUrl?.message;
	const errorMessage = formError || serverError;

	const onSave = (formData) => {
		dispatch(
			updateProfileAsync(request, {
				id,
				...formData,
			})
		).then((message) => {
			dispatch(setAlertMessage(message));
			dispatch(SHOW_ALERT_MESSAGE);
			navigate(`/profile`);
		});
	};

	return (
		<form className={className} onSubmit={handleSubmit(onSave)}>
			<div className="main-block">
				<div className="info-block">
					<Input name="photo" type="url" {...register("photoUrl")}>
						Изображение
					</Input>
					<Input
						name="lastName"
						type="text"
						{...register("lastName", {
							onChange: () => setServerError(null),
						})}
					>
						Фамилия
					</Input>
					<Input
						name="firstName"
						type="text"
						{...register("firstName", {
							onChange: () => setServerError(null),
						})}
					>
						Имя
					</Input>
					<Input
						name="middleName"
						type="text"
						{...register("middleName", {
							onChange: () => setServerError(null),
						})}
					>
						Отчество
					</Input>
				</div>
				<StyledButton type="submit">
					<Icon id="fa-floppy-o" size="30px" inactive={false} />
				</StyledButton>
			</div>
			<div className="contacts-block">
				<Input
					name="email"
					type="email"
					{...register("email", {
						onChange: () => setServerError(null),
					})}
				>
					Email
				</Input>
				<Input
					name="phoneNumber"
					type="tel"
					{...register("phoneNumber", {
						onChange: () => setServerError(null),
					})}
				>
					Телефон
				</Input>
			</div>
			{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
		</form>
	);
};

export const ProfileForm = styled(ProfileFormContainer)`
	display: flex;
	flex-direction: column;

	& .main-block {
		display: flex;
		align-items: start;
		margin-bottom: 30px;
		width: 100%;
	}

	& .info-block {
		display: flex;
		flex-direction: column;
		align-self: start;
		width: 100%;
		line-height: 2;
	}

	& .fullname-block {
		margin-left: 40px;
	}

	& .fullname-block > div,
	.contacts-block > div,
	.registered-at-block {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}

	& .contacts-block,
	.registered-at-block {
		line-height: 2;
		align-self: start;
	}

	& .contacts-block {
		margin-bottom: 50px;
	}
`;
