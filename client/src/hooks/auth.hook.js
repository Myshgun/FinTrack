import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useState } from "react";

const STORAGE_NAME = "userData";

export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [ready, setReady] = useState(false);
	const [userId, setUserId] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = useCallback((jwtToken, id) => {
		setToken(jwtToken);
		setUserId(id);
		setIsAuthenticated(true);

		localStorage.setItem(
			STORAGE_NAME,
			JSON.stringify({ userId: id, token: jwtToken })
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		setIsAuthenticated(false);

		localStorage.removeItem(STORAGE_NAME);
	}, []);

	const checkAuth = useCallback(() => {
		const data = JSON.parse(localStorage.getItem(STORAGE_NAME));

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
		const data = JSON.parse(localStorage.getItem(STORAGE_NAME));
		if (data) {
			login(data.token, data.userId);
		}
		setReady(true);
	}, [checkAuth, login]);

	return { login, logout, token, userId, ready, isAuthenticated };
};
