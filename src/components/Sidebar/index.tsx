import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChartBar, FaBuilding, FaChevronDown } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const SideBar: React.FC = () => {
	const location = useLocation();
	const [showQuestionMenu, setShowQuestionMenu] = useState(false);
	const [showCompanyMenu, setShowCompanyMenu] = useState(false);

	const toggleQuestionMenu = () => {
		setShowQuestionMenu(!showQuestionMenu);
	};

	const toggleCompanyMenu = () => {
		setShowCompanyMenu(!showCompanyMenu);
	};

	return (
		<div className="side-bar">
			<h1>Quản trị</h1>
			<div className="menu-section">
				<ul className="list-unstyled">
					{/* Questions Menu */}
					<li className="nav-item">
						<div
							className="nav-link d-flex justify-content-between align-items-center"
							onClick={toggleQuestionMenu}
							style={{ cursor: "pointer" }}
						>
							<div>
								<FaChartBar className="me-2" />
								Questions
							</div>
							<FaChevronDown
								className={`transition-transform ${
									showQuestionMenu ? "rotate-180" : ""
								}`}
							/>
						</div>
						{showQuestionMenu && (
							<ul className="submenu list-unstyled">
								<li
									className={
										location.pathname === "/environment"
											? "active"
											: ""
									}
								>
									<Link
										to="/environment"
										className="dropdown-item"
									>
										All questions
									</Link>
								</li>
							</ul>
						)}
					</li>

					{/* Company Infor Menu */}
					<li className="nav-item">
						<div
							className="nav-link d-flex justify-content-between align-items-center"
							onClick={toggleCompanyMenu}
							style={{ cursor: "pointer" }}
						>
							<div>
								<FaBuilding className="me-2" />
								Company Infor
							</div>
							<FaChevronDown
								className={`transition-transform ${
									showCompanyMenu ? "rotate-180" : ""
								}`}
								style={{
									marginLeft: "auto",
								}}
							/>
						</div>
						{showCompanyMenu && (
							<ul className="submenu list-unstyled">
								<li
									className={
										location.pathname === "/company-details"
											? "active"
											: ""
									}
								>
									<Link
										to="/company-details"
										className="dropdown-item"
									>
										Company Details
									</Link>
								</li>
								<li
									className={
										location.pathname === "/company-reports"
											? "active"
											: ""
									}
								>
									<Link
										to="/company-reports"
										className="dropdown-item"
									>
										Company Reports
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
