import { Content } from "../../components";
import {
	Budget,
	Categories,
	Expenses,
	Growth,
	Incomes,
	Savings,
} from "./components";

import styled from "styled-components";

const DashboardContainer = ({ className }) => {
	return (
		<Content className={className}>
			<Savings className="savings" />
			<Incomes className="incomes" />
			<Expenses className="expenses" />
			<Categories className="categories" />
			<Growth className="growth" />
			<Budget className="budget" />
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
	background: none;

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
