#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// import { exec } from "child_process";
// const RELEASE_URL = "https://api.github.com/repos/Lazy-And-Focused/BAD-template/releases/latest";

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
      default: "/",
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

    // exec('npm i', function (error, stdout, stderr) {
    //   console.log('stdout: ' + stdout);
    //   console.log('stderr: ' + stderr);
    //   if (error !== null) {
    //     console.log('exec error: ' + error);
    //   }
    // });

    // const data = (await fetch(RELEASE_URL, {
      // method: "GET"
    // })).json();

    // console.log(data);
  })
  .help()
  .parse(hideBin(process.argv));