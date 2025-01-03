import React, { useEffect, useState } from "react";
import { FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
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
import TopicAPI from "../../api/topic";
import "./styles.css";

interface Data {
	topicCode?: string;
	name?: string;
	answerGuide?: string;
	language?: string;
}

const TopicPage: React.FC = () => {
	const [topics, setTopics] = useState<Data[]>([]);
	const [filteredTopics, setFilteredTopics] = useState<Data[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);
	const [searchName, setSearchName] = useState<string>("");
	const [searchTopicCode, setSearchTopicCode] = useState<string>("");
	const [languageFilter, setLanguageFilter] = useState<string>("");

	const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await TopicAPI.getAllTopics();
				setTopics(response.data || []);
				setFilteredTopics(response.data || []);
				setLoading(false);
			} catch (error) {
				setError("Không thể lấy dữ liệu từ API");
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(totalPages || 1);
		}
	}, [totalPages, currentPage]);

	const handleItemsPerPageChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setItemsPerPage(Number(event.target.value));
		setCurrentPage(1);
	};

	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const getCurrentPageData = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredTopics.slice(startIndex, endIndex);
	};

	const handleFilter = () => {
		const filtered = topics.filter((topic) => {
			return (
				(searchName === "" ||
					topic.name
						?.toLowerCase()
						.includes(searchName.toLowerCase())) &&
				(searchTopicCode === "" ||
					topic.topicCode
						?.toLowerCase()
						.includes(searchTopicCode.toLowerCase())) &&
				(languageFilter === "" ||
					(topic.language &&
						topic.language.toLowerCase() ===
							languageFilter.toLowerCase()))
			);
		});
		setFilteredTopics(filtered);
		setCurrentPage(1); // Reset về trang đầu tiên khi filter
	};

	const renderPaginationItems = () => {
		const items = [];

		if (currentPage > 3) {
			items.push(
				<Pagination.Item
					key={1}
					active={1 === currentPage}
					onClick={() => paginate(1)}
				>
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
					onClick={() => paginate(i)}
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
					active={totalPages === currentPage}
					onClick={() => paginate(totalPages)}
				>
					{totalPages}
				</Pagination.Item>
			);
		}

		return items;
	};

	return (
		<div className="content-wrapper">
			<section className="content-header">
				<div className="container-fluid">
					<div className="row mb-2">
						<div className="col-sm-6">
							<h1>Topic Management</h1>
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
					onClick={() => console.log("Adding new topic")}
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
								<Form.Group controlId="searchName">
									<Form.Label>Search by Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Search by Name"
										value={searchName}
										onChange={(e) =>
											setSearchName(e.target.value)
										}
									/>
								</Form.Group>
							</Col>
							<Col md={3} className="col-spacing">
								<Form.Group controlId="searchTopicCode">
									<Form.Label>
										Search by Topic Code
									</Form.Label>
									<Form.Control
										type="text"
										placeholder="Search by Topic Code"
										value={searchTopicCode}
										onChange={(e) =>
											setSearchTopicCode(e.target.value)
										}
									/>
								</Form.Group>
							</Col>
							<Col md={2} className="col-spacing">
								<Form.Group controlId="filterStatus">
									<Form.Label>Language</Form.Label>
									<Form.Select
										value={languageFilter}
										onChange={(e) =>
											setLanguageFilter(e.target.value)
										}
									>
										<option value="">All</option>
										<option value="vi">Vietnamese</option>
										<option value="en">English</option>
									</Form.Select>
								</Form.Group>
							</Col>
							<Col
								md={2}
								className="d-flex justify-content-end col-spacing"
							>
								<Button
									variant="primary"
									className="mt-4"
									onClick={handleFilter}
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
					{loading ? (
						<div
							className="d-flex justify-content-center align-items-center"
							style={{ height: "200px" }}
						>
							<Spinner
								animation="border"
								role="status"
								variant="primary"
							>
								<span className="visually-hidden">
									Loading...
								</span>
							</Spinner>
						</div>
					) : error ? (
						<p className="text-danger">{error}</p>
					) : filteredTopics.length > 0 ? (
						<div className="table-wrapper">
							<Table className="table table-bordered">
								<thead>
									<tr>
										<th>Topic Code</th>
										<th>Language</th>
										<th>Name</th>
										<th>Answer Guide</th>
										<th>#</th>
									</tr>
								</thead>
								<tbody>
									{getCurrentPageData().map((data, index) => (
										<tr key={index}>
											<td>{data.topicCode}</td>
											<td>{data.language}</td>
											<td>{data.name}</td>
											<td>{data.answerGuide}</td>
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
					) : (
						<p>Không có dữ liệu để hiển thị.</p>
					)}

					{!loading && !error && filteredTopics.length > 0 && (
						<div className="pagination-container">
							<Pagination className="mb-0">
								<Pagination.Prev
									onClick={() => paginate(currentPage - 1)}
									disabled={currentPage === 1}
								/>
								{renderPaginationItems()}
								<Pagination.Next
									onClick={() => paginate(currentPage + 1)}
									disabled={currentPage === totalPages}
								/>
							</Pagination>

							<Form.Select
								value={itemsPerPage}
								onChange={handleItemsPerPageChange}
								className="ms-3 items-per-page-select pagination-controls"
								style={{ width: "130px" }}
							>
								<option value={10}>10 / page</option>
								<option value={20}>20 / page</option>
								<option value={50}>50 / page</option>
								<option value={100}>100 / page</option>
							</Form.Select>
						</div>
					)}
				</Card.Body>
			</Card>
		</div>
	);
};

export default TopicPage;
