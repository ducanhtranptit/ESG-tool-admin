import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface EditUserInformationProps {
	show: boolean;
	handleClose: () => void;
	username: string;
	companyCode: string;
}

const EditUserInformation: React.FC<EditUserInformationProps> = ({
	show,
	handleClose,
	username: initialUsername,
	companyCode: initialCompanyCode,
}) => {
	const [username, setUsername] = useState(initialUsername);
	const [password, setPassword] = useState("");
	const [companyCode, setCompanyCode] = useState(initialCompanyCode);

	useEffect(() => {
		if (show) {
			setUsername(initialUsername);
			setCompanyCode(initialCompanyCode);
			setPassword(""); 
		}
	}, [show, initialUsername, initialCompanyCode]);

	const handleSave = () => {
		console.log("Saving user information:", {
			username,
			password,
			companyCode,
		});
		handleClose();
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Chỉnh sửa thông tin người dùng</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3" controlId="formUsername">
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter new password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formCompanyCode">
						<Form.Label>Company Code</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter company code"
							value={companyCode}
							onChange={(e) => setCompanyCode(e.target.value)}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={handleSave}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default EditUserInformation;
