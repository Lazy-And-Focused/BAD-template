import { Command } from "./command.type";

import { readdirSync } from "fs";
import { join } from "path";

export class Loader {
  public static readonly fileRegExp = /.+\.command\.(?:ts|js)/;

  public execute(): Command<{ [key: string]: unknown }>[] {
    return this.filterFiles(this.readFolder()).map((file) =>
      this.readFile(file),
    );
  }

  private readFile(file: string): Command<{ [key: string]: unknown }> {
    const data = require(join(__dirname, file));
    const command = new data.default();

    if (command instanceof Command) {
      return command as Command<{ [key: string]: unknown }>;
    } else {
      throw new Error(`Command ${file} is not a command`);
    }
  }

  private filterFiles(files: string[]): string[] {
    return files.filter((file) => Loader.fileRegExp.test(file));
  }

  private readFolder(): string[] {
    return readdirSync(__dirname);
  }
}

export default Loader;
