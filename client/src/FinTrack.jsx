import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	Accounts,
	Authorization,
	Dashboard,
	Operations,
	Panel,
	Profile,
	Registration,
	Welcome,
} from "./pages";
import { Alert, Navbar } from "./components";
import { useHttp } from "./hooks";
import { loadAccountsAsync, setUserAsync } from "./redux/actions";
import {
	selectAlertMessage,
	selectAuthIsAuth,
	selectIsAlertVisible,
	selectUserRole,
} from "./redux/selectors";
import { ROLE } from "./constants";

import styled from "styled-components";

const AuthZoneApp = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	margin: 0 auto;
	background-color: #20222f;
	color: white;
`;

const MainApp = styled.div`
	margin-top: 70px;
	height: calc(100vh - 70px);
`;

const AuthLayout = () => {
	const isAlertVisible = useSelector(selectIsAlertVisible);
	const alertMessage = useSelector(selectAlertMessage);

	const { request } = useHttp();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setUserAsync(request));
		dispatch(loadAccountsAsync(request));
	}, [dispatch, request]);

	return (
		<AuthZoneApp>
			<Navbar />
			<MainApp>
				<Outlet />
			</MainApp>
			{isAlertVisible && (
				<Alert type="success" duration={2000}>
					{alertMessage}
				</Alert>
			)}
		</AuthZoneApp>
	);
};

const NonAuthZoneApp = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	margin: 0 auto;
	background-color: #20222f;
	color: white;
`;

export const FinTrack = () => {
	const isAuthenticated = useSelector(selectAuthIsAuth);
	const role = useSelector(selectUserRole);

	return (
		<>
			<NonAuthZoneApp>
				<Routes>
					<Route path="/" element={<Welcome />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />

					<Route
						element={
							isAuthenticated ? (
								<AuthLayout />
							) : (
								<Navigate to="/" />
							)
						}
					>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/operations" element={<Operations />} />
						<Route path="/accounts" element={<Accounts />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/profile/edit" element={<Profile />} />
						<Route
							path="/panel"
							element={
								role === ROLE.ADMIN ? <Panel /> : <Dashboard />
							}
						/>
					</Route>

					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</NonAuthZoneApp>
		</>
	);
};
