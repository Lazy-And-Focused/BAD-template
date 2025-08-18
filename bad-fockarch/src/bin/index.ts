#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
// import { downloadFile } from "./utils/download-file";
// import { extractFile } from "./utils/extract-file";
// import { exec } from "child_process";

// const RELEASE_URL = "https://api.github.com/repos/Lazy-And-Focused/BAD-template/releases/latest";
// const getDownloadUrl = (version: string) => "https://github.com/Lazy-And-Focused/BAD-template/releases/download/" + version + "/release.tar.gz";

import Loader from "./commands/command.loader";

const terminal = yargs();

const commands = new Loader().execute();

terminal
  .scriptName("bad")
  .usage("$0 <cmd> [args]")
  
commands.forEach((command) => {
  terminal.command(command.command, command.description, (yargs) => {
    command.register().forEach(reg => yargs.positional(...reg));
  }, (yargs) => command.execute(yargs));
});

terminal
  .help()
  .parse(hideBin(process.argv));