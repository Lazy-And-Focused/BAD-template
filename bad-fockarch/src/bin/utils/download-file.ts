import https from "https";

import { rm } from "node:fs/promises";
import { existsSync, createWriteStream, mkdirSync } from "node:fs";

import { parse } from "path";

const createDir = (path: string) => {
	const dirs: string[] = [];

	const create = (filePath: string = path) => {
		const path = parse(filePath).dir;

		if (existsSync(path)) return dirs;

		dirs.unshift(path);
		return create(path);
	}

	return create(path);
}

export const downloadFile = async (url: string, path: string) => {
	const dirPath = parse(path).dir;

	return new Promise((resolve, reject) => {
		rm(dirPath, { force: true, recursive: true}).then(() => {
			createDir(path).forEach(path => {
				mkdirSync(path);
			});
			
			const file = createWriteStream(path);

			https.get(url, (res) => {
				console.log("downloading...");
				res.pipe(file);
		
				file.on("finish", () => {
					console.log("downloaded!");
					file.close();
					resolve(true);
				});

				file.on("error", reject);
			});
		});
	});
};