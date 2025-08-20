import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { authorize, SET_AUTH_CHECKED } from "../redux/actions";

import { useHttp } from "./http.hook";

export const useAuth = () => {
	const dispatch = useDispatch();
	const { request } = useHttp();

	const login = useCallback(
		(userId) => {
			dispatch(authorize(userId));
		},
		[dispatch]
	);

	const checkAuth = useCallback(async () => {
		try {
			const data = await request("/auth/check", "GET");

			if (data.userId) {
				login(data.userId);
			}
		} catch (error) {
			dispatch(SET_AUTH_CHECKED);
		}
	}, [login, request, dispatch]);

	return { checkAuth };
};
