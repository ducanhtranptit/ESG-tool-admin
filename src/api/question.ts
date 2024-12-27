import ApiSender from "./config";

export default class QuestionAPI {
	public static async getAllQuestions(): Promise<any> {
		const url = "/admin/questions";
		return await ApiSender.get(url);
	}
}
