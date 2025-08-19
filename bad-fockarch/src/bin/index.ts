#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import Loader from "./commands/command.loader";

const terminal = yargs();
const commands = new Loader().execute();

terminal.scriptName("bad").usage("$0 <cmd> [args]");

commands.forEach((command) => {
  terminal.command(
    command.command,
    command.description,
    (yargs) => {
      command.register().forEach((reg) => yargs.positional(...reg));
    },
    (yargs) => command.execute(yargs),
  );
});

terminal.help().parse(hideBin(process.argv));
