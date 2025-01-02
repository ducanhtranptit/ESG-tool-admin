import React, { useEffect, useState } from "react";
import EditQuestionModal from "./EditQuestionModal";
import QuestionAPI from "../../api/question";
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
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import "./styles.css";

interface Question {
	questionCode: string;
	topicCode: string;
	name: string;
	language: string;
	type: string;
	answer1?: string;
	answer2?: string;
	answer3?: string;
	answer4?: string;
	answer5?: string;
	answer6?: string;
	answer7?: string;
	answer8?: string;
	answer9?: string;
	answer10?: string;
}

const AllQuestionPage: React.FC = () => {
	// -------------------------------------
	// Chỉnh sửa: Tạo thêm state 'allQuestions' để lưu toàn bộ dữ liệu
	// -------------------------------------
	const [allQuestions, setAllQuestions] = useState<Question[]>([]);
	const [questions, setQuestions] = useState<Question[]>([]);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);
	const [searchName, setSearchName] = useState<string>("");
	const [searchTopic, setSearchTopic] = useState<string>("");

	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
		null
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await QuestionAPI.getAllQuestions();

				// -------------------------------------
				// Chỉnh sửa: Lưu dữ liệu vào cả allQuestions và questions
				// -------------------------------------
				setAllQuestions(response.data || []);
				setQuestions(response.data || []);
				setLoading(false);
			} catch (error) {
				setError("Không thể lấy dữ liệu từ API");
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(questions.length / itemsPerPage);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

	const handleItemsPerPageChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setItemsPerPage(Number(event.target.value));
		setCurrentPage(1);
	};

	// -------------------------------------
	// Chỉnh sửa: hàm handleSearch filter ngay trên allQuestions
	// -------------------------------------
	const handleSearch = () => {
		const filtered = allQuestions.filter((q) => {
			const nameMatch = q.name
				.toLowerCase()
				.includes(searchName.toLowerCase().trim());
			const topicMatch = q.topicCode
				.toLowerCase()
				.includes(searchTopic.toLowerCase().trim());
			return nameMatch && topicMatch;
		});
		setQuestions(filtered);
		setCurrentPage(1);
	};

	const handleAddNew = () => {
		console.log("Adding new question");
	};

	const handleEdit = (question: Question) => {
		setSelectedQuestion(question);
		setShowEditModal(true);
	};

	const handleSaveQuestion = (updatedQuestion: Question) => {
		console.log("Updated Question:", updatedQuestion);
		setShowEditModal(false);
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
							<h1>Questions management</h1>
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
								<Form.Group controlId="searchByName">
									<Form.Label>Search by name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Search by name"
										value={searchName}
										onChange={(e) =>
											setSearchName(e.target.value)
										}
									/>
								</Form.Group>
							</Col>

							<Col md={3} className="col-spacing">
								<Form.Group controlId="searchByTopic">
									<Form.Label>
										Search by topic code
									</Form.Label>
									<Form.Control
										type="text"
										placeholder="Search by topic code"
										value={searchTopic}
										onChange={(e) =>
											setSearchTopic(e.target.value)
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

			<Card className="mb-4 shadow-sm">
				<Card.Body>
					<div className="table-wrapper">
						<Table className="table table-bordered">
							<thead>
								<tr>
									<th className="sticky-col">
										Question Code
									</th>
									<th className="sticky-col">Topic Code</th>
									<th>Name</th>
									<th>Language</th>
									<th>Type</th>
									<th>Answer 1</th>
									<th>Answer 2</th>
									<th>Answer 3</th>
									<th>Answer 4</th>
									<th>Answer 5</th>
									<th>Answer 6</th>
									<th>Answer 7</th>
									<th>Answer 8</th>
									<th>Answer 9</th>
									<th>Answer 10</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{currentItems.map((question, index) => (
									<tr key={index}>
										<td className="sticky-col">
											{question.questionCode}
										</td>
										<td className="sticky-col">
											{question.topicCode}
										</td>
										<td>{question.name}</td>
										<td>{question.language}</td>
										<td>{question.type}</td>
										<td>{question.answer1}</td>
										<td>{question.answer2}</td>
										<td>{question.answer3}</td>
										<td>{question.answer4}</td>
										<td>{question.answer5}</td>
										<td>{question.answer6}</td>
										<td>{question.answer7}</td>
										<td>{question.answer8}</td>
										<td>{question.answer9}</td>
										<td>{question.answer10}</td>
										<td>
											<Button
												variant="primary"
												size="sm"
												onClick={() =>
													handleEdit(question)
												}
											>
												<FaEdit /> Sửa
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>

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
				</Card.Body>
			</Card>

			<EditQuestionModal
				show={showEditModal}
				onClose={() => setShowEditModal(false)}
				onSave={handleSaveQuestion}
				questionData={selectedQuestion}
			/>
		</div>
	);
};

export default AllQuestionPage;
