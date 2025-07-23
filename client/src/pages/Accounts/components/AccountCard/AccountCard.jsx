import { Icon } from "../../../../components";
import { useDispatch } from "react-redux";
import { useHttp } from "../../../../hooks";
import {
	removeAccountAsync,
	setAlertMessage,
	SHOW_ALERT_MESSAGE,
} from "../../../../redux/actions";

import styled from "styled-components";

const AccountCardContainer = ({ className, account }) => {
	const dispatch = useDispatch();
	const { request } = useHttp();

	const onDelete = (id) => {
		dispatch(removeAccountAsync(request, id)).then((message) => {
			dispatch(setAlertMessage(message));
			dispatch(SHOW_ALERT_MESSAGE);
		});
	};

	const formattedBalance = new Intl.NumberFormat("ru-RU", {
		style: "currency",
		currency: "RUB",
		minimumFractionDigits: 2,
	}).format(account.balance || 0);

	return (
		<div className={className}>
			<div className="account-content">
				<h2>{account.name}</h2>
				<p className="account-type">{account.type.description}</p>
				<p className="account-balance">{formattedBalance}</p>
			</div>
			<button className="delete-btn" onClick={() => onDelete(account.id)}>
				<Icon id="fa-trash-o" size="23px" inactive={false} />
			</button>
		</div>
	);
};

export const AccountCard = styled(AccountCardContainer)`
	display: flex;
	flex-direction: column;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	padding: 16px 20px;
	width: 230px;
	margin: 10px;
	cursor: pointer;
	transition: box-shadow 0.3s ease, transform 0.2s ease;
	position: relative;

	.account-content {
		flex: 1;
		min-width: 0;
		padding-right: 30px;
	}

	h2 {
		margin: 0 0 8px 0;
		font-size: 1.25rem;
		color: #333;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
	}

	.account-type {
		margin: 0 0 8px 0;
		color: #666;
		font-size: 0.9rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.account-balance {
		margin: auto 0 0 0;
		color: #2c3e50;
		font-size: 1.3rem;
		font-weight: 700;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		color: ${({ account }) =>
			account.balance >= 0 ? "#27ae60" : "#e74c3c"};
	}

	p {
		margin: 0;
		color: #666;
		font-size: 1rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.delete-btn {
		position: absolute;
		top: 12px;
		right: 12px;
		background: transparent;
		border: none;
		color: #c0392b;
		font-size: 1.1rem;
		cursor: pointer;
		padding: 4px;
		transition: color 0.3s ease;

		&:hover,
		&:focus {
			color: #e74c3c;
			outline: none;
		}
	}

	&:hover {
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
		transform: translateY(-4px);
	}
`;
