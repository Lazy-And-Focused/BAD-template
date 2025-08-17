#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { downloadFile } from "./download-file";
import { extractFile } from "./extract-file";
import { exec } from "child_process";

const RELEASE_URL = "https://api.github.com/repos/Lazy-And-Focused/BAD-template/releases/latest";
const getDownloadUrl = (version: string) => "https://github.com/Lazy-And-Focused/BAD-template/releases/download/" + version + "/release.tar.gz";

yargs()
  .scriptName("bad")
  .usage("$0 <cmd> [args]")
  .command("create [name] [path] [package-manager]", "create your backend app with BAD", (yargs) => {
    yargs.positional("name", {
      type: "string",
      default: "bad-app",
      describe: "name of your app"
    })

    yargs.positional("path", {
      type: "string",
      default: "./",
      describe: "path to your root"
    });

    yargs.positional("package-manager", {
      type: "string",
      default: "npm",
      describe: "Package manager (npm/pnpm)",
      alias: "pm"
    });
  }, async function (argv) {
    console.log("Название: " + argv.name);
    console.log("Путь: " + argv.path);
    console.log("Пакетный менеджер: " + argv.packageManager);
    const path = `${argv.path}${argv.name}/release.tar.gz`;

    const data = await (await fetch(RELEASE_URL, {
      method: "GET"
    })).json();

    await downloadFile((await fetch(getDownloadUrl(data.tag_name))).url, path);
    
    setTimeout(() => {
      extractFile(path);
    
      setTimeout(() => {
        console.log("Packages downloading...");
        exec(`cd ${argv.path}${argv.name} && npm i`, function (error, stdout, stderr) {
          console.log('stdout:\n' + stdout);
          console.log('stderr:\n' + stderr);
          if (error !== null) {
            console.log('exec error:\n' + error);
          }
        });
      }, 1000);
    }, 1000);
  })
  .help()
  .parse(hideBin(process.argv));