import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

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

interface EditQuestionModalProps {
	show: boolean;
	onClose: () => void;
	onSave: (updatedQuestion: Question) => void;
	questionData: Question | null;
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
	show,
	onClose,
	onSave,
	questionData,
}) => {
	const [formData, setFormData] = useState<Question | null>(null);

	useEffect(() => {
		if (questionData) {
			setFormData(questionData);
		}
	}, [questionData]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (formData) {
			setFormData({
				...formData,
				[event.target.name]: event.target.value,
			});
		}
	};

	const handleSubmit = () => {
		if (formData) {
			console.log("Form Data Submitted:", formData);
			onSave(formData);
		}
	};

	return (
		<Modal show={show} size="xl" onHide={onClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Chỉnh sửa câu hỏi</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{formData && (
					<Form>
						<Form.Group controlId="questionCode">
							<Form.Label>Mã câu hỏi</Form.Label>
							<Form.Control
								type="text"
								name="questionCode"
								value={formData.questionCode}
								readOnly
							/>
						</Form.Group>

						<Form.Group controlId="topicCode">
							<Form.Label>Mã chủ đề</Form.Label>
							<Form.Control
								type="text"
								name="topicCode"
								value={formData.topicCode}
								onChange={handleInputChange}
							/>
						</Form.Group>

						<Form.Group controlId="name">
							<Form.Label>Tên câu hỏi</Form.Label>
							<Form.Control
								type="text"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
							/>
						</Form.Group>

						<Form.Group controlId="language">
							<Form.Label>Ngôn ngữ</Form.Label>
							<Form.Control
								type="text"
								name="language"
								value={formData.language}
								onChange={handleInputChange}
							/>
						</Form.Group>

						<Form.Group controlId="type">
							<Form.Label>Loại</Form.Label>
							<Form.Control
								type="text"
								name="type"
								value={formData.type}
								onChange={handleInputChange}
							/>
						</Form.Group>

						{[...Array(10).keys()].map((i) => (
							<Form.Group
								controlId={`answer${i + 1}`}
								key={`answer${i + 1}`}
							>
								<Form.Label>Đáp án {i + 1}</Form.Label>
								<Form.Control
									type="text"
									name={`answer${i + 1}`}
									value={
										(formData as any)[`answer${i + 1}`] ||
										""
									}
									onChange={handleInputChange}
								/>
							</Form.Group>
						))}
					</Form>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
					Đóng
				</Button>
				<Button variant="primary" onClick={handleSubmit}>
					Lưu
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default EditQuestionModal;
