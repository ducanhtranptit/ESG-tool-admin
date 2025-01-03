import React, { useEffect, useState } from "react";
import { FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
import CompanyAPI from "../../api/company";
import {
	Spinner,
	Table,
	Button,
	Card,
	Form,
	Row,
	Col,
	Pagination,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "./styles.css";

interface Data {
	companyCode?: string;
	companyName?: string;
	industryId?: string;
	industryCodeLevel2?: string;
}

const AllCompanyPage: React.FC = () => {
	const [companies, setCompanies] = useState<Data[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);

	// Trạng thái cho các trường nhập liệu
	const [searchCompanyCodeInput, setSearchCompanyCodeInput] =
		useState<string>("");
	const [searchCompanyNameInput, setSearchCompanyNameInput] =
		useState<string>("");
	const [searchIndustryCodeLevel2Input, setSearchIndustryCodeLevel2Input] =
		useState<string>("");

	// Trạng thái cho các tiêu chí tìm kiếm thực tế
	const [searchCompanyCode, setSearchCompanyCode] = useState<string>("");
	const [searchCompanyName, setSearchCompanyName] = useState<string>("");
	const [searchIndustryCodeLevel2, setSearchIndustryCodeLevel2] =
		useState<string>("");

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [totalPages, setTotalPages] = useState<number>(1);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await CompanyAPI.getAllCompany(
					currentPage,
					itemsPerPage,
					searchCompanyCode,
					searchCompanyName,
					searchIndustryCodeLevel2
				);
				console.log("response: ", response);
				setCompanies(response.data.data || []);
				setTotalPages(response.data.totalPages || 1);
				setLoading(false);
			} catch (error) {
				console.log(error);
				toast.error("Không thể lấy dữ liệu từ API");
				setLoading(false);
			}
		};

		fetchData();
	}, [
		currentPage,
		itemsPerPage,
		searchCompanyCode,
		searchCompanyName,
		searchIndustryCodeLevel2,
	]);

	const handleSearch = () => {
		setCurrentPage(1);
		setSearchCompanyCode(searchCompanyCodeInput.trim());
		setSearchCompanyName(searchCompanyNameInput.trim());
		setSearchIndustryCodeLevel2(searchIndustryCodeLevel2Input.trim());
	};

	const handleItemsPerPageChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setItemsPerPage(Number(event.target.value));
		setCurrentPage(1);
	};

	const renderPaginationItems = () => {
		const items = [];

		if (currentPage > 3) {
			items.push(
				<Pagination.Item key={1} onClick={() => setCurrentPage(1)}>
					1
				</Pagination.Item>
			);
			if (currentPage > 4) {
				items.push(<Pagination.Ellipsis key="start-ellipsis" />);
			}
		}

		for (
			let i = Math.max(1, currentPage - 2);
			i <= Math.min(totalPages, currentPage + 2);
			i++
		) {
			items.push(
				<Pagination.Item
					key={i}
					active={i === currentPage}
					onClick={() => setCurrentPage(i)}
				>
					{i}
				</Pagination.Item>
			);
		}

		if (currentPage < totalPages - 2) {
			if (currentPage < totalPages - 3) {
				items.push(<Pagination.Ellipsis key="end-ellipsis" />);
			}
			items.push(
				<Pagination.Item
					key={totalPages}
					onClick={() => setCurrentPage(totalPages)}
				>
					{totalPages}
				</Pagination.Item>
			);
		}

		return items;
	};

	const handleEdit = () => {
		console.log("Editing item");
	};

	const handleAddNew = () => {
		console.log("Adding new company");
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
			<ToastContainer />
			<section className="content-header">
				<div className="container-fluid">
					<div className="row mb-2">
						<div className="col-sm-6">
							<h1>Companies Management</h1>
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
								<Form.Group controlId="searchCompanyCode">
									<Form.Label>Company Code</Form.Label>
									<Form.Control
										type="text"
										placeholder="By Company Code"
										value={searchCompanyCodeInput}
										onChange={(e) =>
											setSearchCompanyCodeInput(
												e.target.value
											)
										}
									/>
								</Form.Group>
							</Col>
							<Col md={3} className="col-spacing">
								<Form.Group controlId="searchCompanyName">
									<Form.Label>Company Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="By Company Name"
										value={searchCompanyNameInput}
										onChange={(e) =>
											setSearchCompanyNameInput(
												e.target.value
											)
										}
									/>
								</Form.Group>
							</Col>
							<Col md={3} className="col-spacing">
								<Form.Group controlId="searchIndustryCodeLevel2">
									<Form.Label>
										Industry Code Level 2
									</Form.Label>
									<Form.Control
										type="text"
										placeholder="By Industry Code Level 2"
										value={searchIndustryCodeLevel2Input}
										onChange={(e) =>
											setSearchIndustryCodeLevel2Input(
												e.target.value
											)
										}
									/>
								</Form.Group>
							</Col>
							<Col
								md={11}
								className="d-flex justify-content-end col-spacing"
							>
								<Button
									variant="primary"
									className="mt-2"
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
								<th>Company Code</th>
								<th>Company Name</th>
								<th>Industry ID</th>
								<th>Industry Code Level 2</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{companies.map((data, index) => (
								<tr key={index}>
									<td>{data.companyCode}</td>
									<td>{data.companyName}</td>
									<td>{data.industryId}</td>
									<td>{data.industryCodeLevel2}</td>
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
				</Card.Body>

				<div className="pagination-container">
					<Pagination className="mb-0">
						<Pagination.Prev
							onClick={() =>
								setCurrentPage((prev) => Math.max(prev - 1, 1))
							}
							disabled={currentPage === 1}
						/>
						{renderPaginationItems()}
						<Pagination.Next
							onClick={() =>
								setCurrentPage((prev) =>
									Math.min(prev + 1, totalPages)
								)
							}
							disabled={currentPage === totalPages}
						/>
					</Pagination>

					<Form.Select
						value={itemsPerPage}
						onChange={handleItemsPerPageChange}
						className="ms-3 items-per-page-select"
						style={{ width: "130px" }}
					>
						<option value={10}>10 / page</option>
						<option value={20}>20 / page</option>
						<option value={50}>50 / page</option>
						<option value={100}>100 / page</option>
					</Form.Select>
				</div>
			</Card>
		</div>
	);
};

export default AllCompanyPage;
