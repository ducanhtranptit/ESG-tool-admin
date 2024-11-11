import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dashboard from "./pages/DashBoard"; 
import Login from "./pages/Auth/login";
import PrivateRoute from "./routers/PrivateRouter";
import DefaultLayout from "./layouts/DefaultLayout";
import AuthLayout from "./layouts/AuthLayout";

// Import các trang theo menu của bạn
import Accounts from "./pages/Accounts";
import OverallCompanyInfor from "./pages/OverallCompanyInfor";
import AllQuestions from "./pages/AllQuestions";
import AllTopics from "./pages/AllTopics";
import Answers from "./pages/Answers";
import Dummies from "./pages/Dummies";
import UserSections from "./pages/UserSections";
import AllCompanies from "./pages/AllCompanies";
import AllIndustries from "./pages/AllIndustries";
import CompanyMetrics from "./pages/CompanyMetrics";
import CompanyScores from "./pages/CompanyScores";
import AllCriteria from "./pages/AllCriterias";
import AllItems from "./pages/AllItems";
import AllCategories from "./pages/AllCategories";
import CriteriaScores from "./pages/CriteriaScores";

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

					{/* Routes cho Users */}
					<Route path="/accounts" element={<Accounts />} />
					<Route
						path="/overall-company-info"
						element={<OverallCompanyInfor />}
					/>

					{/* Routes cho Questions */}
					<Route path="/all-questions" element={<AllQuestions />} />
					<Route path="/all-topics" element={<AllTopics />} />
					<Route path="/answers" element={<Answers />} />
					<Route path="/dummies" element={<Dummies />} />
					<Route path="/user-sections" element={<UserSections />} />

					{/* Routes cho Companys */}
					<Route path="/all-companies" element={<AllCompanies />} />
					<Route path="/all-industries" element={<AllIndustries />} />
					<Route
						path="/company-metrics"
						element={<CompanyMetrics />}
					/>
					<Route path="/company-scores" element={<CompanyScores />} />

					{/* Routes cho Criteria */}
					<Route path="/all-criteria" element={<AllCriteria />} />
					<Route path="/all-items" element={<AllItems />} />
					<Route path="/all-categories" element={<AllCategories />} />
					<Route
						path="/criteria-scores"
						element={<CriteriaScores />}
					/>
				</Route>

				{/* Route cho trang đăng nhập */}
				<Route path="/login" element={<AuthLayout />}>
					<Route index element={<Login />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
