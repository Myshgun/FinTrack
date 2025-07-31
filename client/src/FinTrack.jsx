import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	Accounts,
	Authorization,
	Dashboard,
	ErrorPage,
	Operations,
	Panel,
	Profile,
	Registration,
	Welcome,
} from "./pages";
import { Alert, Loader, Navbar } from "./components";
import { useAuth, useHttp } from "./hooks";
import {
	loadAccountsAsync,
	loadAccountTypesAsync,
	loadOperationCategoriesAsync,
	loadOperationsAsync,
	setUserAsync,
} from "./redux/actions";
import {
	selectAlertMessage,
	selectAuthIsAuth,
	selectIsAlertVisible,
	selectIsAuthChecked,
	selectIsLoading,
	selectUserRole,
} from "./redux/selectors";
import { ROLE } from "./constants";

import styled from "styled-components";
import { setIsLoading } from "./redux/actions/app/set-is-loading";
import { useState } from "react";

const AuthZoneApp = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	margin: 0 auto;
	background-color: #20222f;
	color: white;
	overflow: hidden;
`;

const MainApp = styled.div`
	margin-top: 70px;
	height: calc(100vh - 70px);
	overflow-y: auto;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const AuthLayout = () => {
	const isAlertVisible = useSelector(selectIsAlertVisible);
	const alertMessage = useSelector(selectAlertMessage);
	const isLoading = useSelector(selectIsLoading);

	const { request } = useHttp();
	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		dispatch(setUserAsync(request));
		dispatch(loadAccountsAsync(request));
		dispatch(loadAccountTypesAsync(request));
		dispatch(loadOperationCategoriesAsync(request));
		setIsLoading(false);
	}, [dispatch, request]);

	if (isLoading) {
		return (
			<AuthZoneApp>
				<Loader />
			</AuthZoneApp>
		);
	}

	return (
		<AuthZoneApp>
			<Navbar />
			{!isLoading && (
				<MainApp>
					<Outlet />
				</MainApp>
			)}
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
	const isAuthChecked = useSelector(selectIsAuthChecked);
	const role = useSelector(selectUserRole);

	const { checkAuth } = useAuth();

	useEffect(() => {
		if (!isAuthChecked) {
			checkAuth();
		}
	}, [isAuthChecked, checkAuth]);

	if (!isAuthChecked) {
		return (
			<NonAuthZoneApp>
				<Loader />
			</NonAuthZoneApp>
		);
	}

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

					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</NonAuthZoneApp>
		</>
	);
};
