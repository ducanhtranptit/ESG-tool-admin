import ApiSender from "./config";

export default class ExampleAPI extends ApiSender {
	public static async getData() {
		const dataExample = {
			data: [
				{
					data1: "a",
					data2: "b",
					data3: "c",
					data4: "d",
					data5: "e",
				},
				{
					data1: "x",
					data2: "y",
					data3: "z",
					data4: "w",
					data5: "v",
				},
			],
		};

		return dataExample;
	}
}
