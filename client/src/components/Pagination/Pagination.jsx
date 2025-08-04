import styled from "styled-components";

const PaginationContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	gap: 10px;
`;

const PageButton = styled.button`
	padding: 8px 12px;
	border: 1px solid #ddd;
	background-color: ${({ $active }) => ($active ? "#007bff" : "white")};
	color: ${({ $active }) => ($active ? "white" : "#333")};
	cursor: pointer;
	border-radius: 4px;
	transition: all 0.3s;

	&:hover {
		background-color: ${({ $active }) => ($active ? "#0069d9" : "#f1f1f1")};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const LimitSelector = styled.select`
	padding: 8px;
	border-radius: 4px;
	border: 1px solid #ddd;
	margin-left: 20px;
`;

const PaginationInfo = styled.span`
	margin-left: 10px;
	color: #666;
`;

export const Pagination = ({
	currentPage,
	totalPages,
	limit,
	onPageChange,
	onLimitChange,
}) => {
	const pages = [];
	const maxVisiblePages = 5;

	let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
	let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

	if (endPage - startPage + 1 < maxVisiblePages) {
		startPage = Math.max(1, endPage - maxVisiblePages + 1);
	}

	for (let i = startPage; i <= endPage; i++) {
		pages.push(
			<PageButton
				key={i}
				$active={i === currentPage}
				onClick={() => onPageChange(i)}
			>
				{i}
			</PageButton>
		);
	}

	return (
		<PaginationContainer>
			<PageButton
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
			>
				&laquo;
			</PageButton>
			<PageButton
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				&lsaquo;
			</PageButton>
			{pages}
			<PageButton
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages || totalPages === 0}
			>
				&rsaquo;
			</PageButton>
			<PageButton
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages || totalPages === 0}
			>
				&raquo;
			</PageButton>

			<LimitSelector
				value={limit}
				onChange={(e) => onLimitChange(Number(e.target.value))}
			>
				<option value={5}>5</option>
				<option value={10}>10</option>
				<option value={20}>20</option>
				<option value={50}>50</option>
			</LimitSelector>

			<PaginationInfo>
				Страница {currentPage} из {totalPages}
			</PaginationInfo>
		</PaginationContainer>
	);
};
