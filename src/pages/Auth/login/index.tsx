import { Form } from "react-bootstrap";
import "./styles.css";
import { useState, FormEvent } from "react";
import AuthAPI from "../../../api/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "../../../utils/cookie";
import { ACCESSTOKEN_KEY, REFRESHTOKEN_KEY } from "../../../config";
import { useNavigate } from "react-router-dom";

interface FormData {
	username: string;
	password: string;
	user?: any;
}

const Login: React.FC = () => {
	const initialState: FormData = {
		username: "",
		password: "",
	};

	const navigate = useNavigate();
	const [formData, setFormData] = useState<FormData>(initialState);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formData.username.trim()) {
			toast.error("Vui lòng nhập username");
			return;
		}
		if (!formData.password.trim()) {
			toast.error("Vui lòng nhập mật khẩu");
			return;
		}
		try {
			const response = await AuthAPI.login(formData);
			if (response?.status !== 200 || response?.data?.user?.userType !== 2) {
				toast.error("Tài khoản hoặc mật khẩu không chính xác");
				return;
			}
			if (response?.data) {
				setCookie(ACCESSTOKEN_KEY, response.data.accessToken, {
					expires: 0.5,
				});
				setCookie(REFRESHTOKEN_KEY, response.data.refreshToken, {
					expires: 1,
				});
				localStorage.setItem(
					"user",
					JSON.stringify(response.data.user)
				);
				navigate("/");
			}
		} catch (error) {
			toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
		}
	};

	return (
		<div className="login-page">
			<ToastContainer />
			<div className="container">
				<div className="form-login">
					<span className="title-login">
						Trade analytics ESG Tool
					</span>
					<span className="admin-login-text">
						Login as Administrator
					</span>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formBasicEmail" className="mt-3">
							<Form.Label>Username</Form.Label>
							<Form.Control
								placeholder="Username"
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										username: e.target.value,
									}))
								}
							/>
						</Form.Group>

						<Form.Group
							controlId="formBasicPassword"
							className="mt-3"
						>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										password: e.target.value,
									}))
								}
							/>
						</Form.Group>

						<div className="button-group mt-4">
							<button type="submit" className="btn btn-primary">
								Login
							</button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Login;
