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
	console.log(account);

	return (
		<div className={className}>
			<h2>{account.name}</h2>
			<p>{account.type}</p>
			<button className="delete-btn" onClick={() => onDelete(account.id)}>
				<Icon id="fa-trash-o" size="23px" inactive={false} />
			</button>
		</div>
	);
};

export const AccountCard = styled(AccountCardContainer)`
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	padding: 16px 20px;
	max-width: 320px;
	margin: 10px;
	cursor: pointer;
	transition: box-shadow 0.3s ease, transform 0.2s ease;
	position: relative;

	h2 {
		margin: 0 0 8px 0;
		font-size: 1.25rem;
		color: #333;
	}

	p {
		margin: 0;
		color: #666;
		font-size: 1rem;
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
