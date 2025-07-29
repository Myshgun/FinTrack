import { Chart, Content } from "../../components";

import styled from "styled-components";

const DashboardContainer = ({ className }) => {
	// Данные для графиков
	const months = [
		"Янв",
		"Фев",
		"Мар",
		"Апр",
		"Май",
		"Июн",
		"Июл",
		"Авг",
		"Сен",
		"Окт",
		"Ноя",
		"Дек",
	];

	// 1. Динамика накоплений
	const savingsData = {
		datasets: [
			{
				label: "Накопления",
				data: [
					125, 143, 168, 152, 175, 191, 208, 225, 243, 260, 278, 300,
				],
			},
		],
		labels: months,
	};

	// 2. Доходы по месяцам
	const incomeData = {
		datasets: [
			{
				label: "Доходы",
				data: [
					120, 150, 180, 135, 210, 190, 220, 230, 200, 250, 240, 300,
				],
			},
		],
		labels: months,
	};

	// 3. Расходы по месяцам
	const expenseData = {
		datasets: [
			{
				label: "Расходы",
				data: [
					80, 95, 110, 100, 120, 115, 130, 125, 110, 140, 135, 160,
				],
			},
		],
		labels: months,
	};

	// 4. Расходы по категориям
	const categoriesData = {
		datasets: [
			{
				data: [35, 25, 15, 15, 10],
			},
		],
		labels: ["Еда", "Жилье", "Транспорт", "Развлечения", "Другое"],
	};

	// Данные для индикатора роста (разница в процентах между месяцами)
	const growthData = {
		datasets: [
			{
				label: "Рост",
				data: [5.2, -1.8, 3.4, 7.1, -2.3, 4.6], // Пример данных: +5.2%, -1.8% и т.д.
				barPercentage: 0.6, // Уменьшаем ширину столбцов
			},
		],
		labels: ["Сент", "Окт", "Ноя", "Дек", "Янв", "Фев"], // Последние 6 месяцев
	};

	// Данные по счетам (пример)
	const accounts = [
		{ name: "Основной счет", balance: 125000 },
		{ name: "Инвестиции", balance: 85000 },
		{ name: "Накопительный", balance: 45000 },
		{ name: "Кредитная карта", balance: -15000 },
	];

	// Расчет общего бюджета
	const totalBudget = accounts.reduce(
		(sum, account) => sum + account.balance,
		0
	);

	// Данные для графика общего бюджета
	const budgetData = {
		datasets: [
			{
				label: "Счета",
				data: accounts.map((acc) => acc.balance),
				// Для кредитов используем красный цвет
				backgroundColor: accounts.map((acc) =>
					acc.balance >= 0 ? "#4C84FF" : "#FF6384"
				),
			},
		],
		labels: accounts.map((acc) => acc.name),
	};

	return (
		<Content className={className}>
			<Content className="savings" inside={true}>
				<Chart
					type="line"
					{...savingsData}
					colors={["#4C84FF"]}
					darkMode={true}
				/>
			</Content>

			<Content className="incomes" title="Доходы" inside={true}>
				<Chart
					type="bar"
					{...incomeData}
					colors={["#94ffc9"]}
					darkMode={true}
				/>
			</Content>

			<Content className="categories" title="По категориям" inside={true}>
				<Chart
					type="pie"
					{...categoriesData}
					colors={[
						"#FF6384",
						"#FFA040",
						"#FFCE56",
						"#4C84FF",
						"#36A2EB",
					]}
					darkMode={true}
				/>
			</Content>

			<Content className="expenses" title="Расходы" inside={true}>
				<Chart
					type="bar"
					{...expenseData}
					colors={["#FF6384"]}
					darkMode={true}
				/>
			</Content>

			<Content className="growth" title="Индикатор роста" inside={true}>
				<Chart
					type="bar"
					{...growthData}
					colors={["#e3b0f8"]}
					darkMode={true}
					valueType="percent"
				/>
			</Content>

			<Content
				className="budget"
				title={`Общий бюджет: ${totalBudget.toLocaleString()} ₽`}
				inside={true}
			>
				<Chart
					type="bar"
					{...budgetData}
					colors={["#fccca1"]}
					darkMode={true}
					options={{
						indexAxis: "y", // Горизонтальные столбцы
						plugins: {
							legend: { display: false },
						},
					}}
				/>
			</Content>
		</Content>
	);
};

export const Dashboard = styled(DashboardContainer)`
	display: grid;
	grid-template:
		"savings savings savings savings savings savings" auto
		"incomes incomes incomes expenses expenses expenses" auto
		"categories categories growth growth budget budget" auto /
		1fr 1fr 1fr 1fr 1fr 1fr;
	gap: 20px;
	padding: 20px;
	min-height: calc(100vh - 100px);
	box-sizing: border-box;

	.savings,
	.incomes,
	.expenses,
	.categories,
	.growth,
	.budget {
		min-height: 280px;
	}

	.savings {
		grid-area: savings;
		background-color: #2a3f54;
	}

	.incomes {
		grid-area: incomes;
		background-color: #1e8449;
	}

	.expenses {
		grid-area: expenses;
		background-color: #b03a2e;
	}

	.categories {
		grid-area: categories;
		background-color: #2874a6;
	}

	.growth {
		grid-area: growth;
		background-color: #7d3c98;
	}

	.budget {
		grid-area: budget;
		background-color: #ca6f1e;
	}
`;
