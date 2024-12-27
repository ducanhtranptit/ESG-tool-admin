import ApiSender from "./config";

export default class UserAPI {
	public static async getProfile() {
		const url = "/users/profile";
		return await ApiSender.get(url);
	}

	public static async getAllAccounts(): Promise<any> {
		const url = "/admin/account/get-all-accounts";
		return await ApiSender.get(url);
	}

	public static async getAllOverallInfors(): Promise<any> {
		const url = "/admin/get-all-overall-information";
		return await ApiSender.get(url);
	}
}
