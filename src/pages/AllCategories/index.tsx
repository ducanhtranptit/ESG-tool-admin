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
import ExampleAPI from "../../api/example";
import "./styles.css";

interface Data {
	data1?: any;
	data2?: any;
	data3?: any;
	data4?: any;
	data5?: any;
	data6?: any;
	data7?: any;
	data8?: any;
}

const ExamplePage: React.FC = () => {
	const [accounts, setAccounts] = useState<Data[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);
	const [searchUsername, setSearchUsername] = useState<string>("");

	const totalPages = Math.ceil(accounts.length / itemsPerPage);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await ExampleAPI.getData();
				setAccounts(response.data);
				setLoading(false);
			} catch (error) {
				setError("Không thể lấy dữ liệu từ API");
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const handleItemsPerPageChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setItemsPerPage(Number(event.target.value));
		setCurrentPage(1);
	};

	const handleSearch = () => {
		console.log(`Searching for username: ${searchUsername}`);
	};

	const handleAddNew = () => {
		console.log("Adding new user");
	};

	const handleEdit = () => {
		console.log("Editing item");
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

	const currentData = accounts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

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
							<h1>Tên trang</h1>
						</div>
					</div>
				</div>
			</section>

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
					{isFilterOpen ? <FaChevronUp /> : <FaChevronDown />}
				</Card.Header>
				{isFilterOpen && (
					<Card.Body>
						<Row>
							<Col md={3}>
								<Form.Group controlId="searchQuery">
									<Form.Label>Search</Form.Label>
									<Form.Control
										type="text"
										placeholder="By name"
										value={searchUsername}
										onChange={(e) =>
											setSearchUsername(e.target.value)
										}
									/>
								</Form.Group>
							</Col>
							<Col
								md={8}
								className="d-flex align-items-end justify-content-end"
							>
								<Button
									variant="primary"
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
								<th style={{ width: "20%" }}>#TH</th>
								<th style={{ width: "20%" }}>#TH</th>
								<th style={{ width: "20%" }}>#TH</th>
								<th style={{ width: "20%" }}>#TH</th>
								<th style={{ width: "20%" }}>#TH</th>
							</tr>
						</thead>
						<tbody>
							{currentData.map((data, index) => (
								<tr key={index}>
									<td>{data.data1}</td>
									<td>{data.data2}</td>
									<td>{data.data3}</td>
									<td>{data.data4}</td>
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
				</Card.Body>

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
			</Card>
		</div>
	);
};

export default ExamplePage;
