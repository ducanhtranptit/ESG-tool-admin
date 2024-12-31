import ApiSender from "./config";

export default class ExampleAPI extends ApiSender {
	public static async getData(
		page: number,
		limit: number,
		search?: string,
		status?: string
	) {
		// Dữ liệu mẫu
		const allData = [
			{
				data1: "a",
				data2: "b",
				data3: "c",
				data4: "d",
				data5: "e",
				status: "active",
			},
			{
				data1: "x",
				data2: "y",
				data3: "z",
				data4: "w",
				data5: "v",
				status: "inactive",
			},
			// Thêm dữ liệu khác
		];

		// Lọc dữ liệu
		let filteredData = allData;
		if (search) {
			filteredData = filteredData.filter((item) =>
				Object.values(item).some((value) =>
					value
						.toString()
						.toLowerCase()
						.includes(search.toLowerCase())
				)
			);
		}

		if (status) {
			filteredData = filteredData.filter(
				(item) => item.status === status
			);
		}

		// Tính phân trang
		const total = filteredData.length;
		const totalPages = Math.ceil(total / limit);
		const offset = (page - 1) * limit;
		const paginatedData = filteredData.slice(offset, offset + limit);

		return {
			data: paginatedData,
			totalPages,
			total,
			currentPage: page,
		};
	}
}
