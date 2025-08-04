// import { Chart } from "../../../../components";
// import { Content } from "../../../../components";

// import styled from "styled-components";

// const BudgetTotal = styled.div`
// 	font-size: 2.1rem;
// 	font-weight: 700;
// 	margin-top: -1.5rem;
// 	margin-bottom: 1.5rem;
// 	color: ${({ total }) => (total >= 0 ? "#adffb1" : "#FF6384")};
// 	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	gap: 0.5rem;

// 	&:before {
// 		content: "${({ total }) => (total >= 0 ? "↑" : "↓")}";
// 		font-size: 1.8rem;
// 	}
// `;

// export const Budget = ({ className }) => {
// 	const accounts = [
// 		{ name: "Основной счет", balance: 125000 },
// 		{ name: "Инвестиции", balance: 85000 },
// 		{ name: "Накопительный", balance: 45000 },
// 		{ name: "Кредитная карта", balance: -15000 },
// 	];

// 	const totalBudget = accounts.reduce(
// 		(sum, account) => sum + account.balance,
// 		0
// 	);

// 	const budgetData = {
// 		datasets: [
// 			{
// 				label: "Счета",
// 				data: accounts.map((acc) => acc.balance),
// 				backgroundColor: accounts.map((acc) =>
// 					acc.balance >= 0 ? "#4C84FF" : "#FF6384"
// 				),
// 			},
// 		],
// 		labels: accounts.map((acc) => acc.name),
// 	};

// 	return (
// 		<Content className={className} title={"Общий бюджет"} inside={true}>
// 			<BudgetTotal total={totalBudget}>
// 				{Math.abs(totalBudget).toLocaleString()} ₽
// 			</BudgetTotal>
// 			<Chart
// 				type="bar"
// 				{...budgetData}
// 				colors={["#fccca1"]}
// 				darkMode={true}
// 				showLegend={false}
// 			/>
// 		</Content>
// 	);
// };

import { useCallback, useEffect, useState } from "react";
import { Chart, Loader } from "../../../../components";
import { Content } from "../../../../components";
import { useHttp } from "../../../../hooks";
import { useDispatch } from "react-redux";
import { setAlertMessage, SHOW_ALERT_MESSAGE } from "../../../../redux/actions";
import styled from "styled-components";

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
	const [budgetData, setBudgetData] = useState(null);
	const { request } = useHttp();
	const dispatch = useDispatch();

	const fetchBudgetData = useCallback(async () => {
		try {
			const data = await request("/analytics/budget");
			setBudgetData(data);
		} catch (error) {
			dispatch(setAlertMessage(error.message));
			dispatch(SHOW_ALERT_MESSAGE);
		}
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
