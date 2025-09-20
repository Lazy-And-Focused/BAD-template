import tar from "tar-stream";
import zlib from "zlib";

import {
  createReadStream,
  mkdirSync,
  rmSync,
  writeFileSync,
} from "fs";

import { join, parse } from "path";

export const extractFile = (path: string): void => {
  const extract = tar.extract();

  extract.on("entry", (header, stream, callback) => {
    const dirPath = parse(path).dir;
    const filePath = join(dirPath, header.name);

    const isHeaderFolder =
      header.type === "directory"
    if (isHeaderFolder) {
      try {
        mkdirSync(filePath);
      } catch { /* empty */ }
    } else {
      writeFileSync(filePath, "", "utf-8");
    }

    let file = "";
    stream.on("data", (chunk) => {
      file += chunk;
      writeFileSync(filePath, file);
    });

    stream.on("end", callback);
    stream.resume();
  });

  extract.on("finish", () => {
    rmSync(path, { force: true, recursive: true });
  });

  createReadStream(path).pipe(zlib.createGunzip()).pipe(extract);
};
