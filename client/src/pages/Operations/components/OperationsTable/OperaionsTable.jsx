import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, Pagination, Tag } from "../../../../components";
import { OPERATION } from "../../../../constants";

import styled from "styled-components";

const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	font-size: 14px;

	th,
	td {
		padding: 12px 15px;
		text-align: left;
		border-bottom: 1px solid #e0e0e0;
	}

	th {
		background-color: #f5f5f5;
		font-weight: 600;
		color: #333;
		position: sticky;
		top: 0;
	}

	tr:hover {
		color: #555;
		background-color: #f5f5f5;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
`;

const ActionButton = styled.button`
	background: transparent;
	border: none;
	padding: 5px;
	transition: color 0.3s ease;
	margin: 0 2px;

	&:hover {
		cursor: pointer;
		opacity: 0.8;
	}
`;

const InfoButton = styled(ActionButton)`
	color: #2980b9;

	&:hover {
		color: #3498db;
	}
`;

const DeleteButton = styled(ActionButton)`
	color: #c0392b;

	&:hover {
		color: #e74c3c;
	}
`;

const AmountCell = styled.td`
	color: ${({ direction }) =>
		direction === OPERATION.INCOME ? "#27ae60" : "#e74c3c"};
	font-weight: 500;
`;

const NoDataMessage = styled.p`
	text-align: center;
	padding: 20px;
	color: #666;
`;

export const OperationsTableContainer = ({
	className,
	operations,
	onDelete,
	pagination,
	onPageChange,
	onLimitChange,
}) => {
	const [currentPage, setCurrentPage] = useState(1);

	const navigate = useNavigate();

	useEffect(() => {
		if (pagination?.page) {
			setCurrentPage(pagination.page);
		}
	}, [pagination?.page]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
		onPageChange(page);
	};

	if (!operations || operations.length === 0) {
		return <NoDataMessage>Нет операций для отображения</NoDataMessage>;
	}

	return (
		<div className={className}>
			<StyledTable>
				<thead>
					<tr>
						<th>Дата</th>
						<th>Счет</th>
						<th>Сумма</th>
						<th>Категория</th>
						<th>Описание</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					{operations.map((operation) => (
						<tr key={operation.id}>
							<td>
								{new Date(operation.date).toLocaleDateString()}
							</td>
							<td>
								{operation.account?.name || "Неизвестный счет"}
							</td>
							<AmountCell
								direction={operation.category.direction}
							>
								{operation.category.direction ===
								OPERATION.INCOME
									? "+"
									: ""}
								{operation.amount.toFixed(2)}
							</AmountCell>
							<td>
								<Tag color={operation.category.color}>
									{operation.category.description}
								</Tag>
							</td>
							<td>{operation.description || "-"}</td>
							<td>
								<InfoButton
									title="Подробнее"
									onClick={() =>
										navigate(`/operations/${operation.id}`)
									}
								>
									<Icon
										id="fa-info-circle"
										size="18px"
										$active={false}
									/>
								</InfoButton>
								<DeleteButton
									onClick={() => onDelete(operation.id)}
									title="Удалить операцию"
								>
									<Icon
										id="fa-trash-o"
										size="18px"
										$active={false}
									/>
								</DeleteButton>
							</td>
						</tr>
					))}
				</tbody>
			</StyledTable>

			{pagination && (
				<Pagination
					currentPage={currentPage}
					totalPages={pagination.pages}
					limit={pagination.limit}
					onPageChange={handlePageChange}
					onLimitChange={onLimitChange}
				/>
			)}
		</div>
	);
};

export const OperationsTable = styled(OperationsTableContainer)`
	width: 100%;
	overflow-x: auto;
	margin-top: 20px;
`;
