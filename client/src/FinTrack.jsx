import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Authorization, Profile, Registration, Welcome } from "./pages";
import { Navbar } from "./components";
import { useHttp } from "./hooks";
import { setUserAsync } from "./redux/actions";
import { selectAuthIsAuth, selectUserRole } from "./redux/selectors";
import { APP, ROLE } from "./constants";

import styled from "styled-components";
import { useEffect } from "react";

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
	const isAuthenticated = useSelector(selectAuthIsAuth);

	if (!isAuthenticated) {
		return <Navigate to="/" />;
	}

	return (
		<AuthZoneApp>
			<Navbar />
			<MainApp>
				<Outlet />
			</MainApp>
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
	const { request } = useHttp();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setUserAsync(request));
	}, [dispatch, request]);

	return (
		<>
			<NonAuthZoneApp>
				<Routes>
					<Route path="/" element={<Welcome />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />

					<Route element={<AuthLayout />}>
						<Route path="/dashboard" element={<div>Дашборд</div>} />
						<Route
							path="/operations"
							element={<div>Операции</div>}
						/>
						<Route path="/accounts" element={<div>Счета</div>} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/profile/edit" element={<Profile />} />
					</Route>

					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</NonAuthZoneApp>
		</>
	);
};
