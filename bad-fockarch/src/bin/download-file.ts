import https from "https";
import fs, { existsSync } from "fs";
import { rm } from "node:fs/promises";
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

export const downloadFile = async (url: string, path: string) => {
	return rm(parse(path).dir, { force: true, recursive: true }).then(() => {
		createDir(path).reverse().forEach(path => {
			fs.mkdirSync(path);
		});
	
		const file = fs.createWriteStream(path);
	
		return https.get(url, (res) => {
			console.log("downloading...");
			res.pipe(file);
	
			file.on("finish", () => {
				console.log("downloaded!");
				file.close();
			});
		});
	})
}