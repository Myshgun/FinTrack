import styled from "styled-components";

const PaginationContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	gap: 8px;
	background-color: #20222f;
	padding: 12px;
	border-radius: 8px;
	border: 1px solid #44475a;
`;

const PageButton = styled.button`
	padding: 8px 12px;
	border: 1px solid #44475a;
	background-color: ${({ $active }) => ($active ? "#3b3e58" : "#2a2d3e")};
	color: #f0f0f0;
	cursor: pointer;
	border-radius: 4px;
	transition: all 0.3s;
	font-size: 14px;
	min-width: 36px;

	&:hover {
		background-color: ${({ $active }) => ($active ? "#4a4d68" : "#3b3e58")};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: #2a2d3e;
	}
`;

const LimitSelector = styled.select`
	padding: 8px;
	border-radius: 4px;
	border: 1px solid #44475a;
	margin-left: 20px;
	background-color: #2a2d3e;
	color: #f0f0f0;
	font-size: 14px;
`;

const PaginationInfo = styled.span`
	margin-left: 10px;
	color: #a0a0a0;
	font-size: 14px;
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
