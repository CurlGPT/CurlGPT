#!/usr/bin/env node

import { program } from "commander";

program
    .option("-v, --version", "Print the CurlGPT version")
    .option("-h, --help", "Get help");

const isOption = (input: string[]) => {
    program.parseOptions(input);

    const options = program.opts();
    const t = program.action;

    if (options.version) console.log("Version: 0.0.1");
    else if (options.help) program.help();
    else if (input.length < 3 || input[2].startsWith("-")) program.help();
};

isOption(process.argv);
