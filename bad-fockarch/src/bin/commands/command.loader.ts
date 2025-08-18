import { Command } from "./command.type";

import { readdirSync } from "fs";
import { join } from "path";

export class Loader {
  public static readonly fileRegExp = /.+\.command\.(?:ts|js)/;

  public execute() {
    return this.filterFiles(this.readFolder()).map((file) => 
      this.readFile(file));
  }

  private readFile(file: string) {
    const command = require(join(__dirname, file));
    
    if (command.default instanceof Command) {
      return command.default as Command<{[key: string]: unknown}>;
    } else {
      throw new Error(`Command ${file} is not a command`);
    }
  }

  private filterFiles(files: string[]) {
    return files.filter(file => Loader.fileRegExp.test(file));
  }

  private readFolder() {
    return readdirSync(__dirname);
  }
}

export default Loader;
