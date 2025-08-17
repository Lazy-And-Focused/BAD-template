import tar from "tar-stream"
import fs from "fs"
import zlib from "zlib"
import { join, parse } from "path"

export const extractFile = (path: string) => {
  const extract = tar.extract();

  extract.on('entry', function(header, stream, cb) {
    if (header.type === "directory") {
      if (!fs.existsSync(join(parse(path).dir, header.name))) {
        fs.mkdirSync(join(parse(path).dir, header.name));
      };
    } else {
      fs.writeFileSync(join(parse(path).dir, header.name), "");
    }

    let file = ""
    stream.on('data', function(chunk) {
      file += chunk
      fs.writeFileSync(join(parse(path).dir, header.name), file);
    });

    stream.on('end', function() {
      cb();
    });

    stream.resume();
  });
  
  extract.on('finish', function() {
    fs.rmSync(path, {force: true, recursive: true});
  });
  
  fs.createReadStream(path)
    .pipe(zlib.createGunzip())
    .pipe(extract);
}
