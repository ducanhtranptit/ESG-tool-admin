import React from "react";
import hello from "../../public/hello.png";

const DashboardPage: React.FC = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh"
			}}
		>
			<img src={hello} alt="ESG Tool Logo" />
		</div>
	);
};

export default DashboardPage;
