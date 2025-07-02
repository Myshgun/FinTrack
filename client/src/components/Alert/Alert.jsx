import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes, css } from "styled-components";
import { HIDE_ALERT_MESSAGE } from "../../redux/actions";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const AlertWrapper = styled.div`
	position: fixed;
	top: 20px;
	right: 20px;
	min-width: 250px;
	max-width: 350px;
	padding: 15px 20px;
	border-radius: 4px;
	background-color: ${({ type }) => {
		switch (type) {
			case "success":
				return "#d4edda";
			case "danger":
				return "#f8d7da";
			case "warning":
				return "#fff3cd";
			case "info":
			default:
				return "#d1ecf1";
		}
	}};
	color: ${({ type }) => {
		switch (type) {
			case "success":
				return "#155724";
			case "danger":
				return "#721c24";
			case "warning":
				return "#856404";
			case "info":
			default:
				return "#0c5460";
		}
	}};
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column;
	animation: ${slideIn} 0.3s ease forwards;
	z-index: 9999;
`;

const ProgressBar = styled.div`
	height: 4px;
	background-color: ${({ type }) => {
		switch (type) {
			case "success":
				return "#28a745";
			case "danger":
				return "#dc3545";
			case "warning":
				return "#ffc107";
			case "info":
			default:
				return "#17a2b8";
		}
	}};
	margin-top: 10px;
	border-radius: 2px;

	animation: ${({ $duration }) => css`
    progressShrink ${$duration}ms linear forwards
  `};

	@keyframes progressShrink {
		from {
			width: 100%;
		}
		to {
			width: 0%;
		}
	}
`;

export const Alert = ({ type = "info", duration = 3000, children }) => {
	const [visible, setVisible] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		if (duration <= 0) return;

		const timer = setTimeout(() => {
			setVisible(false);
			dispatch(HIDE_ALERT_MESSAGE);
		}, duration);

		return () => clearTimeout(timer);
	}, [dispatch, duration]);

	if (!visible) return null;

	return (
		<AlertWrapper
			type={type}
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
		>
			{children}
			{duration > 0 && <ProgressBar type={type} $duration={duration} />}
		</AlertWrapper>
	);
};
