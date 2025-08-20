import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("App Component", () => {
	const renderWithProviders = () =>
		render(
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		);

	it("renders the header by default", () => {
		renderWithProviders();
		// نتأكد من الهيدر
		expect(screen.getByText(/PokeReact/i)).toBeInTheDocument();
	});

	it("navigates to DetailsPage when route matches", () => {
		window.history.pushState({}, "Details Page", "/details/1");
		renderWithProviders();
		// هنا عندنا testid جاهز
		expect(screen.getByTestId("detail-title")).toHaveTextContent(/Details/i);
	});
});
