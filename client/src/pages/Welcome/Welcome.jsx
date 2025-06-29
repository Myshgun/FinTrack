import { Link } from "react-router-dom";
import { Button } from "../../components";
import { Footer, Header } from "./components";

import styled from "styled-components";

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 200px 0 120px 0;
`;

const SECTION = styled.section`
	text-align: center;
	margin-top: 30px;
`;

const List = styled.ul`
	padding: 0 0 0 10px;
	text-align: left;
	list-style: none;
	li:not(:last-child) {
		margin-bottom: 15px;
	}
`;

export const Welcome = () => {
	return (
		<>
			<Header />
			<Content>
				<h1>Эффективное управление вашим бюджетом</h1>
				<p>
					FinTrack помогает вам контролировать доходы и расходы,
					планировать бюджет и достигать финансовых целей с легкостью.
				</p>
				<Link to="/register">
					<Button style="success">Начать бесплатно</Button>
				</Link>
				<SECTION>
					<h2>Почему выбирают FinTrack:</h2>
					<List>
						<li>
							📊 Удобный учет доходов и расходов для личных нужд
						</li>
						<li>📅 Легкое планирование и контроль бюджета</li>
						<li>
							📈 Подробная аналитика для принятия финансовых
							решений
						</li>
						<li>
							🔐 Высокий уровень безопасности и конфиденциальности
							данных
						</li>
						<li>
							🤝 Доступ с любого устройства — всегда под рукой
						</li>
					</List>
				</SECTION>
			</Content>
			<Footer />
		</>
	);
};
