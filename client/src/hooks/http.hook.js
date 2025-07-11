import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthIsAuth, selectAuthToken } from "../redux/selectors";

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const isAuthenticated = useSelector(selectAuthIsAuth);
	const token = useSelector(selectAuthToken);

	const request = useCallback(
		async (url, method = "GET", body = null, headers = {}) => {
			setLoading(true);
			try {
				if (body) {
					body = JSON.stringify(body);
					headers["Content-Type"] = "application/json";
				}

				if (isAuthenticated) {
					headers["Authorization"] = `Bearer ${token}`;
				}

				const response = await fetch(
					import.meta.env.VITE_APP_API_URL + url,
					{ method, body, headers }
				);
				const data = await response.json();

				if (!response.ok) {
					throw data.message || "Что-то пошло не так";
				}

				setLoading(false);

				return data;
			} catch (e) {
				setError(e.message);
				throw e;
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	const clearError = useCallback(() => setError(null), []);

	return { loading, request, error, clearError };
};
