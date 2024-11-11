import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dashboard from "./pages/Dashboard/index";
import Login from "./pages/Auth/login";
import PrivateRoute from "./routers/PrivateRouter";
import DefaultLayout from "./layouts/DefaultLayout";
import AuthLayout from "./layouts/AuthLayout";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoute>
							<DefaultLayout />
						</PrivateRoute>
					}
				>
					<Route index element={<Dashboard />} />
				</Route>
				<Route path="/login" element={<AuthLayout />}>
					<Route index element={<Login />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
