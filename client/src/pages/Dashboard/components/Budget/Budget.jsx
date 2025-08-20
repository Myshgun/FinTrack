import { useCallback, useEffect } from "react";
import { Chart, Loader } from "../../../../components";
import { Content } from "../../../../components";
import { useHttp } from "../../../../hooks";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { loadBudgetDataAsync } from "../../../../redux/actions/analytics";
import { selectAnalyticsBudget } from "../../../../redux/selectors/analytics";

const BudgetTotal = styled.div`
	font-size: 2.1rem;
	font-weight: 700;
	margin-top: -1.5rem;
	margin-bottom: 1.5rem;
	color: ${({ total }) => (total >= 0 ? "#adffb1" : "#FF6384")};
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	&:before {
		content: "${({ total }) => (total >= 0 ? "↑" : "↓")}";
		font-size: 1.8rem;
	}
`;

export const Budget = ({ className }) => {
	const budgetData = useSelector(selectAnalyticsBudget);

	const { request } = useHttp();
	const dispatch = useDispatch();

	const fetchBudgetData = useCallback(async () => {
		dispatch(loadBudgetDataAsync(request));
	}, [request, dispatch]);

	useEffect(() => {
		fetchBudgetData();
	}, [fetchBudgetData]);

	if (!budgetData) {
		return (
			<Content className={className} title="Общий бюджет" inside={true}>
				<Loader />
			</Content>
		);
	}

	const chartData = {
		datasets: [
			{
				label: "Счета",
				data: budgetData.accounts.map((acc) => acc.balance),
				backgroundColor: budgetData.accounts.map((acc) =>
					acc.balance >= 0 ? "#4C84FF" : "#FF6384"
				),
			},
		],
		labels: budgetData.accounts.map((acc) => acc.name),
	};

	return (
		<Content className={className} title="Общий бюджет" inside={true}>
			<BudgetTotal total={budgetData.total}>
				{Math.abs(budgetData.total).toLocaleString("ru-RU")} ₽
			</BudgetTotal>
			<Chart
				type="bar"
				{...chartData}
				colors={["#fccca1"]}
				darkMode={true}
				showLegend={false}
			/>
		</Content>
	);
};
