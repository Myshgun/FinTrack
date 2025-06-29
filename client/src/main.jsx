import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import { FinTrack } from "./FinTrack";

import "./index.css";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Provider store={store}>
			<FinTrack />
		</Provider>
	</BrowserRouter>
);
