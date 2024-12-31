import ApiSender from "./config";

export default class QuestionAPI {
	public static async getAllQuestions(): Promise<any> {
		const url = "/admin/questions";
		return await ApiSender.get(url);
	}

	public static async getAllAnswers(page: any, limit: any): Promise<any> {
		const url = `/admin/answers?page=${page}&limit=${limit}`;
		return await ApiSender.get(url);
	}
}
