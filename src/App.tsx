import { Routes, Route, Navigate } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailsPage from "./pages/DetailsPage";

export default function App() {
	return (
		<div className='container'>
			<ListPage />

			<Routes>
				<Route path='/pokemon/:id' element={<DetailsPage />} />
				<Route path='*' element={<Navigate to='/pokemon/1' replace />} />
			</Routes>
		</div>
	);
}
