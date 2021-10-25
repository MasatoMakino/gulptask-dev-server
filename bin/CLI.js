#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const index_1 = require("./index");
const program = new commander_1.Command();
program
    .requiredOption("-b, --base <path>", "base directory of web contents")
    .option("--ignore [files...]", "ignore contents, not reload.")
    .addOption(new commander_1.Option("-p,--usePhpDevServer", "use PHP Development Server, ex. wordpress ").default(false))
    .parse(process.argv);
const args = program.opts();
const option = {
    ignore: args.ignore,
    usePhpDevServer: args.usePhpDevServer,
};
const server = (0, index_1.generateTask)(args.base, option);
server();
