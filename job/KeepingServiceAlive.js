import Axios from "axios";
import { scheduleJob } from "node-schedule";

export function keepServiceAlive() {
	scheduleJob("* */14 * * * *", async () => {
		console.log("----PING JOB-----");
		const pingURL = process.env.PING_URL;
		const res = await Axios.get(pingURL);
		console.log(res.data);
	});
}
