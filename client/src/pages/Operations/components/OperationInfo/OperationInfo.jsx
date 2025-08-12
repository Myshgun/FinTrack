import { useNavigate } from "react-router-dom";
import { Icon, Tag } from "../../../../components";
import { OPERATION } from "../../../../constants";
import styled from "styled-components";

const OperationDetails = styled.div`
	background-color: #20222f;
	padding: 20px;
	border-radius: 8px;
	color: #f0f0f0;
	max-width: 800px;
	margin: 0 auto;
	border: 1px solid #44475a;
`;

const DetailRow = styled.div`
	display: flex;
	margin-bottom: 15px;
	padding: 12px 16px;
	border-bottom: 1px solid #44475a;
	align-items: center;

	&:hover {
		background-color: #3b3e58;
	}
`;

const DetailLabel = styled.div`
	font-weight: 600;
	width: 150px;
	color: #a0a0a0;
	font-size: 14px;
`;

const DetailValue = styled.div`
	flex: 1;
	font-size: 14px;
	display: flex;
	align-items: center;
`;

const BackButton = styled.button`
	display: flex;
	align-items: center;
	gap: 5px;
	background-color: #2a2d3e;
	border: 1px solid #44475a;
	color: #f0f0f0;
	padding: 8px 15px;
	border-radius: 4px;
	cursor: pointer;
	margin-bottom: 20px;
	transition: background 0.2s;
	font-size: 14px;

	&:hover {
		background-color: #3b3e58;
	}
`;

const Header = styled.h2`
	font-size: 18px;
	font-weight: 600;
	color: #f0f0f0;
	margin-bottom: 20px;
	padding-bottom: 10px;
	border-bottom: 1px solid #44475a;
`;

const AmountTag = styled.span`
	color: ${({ direction }) =>
		direction === OPERATION.INCOME ? "#27ae60" : "#e74c3c"};
	font-weight: 500;
	margin-right: 8px;
`;

export const OperationInfo = ({ operation }) => {
	const navigate = useNavigate();

	if (!operation) {
		return <div style={{ color: "#f0f0f0" }}>Загрузка данных...</div>;
	}

	return (
		<>
			<BackButton onClick={() => navigate(-1)}>
				<Icon id="fa-arrow-left" size="16px" color="#f0f0f0" />
				Назад к списку
			</BackButton>

			<OperationDetails>
				<Header>Детали операции</Header>

				<DetailRow>
					<DetailLabel>Идентификатор:</DetailLabel>
					<DetailValue>{operation.id}</DetailValue>
				</DetailRow>

				<DetailRow>
					<DetailLabel>Дата:</DetailLabel>
					<DetailValue>
						{new Date(operation.date).toLocaleDateString()}
					</DetailValue>
				</DetailRow>

				<DetailRow>
					<DetailLabel>Счет:</DetailLabel>
					<DetailValue>
						{operation.account?.name || "Неизвестный счет"}
					</DetailValue>
				</DetailRow>

				<DetailRow>
					<DetailLabel>Сумма:</DetailLabel>
					<DetailValue>
						<AmountTag direction={operation.category?.direction}>
							{operation.category?.direction === OPERATION.INCOME
								? "+"
								: ""}
							{operation.amount.toFixed(2)}
						</AmountTag>
						{operation.currency}
					</DetailValue>
				</DetailRow>

				<DetailRow>
					<DetailLabel>Категория:</DetailLabel>
					<DetailValue>
						<Tag color={operation.category?.color}>
							{operation.category?.description}
						</Tag>
					</DetailValue>
				</DetailRow>

				<DetailRow>
					<DetailLabel>Тип:</DetailLabel>
					<DetailValue>
						{operation.category?.direction === "income"
							? "Доход"
							: "Расход"}
					</DetailValue>
				</DetailRow>

				<DetailRow>
					<DetailLabel>Описание:</DetailLabel>
					<DetailValue>{operation.description || "-"}</DetailValue>
				</DetailRow>
			</OperationDetails>
		</>
	);
};
