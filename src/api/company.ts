import ApiSender from "./config";

export default class CompanyAPI extends ApiSender {
	public static async getAllCompany(page: any, limit: any): Promise<any> {
		const url = `/admin/companies?page=${page}&limit=${limit}`;
		return await CompanyAPI.get(url);
	}
}
