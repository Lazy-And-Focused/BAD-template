import https from "https";
import fs, { existsSync } from "fs";
import { parse } from "path";

const createDir = (filePath: string, dirs: string[] = []) => {
	const path = parse(filePath).dir;

	if (existsSync(path)) {
		return dirs;
	};

	dirs.push(path);
	createDir(path, dirs);

	return dirs;
}

export const downloadFile = (url: string, path: string) => {
	createDir(path).reverse().forEach(path => {
		fs.mkdirSync(path);
	});

	const file = fs.createWriteStream(path);

	https.get(url, (res) => {
		console.log("downloading...");
		res.pipe(file);

    file.on("finish", () => {
			console.log("downloaded!");
			file.close();
		});
	});
}