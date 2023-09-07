import express from "express";
import bodyParser from "body-parser";
import { S3Client } from "@aws-sdk/client-s3";
import { ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1mb" }));

const BUCKET = process.env.BUCKET;
const S3_END_POINT = process.env.S3_END_POINT;
const credentials = {
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
};
const s3Client = new S3Client({
	endpoint: S3_END_POINT,
	credentials: credentials,
	region: process.env.REGION,
});

app.get("/", async (req, res) => {
	res.json({ message: "API WORKING" }).status(200);
});

app.post("/upload", async (req, res) => {
	const info = {
		Bucket: BUCKET,
		Key: req?.body?.fileName,
		Body: req?.body?.fileBody,
		ContentType: "text/javascript",
	};
	await s3Client.send(new PutObjectCommand(info));
	res.status(200).json({ url: `${S3_END_POINT}/${BUCKET}/${info.Key}` });
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
