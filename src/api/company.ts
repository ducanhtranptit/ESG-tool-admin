import ApiSender from "./config";

export default class CompanyAPI extends ApiSender {
	public static async getAllCompany(
		page: any,
		limit: any,
		companyCode: any,
		companyName: any,
		industryCodeLevel2: any
	): Promise<any> {
		const url = `/admin/companies?page=${page}&limit=${limit}&companyCode=${companyCode}&companyName=${companyName}&industryCodeLevel2=${industryCodeLevel2}`;
		return await CompanyAPI.get(url);
	}

	public static async getAllCompanyMetric(
		page: any,
		limit: any,
		criteriaName: any,
		companyCode: any,
		year: any
	): Promise<any> {
		const url = `/admin/conpany-metric-all?page=${page}&limit=${limit}&criteriaName=${criteriaName}&companyCode=${companyCode}&year=${year}`;
		return await CompanyAPI.get(url);
	}

	public static async getAllCompanyScore(
		page: any,
		limit: any,
		companyCode: any,
		year: any
	): Promise<any> {
		const url = `/admin/conpany-score-all?page=${page}&limit=${limit}&companyCode=${companyCode}&year=${year}`;
		return await CompanyAPI.get(url);
	}

	public static async getAllIndustries(
		page: any,
		limit: any,
		level1: any,
		level2: any,
		industryName: any
	): Promise<any> {
		const url = `/admin/industry-all?page=${page}&limit=${limit}&level1=${level1}&level2=${level2}&industryName=${industryName}`;
		return await CompanyAPI.get(url);
	}
}
