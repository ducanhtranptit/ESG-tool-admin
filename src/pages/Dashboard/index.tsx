import React from "react";

const DashboardPage: React.FC = () => {
	return (
		<div className="dashboard-container container mt-5">
			<div className="text-center">
				<h1 className="mb-4">
					Chào mừng đến với Trang quản trị ESG Tool
				</h1>
				<p className="text-muted">
					Sử dụng thanh menu bên trái để khám phá các tính năng. Dưới
					đây là hướng dẫn chi tiết, bao gồm các bộ lọc sẵn có cho
					từng trang.
				</p>
			</div>
			<div className="mt-5">
				<h3 className="mb-4">Hướng Dẫn Menu và Bộ Lọc:</h3>
				<div>
					{/* Người Dùng */}
					<section className="mb-5">
						<h4 className="mb-3">Người Dùng (Users)</h4>
						<p>
							<strong>Tính năng:</strong>
						</p>
						<ul>
							<li>
								- Tất Cả Người Dùng: Xem và quản lý danh sách
								người dùng trong hệ thống.
							</li>
							<li>
								- Thông Tin Chung Về Công Ty: Truy cập các thông
								tin tổng quan về công ty.
							</li>
						</ul>
						<p>
							<strong>Bộ Lọc:</strong>
						</p>
						<ul>
							<li>- Tài Khoản (Accounts)</li>
							<li>- Người Dùng (User)</li>
							<li>- Mã Công Ty (Company Code)</li>
							<li>- Trạng Thái (Status)</li>
							<li>- Mã Người Dùng (User ID)</li>
							<li>- Tên Công Ty (Company Name)</li>
						</ul>
					</section>

					{/* Câu Hỏi */}
					<section className="mb-5">
						<h4 className="mb-3">Câu Hỏi (Questions)</h4>
						<p>
							<strong>Tính năng:</strong>
						</p>
						<ul>
							<li>
								- Tất Cả Câu Hỏi: Duyệt và quản lý các câu hỏi.
							</li>
							<li>
								- Tất Cả Chủ Đề: Tổ chức và xem xét các chủ đề.
							</li>
							<li>
								- Câu Trả Lời: Quản lý các câu trả lời đã được
								gửi.
							</li>
							<li>
								- Dummies: Xem dữ liệu thử nghiệm hoặc giả lập.
							</li>
						</ul>
						<p>
							<strong>Bộ Lọc:</strong>
						</p>
						<ul>
							<li>
								- Tên (Name), Mã Câu Hỏi (Question Code), Mã Chủ
								Đề (Topic Code), Loại (Type), Ngôn Ngữ
								(Language).
							</li>
							<li>
								- Tên Chủ Đề (Name), Mã Chủ Đề (Topic Code),
								Ngôn Ngữ (Language).
							</li>
							<li>
								- Tên Câu Hỏi (Question Name), Mã Câu Hỏi
								(Question Code), Năm (Year), Mã Công Ty (Company
								Code).
							</li>
							<li>
								- Mã Câu Hỏi (Question Code), Tên Câu Hỏi
								(Question Name).
							</li>
						</ul>
					</section>

					{/* Công Ty */}
					<section className="mb-5">
						<h4 className="mb-3">Công Ty (Companies)</h4>
						<p>
							<strong>Tính năng:</strong>
						</p>
						<ul>
							<li>
								- Tất Cả Công Ty: Quản lý hồ sơ của các công ty.
							</li>
							<li>
								- Tất Cả Ngành: Xem và quản lý danh mục các
								ngành nghề.
							</li>
							<li>
								- Chỉ Số Công Ty: Định nghĩa các chỉ số quan
								trọng của công ty.
							</li>
						</ul>
						<p>
							<strong>Bộ Lọc:</strong>
						</p>
						<ul>
							<li>
								- Mã Công Ty (Company Code), Tên Công Ty
								(Company Name), Mã Ngành Cấp 2 (Industry Code
								Level 2).
							</li>
							<li>
								- Cấp 1 (Level-1), Cấp 2 (Level-2), Tên Ngành
								(Industry Name).
							</li>
						</ul>
					</section>

					{/* Tiêu Chí */}
					<section>
						<h4 className="mb-3">Tiêu Chí (Criteria)</h4>
						<p>
							<strong>Tính năng:</strong>
						</p>
						<ul>
							<li>
								- Tất Cả Tiêu Chí: Định nghĩa các tiêu chí đánh
								giá.
							</li>
							<li>
								- Tất Cả Hạng Mục: Quản lý các hạng mục tiêu
								chí.
							</li>
							<li>
								- Tất Cả Danh Mục: Tổ chức hạng mục vào các danh
								mục.
							</li>
							<li>
								- Điểm Số Tiêu Chí: Đánh giá điểm số của từng
								tiêu chí.
							</li>
						</ul>
					</section>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
