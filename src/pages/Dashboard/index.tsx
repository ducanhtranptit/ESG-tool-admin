import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import ExampleAPI from "../../api/example";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Spinner, Table, Button, Card, Form, Row, Col } from "react-bootstrap";
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
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);
	const [searchUsername, setSearchUsername] = useState<string>("");
	const [statusFilter, setStatusFilter] = useState<string>("");

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

	const handleEdit = () => {};

	const handleSearch = () => {
		console.log(`Searching for username: ${searchUsername}`);
		console.log(`Filtering by status: ${statusFilter}`);
	};

	const handleAddNew = () => {
		console.log("Adding new user");
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
							<h1>Tên trang</h1>
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
								<th style={{ width: "20%" }}>#TH</th>
								<th style={{ width: "20%" }}>#TH</th>
								<th style={{ width: "20%" }}>#TH</th>
								<th style={{ width: "20%" }}>#TH</th>
								<th style={{ width: "20%" }}>#TH</th>
							</tr>
						</thead>
						<tbody>
							{accounts.map((data, index) => (
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
											<FaEdit /> Sửa
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		</div>
	);
};

export default ExamplePage;
