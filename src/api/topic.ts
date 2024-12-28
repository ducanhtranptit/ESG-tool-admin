import ApiSender from "./config";

export default class TopicAPI extends ApiSender {
	public static async getAllTopics(): Promise<any> {
		const url = "admin/topics";
		return TopicAPI.get(url);
	}
}
