import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import UserAPI from "../../api/user";
import { Spinner, Table, Button, Card, Form, Row, Col } from "react-bootstrap";
import "./styles.css";

interface OverallInfor {
	userId: number;
	companyName: string;
	dateFounder: string;
	mainAddress: string;
	mainPhoneNumber: string;
	companyWebsite: string;
	companySector: string;
	companyDescription: string;
	contactInformation: string;
}

interface SiteInfor {
	id: number;
	siteName: string;
	numberEmployees: number;
	comment: string;
}

interface ProductInfor {
	id: number;
	productName: string;
	revenue: number;
	comment: string;
}

interface InforData {
	overallInfor: OverallInfor;
	siteInfors: SiteInfor[];
	productInfors: ProductInfor[];
}

const AccountPage: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [currentCompanyCode, setCurrentCompanyCode] = useState<string>("");
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);
	const [searchUsername, setSearchUsername] = useState<string>("");
	const [statusFilter, setStatusFilter] = useState<string>("");

	const [data, setData] = useState<InforData[]>([]);

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const response = await UserAPI.getAllOverallInfors();
				setData(response.data || []);
				setLoading(false);
			} catch (error) {
				console.error("Lỗi khi lấy dữ liệu:", error);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const handleSearch = () => {
		console.log(`Searching for username: ${searchUsername}`);
		console.log(`Filtering by status: ${statusFilter}`);
	};

	const handleAddNew = () => {
		console.log("Adding new user");
	};
	const handleEdit = () => {
		console.log("Editing user");
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
							<h1>Danh sách tài khoản</h1>
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
										<option value="Active">ACTIVE</option>
										<option value="Inactive">
											INACTIVE
										</option>
									</Form.Select>
								</Form.Group>
							</Col>
							<Col md={3} className="col-spacing">
								<Form.Group controlId="searchUsername">
									<Form.Label>Search</Form.Label>
									<Form.Control
										type="text"
										placeholder="By name, username, email"
										value={searchUsername}
										onChange={(e) =>
											setSearchUsername(e.target.value)
										}
									/>
								</Form.Group>
							</Col>
							<Col
								md={5}
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
					<div className="table-ovrall-info table-wrapper">
						<Table className="table table-bordered">
							<thead className="table">
								<tr>
									<th>User ID</th>
									<th>Company Name</th>
									<th>Date Founded</th>
									<th>Main Address</th>
									<th>Main Phone Number</th>
									<th>Company Website</th>
									<th>Company Sector</th>
									<th>Company Description</th>
									<th>Contact Information</th>
									<th className="wide-column">Site Infors</th>
									<th className="wide-column">
										Product Infors
									</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item, index) => (
									<tr key={index}>
										<td>{item.overallInfor.userId}</td>
										<td>{item.overallInfor.companyName}</td>
										<td>{item.overallInfor.dateFounder}</td>
										<td>{item.overallInfor.mainAddress}</td>
										<td>
											{item.overallInfor.mainPhoneNumber}
										</td>
										<td>
											<a
												href={
													item.overallInfor
														.companyWebsite
												}
												target="_blank"
												rel="noopener noreferrer"
											>
												{
													item.overallInfor
														.companyWebsite
												}
											</a>
										</td>
										<td>
											{item.overallInfor.companySector}
										</td>
										<td>
											{
												item.overallInfor
													.companyDescription
											}
										</td>
										<td
											dangerouslySetInnerHTML={{
												__html: item.overallInfor
													.contactInformation,
											}}
										/>

										{/* Cột Site Infors */}
										<td className="position-relative wide-column">
											<div className="table-site-info">
												<Table className="table table-bordered">
													<thead>
														<tr>
															<th>Site ID</th>
															<th>Site Name</th>
															<th>Employees</th>
															<th>Comment</th>
														</tr>
													</thead>
													<tbody>
														{item.siteInfors.map(
															(site) => (
																<tr
																	key={
																		site.id
																	}
																>
																	<td>
																		{
																			site.id
																		}
																	</td>
																	<td>
																		{
																			site.siteName
																		}
																	</td>
																	<td>
																		{
																			site.numberEmployees
																		}
																	</td>
																	<td>
																		{
																			site.comment
																		}
																	</td>
																</tr>
															)
														)}
													</tbody>
												</Table>
											</div>
										</td>

										{/* Cột Product Infors */}
										<td className="position-relative wide-column">
											<div className="table-product-info">
												<Table className="table table-bordered">
													<thead>
														<tr>
															<th>Product ID</th>
															<th>
																Product Name
															</th>
															<th>Revenue</th>
															<th>Comment</th>
														</tr>
													</thead>
													<tbody>
														{item.productInfors.map(
															(product) => (
																<tr
																	key={
																		product.id
																	}
																>
																	<td>
																		{
																			product.id
																		}
																	</td>
																	<td>
																		{
																			product.productName
																		}
																	</td>
																	<td>
																		{
																			product.revenue
																		}
																	</td>
																	<td>
																		{
																			product.comment
																		}
																	</td>
																</tr>
															)
														)}
													</tbody>
												</Table>
											</div>
										</td>
										<td>
											<Button
												variant="primary"
												size="sm"
												onClick={() => handleEdit()}
											>
												<FaEdit /> Sửa
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
};

export default AccountPage;
