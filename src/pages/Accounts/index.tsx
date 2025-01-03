import React, { useEffect, useState } from "react";
import { FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
import UserAPI from "../../api/user";
import { Spinner, Table, Button, Card, Form, Row, Col } from "react-bootstrap";
import EditUserInformation from "./EditUserInformation";
import "./styles.css";

interface Account {
	userId: any;
	username: string;
	company: string;
	status: string;
}

const AccountPage: React.FC = () => {
	const [allAccounts, setAllAccounts] = useState<Account[]>([]);
	const [accounts, setAccounts] = useState<Account[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [currentUsername, setCurrentUsername] = useState<string>("");
	const [currentCompanyCode, setCurrentCompanyCode] = useState<string>("");
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);

	// States for filters
	const [searchUsername, setSearchUsername] = useState<string>("");
	const [statusFilter, setStatusFilter] = useState<string>("");
	const [searchCompanyCode, setSearchCompanyCode] = useState<string>("");

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await UserAPI.getAllAccounts();
				setAllAccounts(response.data || []);
				setAccounts(response.data || []);
				setLoading(false);
			} catch (error) {
				setError("Không thể lấy dữ liệu từ API");
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleSearch = () => {
		const filtered = allAccounts.filter((account) => {
			const usernameMatch = account.username
				.toLowerCase()
				.includes(searchUsername.toLowerCase().trim());
			const statusMatch = statusFilter
				? account.status === statusFilter
				: true;
			const companyMatch = account.company
				.toLowerCase()
				.includes(searchCompanyCode.toLowerCase().trim());

			return usernameMatch && statusMatch && companyMatch;
		});
		setAccounts(filtered);
	};

	const handleAddNew = () => {
		console.log("Adding new user");
	};

	const handleEdit = (username: string, companyCode: string) => {
		setCurrentUsername(username);
		setCurrentCompanyCode(companyCode);
		setShowModal(true);
	};

	if (loading) {
		return (
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ height: "80vh" }}
			>
				<Spinner animation="border" role="status" variant="primary">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		);
	}

	if (error) return <p className="text-danger">{error}</p>;

	return (
		<div className="content-wrapper">
			<section className="content-header">
				<div className="container-fluid">
					<div className="row mb-2">
						<div className="col-sm-6">
							<h1>Account management</h1>
						</div>
					</div>
				</div>
			</section>
			<hr className="hr-line" />
			<div className="d-flex justify-content-end mb-3">
				<Button
					className="add-new-button"
					variant="primary"
					size="sm"
					onClick={handleAddNew}
				>
					Add New
				</Button>
			</div>

			<Card className="shadow-sm card-filter">
				<Card.Header
					className="d-flex justify-content-between align-items-center"
					onClick={() => setIsFilterOpen(!isFilterOpen)}
					style={{ cursor: "pointer" }}
				>
					<h4 className="mb-0">Filter</h4>
					{isFilterOpen ? (
						<FaChevronUp className="ms-2" />
					) : (
						<FaChevronDown className="ms-2" />
					)}
				</Card.Header>
				{isFilterOpen && (
					<Card.Body>
						<Row className="align-items-center row-spacing">
							<Col md={3} className="col-spacing">
								<Form.Group controlId="searchUsername">
									<Form.Label>Search by Username</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter username"
										value={searchUsername}
										onChange={(e) =>
											setSearchUsername(e.target.value)
										}
									/>
								</Form.Group>
							</Col>
							<Col md={2} className="col-spacing">
								<Form.Group controlId="filterStatus">
									<Form.Label>Status</Form.Label>
									<Form.Select
										value={statusFilter}
										onChange={(e) =>
											setStatusFilter(e.target.value)
										}
									>
										<option value="">ALL</option>
										<option value="Active">Active</option>
										<option value="Inactive">
											Inactive
										</option>
									</Form.Select>
								</Form.Group>
							</Col>
							<Col md={3} className="col-spacing">
								<Form.Group controlId="searchCompanyCode">
									<Form.Label>
										Search by Company Code
									</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter company code"
										value={searchCompanyCode}
										onChange={(e) =>
											setSearchCompanyCode(e.target.value)
										}
									/>
								</Form.Group>
							</Col>
							<Col
								md={4}
								className="d-flex justify-content-end col-spacing"
							>
								<Button
									variant="primary"
									className="mt-4"
									onClick={handleSearch}
								>
									Search
								</Button>
							</Col>
						</Row>
					</Card.Body>
				)}
			</Card>

			<Card className="mb-4 shadow-sm card-table">
				<Card.Body>
					<Table className="table table-bordered">
						<thead>
							<tr>
								<th>UserId</th>
								<th>Username</th>
								<th>Company Code</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{accounts.map((account, index) => (
								<tr key={index}>
									<td>{account.userId}</td>
									<td>{account.username}</td>
									<td>{account.company}</td>
									<td>{account.status}</td>
									<td>
										<Button
											variant="primary"
											size="sm"
											onClick={() =>
												handleEdit(
													account.username,
													account.company
												)
											}
										>
											<FaEdit /> Edit
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Card.Body>
			</Card>

			<EditUserInformation
				show={showModal}
				handleClose={() => setShowModal(false)}
				username={currentUsername}
				companyCode={currentCompanyCode}
			/>
		</div>
	);
};

export default AccountPage;
