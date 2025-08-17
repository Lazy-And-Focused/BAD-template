#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

yargs()
  .scriptName("bad")
  .usage('$0 <cmd> [args]')
  .command('hello [name] [data]', 'welcome ter yargs!', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    })
  }, function (argv) {
    console.log(argv);
  })
  .help()
  .parse(hideBin(process.argv));