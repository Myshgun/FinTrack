import { useNavigate } from "react-router-dom";
import { Button } from "../../components";

import styled from "styled-components";

const ErrorContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #20222f;
	color: #ffffff;
	text-align: center;
	padding: 0 20px;
`;

const ErrorCode = styled.h1`
	font-size: 6rem;
	margin: 0;
	color: #6c8dff;
`;

const ErrorMessage = styled.h2`
	font-size: 2rem;
	margin: 20px 0;
`;

const ErrorDescription = styled.p`
	font-size: 1.2rem;
	max-width: 600px;
	margin-bottom: 30px;
`;

export const ErrorPage = ({
	code = 404,
	message = "Страница не найдена",
	description,
}) => {
	const navigate = useNavigate();

	const defaultDescriptions = {
		404: "Запрашиваемая страница не существует или была перемещена",
		403: "У вас нет доступа к этой странице",
		500: "Произошла внутренняя ошибка сервера",
		401: "Требуется авторизация для доступа к этой странице",
	};

	return (
		<ErrorContainer>
			<ErrorCode>{code}</ErrorCode>
			<ErrorMessage>{message}</ErrorMessage>
			<ErrorDescription>
				{description ||
					defaultDescriptions[code] ||
					"Произошла непредвиденная ошибка"}
			</ErrorDescription>
			<Button onClick={() => navigate(-1)} variant="primary">
				Назад
			</Button>
		</ErrorContainer>
	);
};
