import { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "../../../../components";

const Copyright = styled.div`
	display: flex;
	align-items: center;
`;

const FooterContainer = ({ className }) => {
	const [date, setDate] = useState("");
	const [usdCurrency, setUsdCurrency] = useState(null);
	const [eurCurrency, setEurCurrency] = useState(null);

	useEffect(() => {
		fetch("https://www.cbr-xml-daily.ru/daily_json.js")
			.then((res) => res.json())
			.then(({ Date, Valute }) => {
				setDate(Date);
				setUsdCurrency(Valute.USD.Value);
				setEurCurrency(Valute.EUR.Value);
			});
	}, []);

	return (
		<footer className={className}>
			<div>
				<div>Финансовый трекер</div>
				<div>info@fintrack.ru</div>
			</div>
			<div>
				<Copyright>
					<Icon id="fa-copyright" size="16px" />
					&nbsp; 2025 Все права защищены
				</Copyright>
			</div>
			<div>
				<div>
					Курсы валют: <br />1 USD - {usdCurrency} руб. <br />1 EUR -{" "}
					{eurCurrency} руб.
				</div>
				<hr />
				<div>
					Последнее обновление:&nbsp;
					{new Date(date).toLocaleString("ru", {
						day: "numeric",
						month: "long",
						hour: "numeric",
						minute: "numeric",
					})}
				</div>
			</div>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 120px;
	padding: 20px 40px;
	font-weight: bold;
	background: #2a2d3e;
	box-shadow: 0 8px 17px #000;
`;
