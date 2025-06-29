import { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectUserSession } from "../redux/selectors";
import { server } from "../bff";

export const useServerRequest = () => {
	const session = useSelector(selectUserSession);

	return useCallback(
		(operation, ...params) => {
			const request = ["register", "authorize"].includes(operation)
				? params
				: [session, ...params];
			console.log(request);
			return server[operation](...request);
		},
		[session]
	);
};
