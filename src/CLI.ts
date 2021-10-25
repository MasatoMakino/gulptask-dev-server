#!/usr/bin/env node

import { Command, Option } from "commander";
import { generateTask } from "./index";
import { InitOption } from "./ServerOption";
const program = new Command();

program
  .requiredOption("-b, --base <path>", "base directory of web contents")
  .option("--ignore [files...]", "ignore contents, not reload.")
  .addOption(
    new Option(
      "-p,--usePhpDevServer",
      "use PHP Development Server, ex. wordpress "
    ).default(false)
  )
  .parse(process.argv);

const args = program.opts();
const option: InitOption = {
  ignore: args.ignore,
  usePhpDevServer: args.usePhpDevServer,
};

const server = generateTask(args.base, option);
server();
