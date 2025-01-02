import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
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
import QuestionAPI from "../../api/question";
import { toast, ToastContainer } from "react-toastify";
import "./styles.css";

interface Data {
	questionCode?: string;
	questionName?: string;
	companyCode?: string;
	year?: number;
	answer?: string;
}

const AllAnswersPage: React.FC = () => {
	const [accounts, setAccounts] = useState<Data[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [loading, setLoading] = useState<boolean>(true);
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);
	const [searchInput, setSearchInput] = useState<string>(""); 
	const [searchYearInput, setSearchYearInput] = useState<string>(""); 
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [searchYear, setSearchYear] = useState<string>(""); 
	const [totalPages, setTotalPages] = useState<number>(1);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await QuestionAPI.getAllAnswers(
					currentPage,
					itemsPerPage,
					searchQuery,
					searchYear 
				);
				setAccounts(response.data.data || []);
				setTotalPages(response.data.totalPages || 1);
				setLoading(false);
			} catch (err) {
				console.log(err);
				toast.error("Không thể lấy dữ liệu từ API");
				setLoading(false);
			}
		};

		fetchData();
	}, [currentPage, itemsPerPage, searchQuery, searchYear]); 

	const handleSearch = () => {
		setSearchQuery(searchInput); 
		setSearchYear(searchYearInput); 
		setCurrentPage(1); 
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


	return (
		<div className="content-wrapper">
			<ToastContainer />
			<section className="content-header">
				<div className="container-fluid">
					<div className="row mb-2">
						<div className="col-sm-6">
							<h1>Answer Management</h1>
						</div>
					</div>
				</div>
			</section>

			<Card className="shadow-sm card-filter mb-4">
				<Card.Header
					className="d-flex justify-content-between align-items-center"
					onClick={() => setIsFilterOpen(!isFilterOpen)}
					style={{ cursor: "pointer" }}
				>
					<h4 className="mb-0">Filter</h4>
					{isFilterOpen ? <FaChevronUp /> : <FaChevronDown />}
				</Card.Header>
				{isFilterOpen && (
					<Card.Body>
						<Row className="align-items-center row-spacing">
							<Col md={4} className="col-spacing">
								<Form.Group controlId="searchQuery">
									<Form.Label>
										Search by Company Code
									</Form.Label>
									<Form.Control
										type="search"
										placeholder="Enter company code"
										value={searchInput}
										onChange={(e) =>
											setSearchInput(e.target.value)
										}
									/>
								</Form.Group>
							</Col>
							<Col md={4} className="col-spacing">
								<Form.Group controlId="searchYear">
									<Form.Label>Search by Year</Form.Label>
									<Form.Control
										type="search"
										placeholder="Enter year"
										value={searchYearInput}
										onChange={(e) =>
											setSearchYearInput(e.target.value)
										}
									/>
								</Form.Group>
							</Col>
							<Col
								md={2}
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

			<Card className="mb-4 shadow-sm">
				<Card.Body>
					<div className="table-wrapper">
						<Table className="table table-bordered">
							<thead>
								<tr>
									<th>Question Code</th>
									<th>Question Name</th>
									<th>Company Code</th>
									<th>Year</th>
									<th>Answer</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{accounts.map((data, index) => (
									<tr key={index}>
										<td>{data.questionCode}</td>
										<td>{data.questionName}</td>
										<td>{data.companyCode}</td>
										<td>{data.year}</td>
										<td>{data.answer}</td>
										<td>
											<Button
												variant="primary"
												size="sm"
												onClick={() =>
													console.log("Edit")
												}
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

export default AllAnswersPage;
