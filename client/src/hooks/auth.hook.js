import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { authorize, LOGOUT } from "../redux/actions";
import { APP } from "../constants/app";

export const useAuth = () => {
	const [ready, setReady] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const dispatch = useDispatch();

	const login = useCallback((token, userId) => {
		dispatch(authorize({ token, userId }));

		localStorage.setItem(
			APP.USER_DATA_STORAGE,
			JSON.stringify({ token, userId })
		);
	}, []);

	const logout = useCallback(() => {
		dispatch(LOGOUT);

		localStorage.removeItem(APP.USER_DATA_STORAGE);
	}, []);

	const checkAuth = useCallback(() => {
		const data = JSON.parse(localStorage.getItem(APP.USER_DATA_STORAGE));

		if (data && data.token) {
			const decodedToken = jwtDecode(data.token);
			const isExpired = Date.now() >= decodedToken.exp * 1000;

			if (isExpired) {
				logout();
			} else {
				setIsAuthenticated(true);
			}
		}
	}, [logout]);

	useEffect(() => {
		checkAuth();
		const data = JSON.parse(localStorage.getItem(APP.USER_DATA_STORAGE));
		if (data) {
			login(data.token, data.userId);
		}
		setReady(true);
	}, [checkAuth, login]);

	return { login, logout, ready, isAuthenticated };
};
