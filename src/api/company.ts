import ApiSender from "./config";

export default class CompanyAPI extends ApiSender {
	public static async getAllCompany(page: any, limit: any): Promise<any> {
		const url = `/admin/companies?page=${page}&limit=${limit}`;
		return await CompanyAPI.get(url);
	}

	public static async getAllCompanyMetric(
		page: any,
		limit: any
	): Promise<any> {
		const url = `/admin/conpany-metric-all?page=${page}&limit=${limit}`;
		return await CompanyAPI.get(url);
	}

	public static async getAllCompanyScore(
		page: any,
		limit: any
	): Promise<any> {
		const url = `/admin/conpany-score-all?page=${page}&limit=${limit}`;
		return await CompanyAPI.get(url);
	}

	public static async getAllIndustries(page: any, limit: any): Promise<any> {
		const url = `/admin/industry-all?page=${page}&limit=${limit}`;
		return await CompanyAPI.get(url);
	}
}
