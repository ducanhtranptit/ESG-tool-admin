import React, { useEffect, useState } from "react";
import { FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
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
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);

	// States for search filters
	const [searchUserId, setSearchUserId] = useState<string>("");
	const [searchCompanyName, setSearchCompanyName] = useState<string>("");

	const [data, setData] = useState<InforData[]>([]);
	const [filteredData, setFilteredData] = useState<InforData[]>([]);

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const response = await UserAPI.getAllOverallInfors();
				setData(response.data || []);
				setFilteredData(response.data || []);
				setLoading(false);
			} catch (error) {
				console.error("Lỗi khi lấy dữ liệu:", error);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const handleSearch = () => {
		const filtered = data.filter((item) => {
			const userIdMatch = searchUserId
				? item.overallInfor.userId
						.toString()
						.includes(searchUserId.trim())
				: true;
			const companyNameMatch = searchCompanyName
				? item.overallInfor.companyName
						.toLowerCase()
						.includes(searchCompanyName.toLowerCase().trim())
				: true;

			return userIdMatch && companyNameMatch;
		});
		setFilteredData(filtered);
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
						<div>
							<h1>Overall company information management</h1>
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
								<Form.Group controlId="searchUserId">
									<Form.Label>Search by User ID</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter User ID"
										value={searchUserId}
										onChange={(e) =>
											setSearchUserId(e.target.value)
										}
									/>
								</Form.Group>
							</Col>
							<Col md={4} className="col-spacing">
								<Form.Group controlId="searchCompanyName">
									<Form.Label>
										Search by Company Name
									</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Company Name"
										value={searchCompanyName}
										onChange={(e) =>
											setSearchCompanyName(e.target.value)
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
								{filteredData.map((item, index) => (
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
												<FaEdit /> Edit
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
