import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import UserAPI from "../../api/user";

interface Account {
	username: string;
	company: string;
}

const AccountPage: React.FC = () => {
	const [accounts, setAccounts] = useState<Account[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
					const response = await UserAPI.getAllAccounts();
					console.log("response: ", response);
					setAccounts(response.data);
					setLoading(false);
			} catch (error) {
				setError("Không thể lấy dữ liệu từ API");
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div
				className="d-flex justify-content-center align-items-center "
				style={{ height: "80vh" }}
			>
				<Spinner animation="border" role="status">
					<span className="visually-hidden">loading...</span>
				</Spinner>
			</div>
		);
	}
	if (error) return <p>{error}</p>;

	return (
		<div className="container my-4">
			<h2 className="mb-4">Danh sách tài khoản</h2>
			<table className="table table-striped table-hover table-bordered">
				<thead className="table-primary">
					<tr>
						<th>Username</th>
						<th>Company</th>
					</tr>
				</thead>
				<tbody>
					{accounts.map((account, index) => (
						<tr key={index}>
							<td>{account.username}</td>
							<td>{account.company}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AccountPage;
