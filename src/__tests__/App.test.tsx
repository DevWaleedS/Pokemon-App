import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "../App";

describe("App Component", () => {
	const renderAt = (path = "/") =>
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={[path]}>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
				</MemoryRouter>
			</Provider>
		);

	it("renders the header by default", () => {
		renderAt("/");
		expect(screen.getByText(/PokeReact/i)).toBeInTheDocument();
	});

	it("redirects unknown routes to /pokemon/1 and shows Details title initially", async () => {
		renderAt("/unknown");
		expect(screen.getByTestId("detail-title")).toHaveTextContent(/Details/i);
	});

	it("renders DetailsPage for /pokemon/:id", async () => {
		renderAt("/pokemon/1");
		expect(screen.getByTestId("detail-title")).toBeInTheDocument();
	});
});
