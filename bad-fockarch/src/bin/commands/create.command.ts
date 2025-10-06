import type { ArgumentsCamelCase, PositionalOptions } from "yargs";

import { exec } from "child_process";
import { join } from "path";

import Command from "./command.type";

import { getDownloadUrl, RELEASE_URL, RELEASE_FILE_NAME } from "../utils";

import { downloadFile, extractFile } from "../utils/files";
import { AdditionData } from "../utils/addition-data.type";
import { resolveChooseFilesAndDelete } from "../utils/files/choose-file";

type Props = {
  name: string;
  path: string;
  "package-manager": "npm" | "pnpm";
};

export class CreateCommand extends Command<Props> {
  public readonly command = "create [name] [path] [package-manager]";
  public readonly description = "create your backend app with BAD";
  public readonly argv: Record<keyof Props, PositionalOptions> = {
    name: {
      type: "string",
      default: "bad-app",
      describe: "name of your app folder",
    },

    path: {
      type: "string",
      default: "./",
      describe: "path to your folder",
    },

    "package-manager": {
      type: "string",
      default: "npm",
      describe: "Your package manager (npm/pnpm)",
      alias: "pm",
      choices: ["npm", "pnpm"],
    },
  };

  public async execute(argv: ArgumentsCamelCase<Props>): Promise<void> {
    const { name, path, packageManager } = argv;

    console.log("Название: " + name);
    console.log("Путь: " + path);
    console.log("Пакетный менеджер: " + packageManager);

    const folderPath = join(path, name);
    const filePath = join(folderPath, RELEASE_FILE_NAME);

    const url = await this.fetchRelease();

    await this.downloadRelease(url, filePath);
    await this.extractFile(filePath);
    await this.resolveChooseFilesAndDelete(folderPath, {
      packageManager,
    });
    await this.downloadPackages(folderPath, packageManager);

    return;
  }

  private resolveChooseFilesAndDelete(dir: string, data: AdditionData) {
    return resolveChooseFilesAndDelete(dir, data.packageManager);
  }

  private async downloadPackages(
    path: string,
    packageManager: "npm" | "pnpm",
  ): Promise<boolean | unknown> {
    console.log("Packages downloading...");

    return new Promise<boolean | unknown>((resolve, reject) => {
      exec(
        `cd ${path} && ${packageManager} --save install`,
        (error, stdout, stderr) => {
          console.log("stdout:\n" + stdout);
          console.log("stderr:\n" + stderr);

          if (error !== null) {
            console.log("exec error:\n" + error);
            reject(error);
          }

          resolve(true);
        },
      );
    });
  }

  private async extractFile(path: string): Promise<true> {
    return new Promise<true>((resolve) => {
      extractFile(path);

      setTimeout(() => resolve(true), 1000);
    });
  }

  private async downloadRelease(
    url: string,
    path: string,
  ): Promise<boolean | unknown> {
    return new Promise<boolean | unknown>((resolve, reject) => {
      downloadFile(url, path)
        .then(() => {
          setTimeout(() => {
            resolve(true);
          }, 1000);
        })
        .catch(reject);
    });
  }

  private async fetchRelease(): Promise<string> {
    const response = await fetch(RELEASE_URL, {
      method: "GET",
    });

    const release = await response.json();
    const { url } = await fetch(getDownloadUrl(release.tag_name));

    console.log("Найден релиз версии: " + release.tag_name);

    return url;
  }
}

export default CreateCommand;
