// src/__tests__/main.test.tsx
import { render } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";

const persistor = persistStore(store);

describe("Main entry point", () => {
	it("renders without crashing", () => {
		render(
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</PersistGate>
			</Provider>
		);
	});
});
