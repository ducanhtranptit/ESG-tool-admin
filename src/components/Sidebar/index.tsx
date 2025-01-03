import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	FaChartBar,
	FaBuilding,
	FaChevronDown,
	FaUser,
	FaCogs,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const SideBar: React.FC = () => {
	const location = useLocation();
	const [showMenu, setShowMenu] = useState<{
		users: boolean;
		questions: boolean;
		companys: boolean;
		criteria: boolean;
	}>({
		users: false,
		questions: false,
		companys: false,
		criteria: false,
	});

	// Define the `menu` parameter type as keys of `showMenu`
	const toggleMenu = (menu: keyof typeof showMenu) => {
		setShowMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
	};

	return (
		<div className="side-bar">
			<div className="menu-section">
				<ul className="list-unstyled">
					<Link
						to="/"
						style={{ textDecoration: "none", color: "inherit" }}
					>
						<h1>Quản trị</h1>
					</Link>
					{/* Users Menu */}
					<li className="nav-item">
						<div
							className="nav-link d-flex justify-content-between align-items-center"
							onClick={() => toggleMenu("users")}
							style={{ cursor: "pointer" }}
						>
							<div>
								<FaUser className="me-2" />
								Users
							</div>
							<FaChevronDown
								className={`transition-transform ${
									showMenu.users ? "rotate-180" : ""
								}`}
							/>
						</div>
						{showMenu.users && (
							<ul className="submenu list-unstyled">
								<li
									className={
										location.pathname === "/accounts"
											? "active"
											: ""
									}
								>
									<Link
										to="/accounts"
										className="dropdown-item"
									>
										Accounts
									</Link>
								</li>
								<li
									className={
										location.pathname ===
										"/overall-company-info"
											? "active"
											: ""
									}
								>
									<Link
										to="/overall-company-info"
										className="dropdown-item"
									>
										Overall Company Info
									</Link>
								</li>
							</ul>
						)}
					</li>

					{/* Questions Menu */}
					<li className="nav-item">
						<div
							className="nav-link d-flex justify-content-between align-items-center"
							onClick={() => toggleMenu("questions")}
							style={{ cursor: "pointer" }}
						>
							<div>
								<FaChartBar className="me-2" />
								Questions
							</div>
							<FaChevronDown
								className={`transition-transform ${
									showMenu.questions ? "rotate-180" : ""
								}`}
							/>
						</div>
						{showMenu.questions && (
							<ul className="submenu list-unstyled">
								<li
									className={
										location.pathname === "/all-questions"
											? "active"
											: ""
									}
								>
									<Link
										to="/all-questions"
										className="dropdown-item"
									>
										All Questions
									</Link>
								</li>
								<li
									className={
										location.pathname === "/all-topics"
											? "active"
											: ""
									}
								>
									<Link
										to="/all-topics"
										className="dropdown-item"
									>
										All Topics
									</Link>
								</li>
								<li
									className={
										location.pathname === "/answers"
											? "active"
											: ""
									}
								>
									<Link
										to="/answers"
										className="dropdown-item"
									>
										Answers
									</Link>
								</li>
								<li
									className={
										location.pathname === "/dummies"
											? "active"
											: ""
									}
								>
									<Link
										to="/dummies"
										className="dropdown-item"
									>
										Dummies
									</Link>
								</li>
							</ul>
						)}
					</li>

					{/* Companys Menu */}
					<li className="nav-item">
						<div
							className="nav-link d-flex justify-content-between align-items-center"
							onClick={() => toggleMenu("companys")}
							style={{ cursor: "pointer" }}
						>
							<div>
								<FaBuilding className="me-2" />
								Companys
							</div>
							<FaChevronDown
								className={`transition-transform ${
									showMenu.companys ? "rotate-180" : ""
								}`}
							/>
						</div>
						{showMenu.companys && (
							<ul className="submenu list-unstyled">
								<li
									className={
										location.pathname === "/all-companies"
											? "active"
											: ""
									}
								>
									<Link
										to="/all-companies"
										className="dropdown-item"
									>
										All Companies
									</Link>
								</li>
								<li
									className={
										location.pathname === "/all-industries"
											? "active"
											: ""
									}
								>
									<Link
										to="/all-industries"
										className="dropdown-item"
									>
										All Industries
									</Link>
								</li>
								<li
									className={
										location.pathname === "/company-metrics"
											? "active"
											: ""
									}
								>
									<Link
										to="/company-metrics"
										className="dropdown-item"
									>
										Company Metrics
									</Link>
								</li>
								<li
									className={
										location.pathname === "/company-scores"
											? "active"
											: ""
									}
								>
									<Link
										to="/company-scores"
										className="dropdown-item"
									>
										Company Scores
									</Link>
								</li>
							</ul>
						)}
					</li>

					{/* Criteria Menu */}
					<li className="nav-item">
						<div
							className="nav-link d-flex justify-content-between align-items-center"
							onClick={() => toggleMenu("criteria")}
							style={{ cursor: "pointer" }}
						>
							<div>
								<FaCogs className="me-2" />
								Criteria
							</div>
							<FaChevronDown
								className={`transition-transform ${
									showMenu.criteria ? "rotate-180" : ""
								}`}
							/>
						</div>
						{showMenu.criteria && (
							<ul className="submenu list-unstyled">
								<li
									className={
										location.pathname === "/all-criteria"
											? "active"
											: ""
									}
								>
									<Link
										to="/all-criteria"
										className="dropdown-item"
									>
										All Criteria
									</Link>
								</li>
								<li
									className={
										location.pathname === "/all-items"
											? "active"
											: ""
									}
								>
									<Link
										to="/all-items"
										className="dropdown-item"
									>
										All Items
									</Link>
								</li>
								<li
									className={
										location.pathname === "/all-categories"
											? "active"
											: ""
									}
								>
									<Link
										to="/all-categories"
										className="dropdown-item"
									>
										All Categories
									</Link>
								</li>
								<li
									className={
										location.pathname === "/criteria-scores"
											? "active"
											: ""
									}
								>
									<Link
										to="/criteria-scores"
										className="dropdown-item"
									>
										Criteria Scores
									</Link>
								</li>
							</ul>
						)}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SideBar;
