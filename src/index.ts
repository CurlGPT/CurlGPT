#!/usr/bin/env node

import { program } from "commander";
program
    .option("-v, --version", "output the version of CurlGPT")
    .option("-h, --help", "Get help");

const isOption = (input: string[]) => {
    program.parseOptions(input);

    const options = program.opts();
    const t = program.action;

    if (options.version) console.log("Version: 0.0.1");
    else if (options.help)
        console.log(`ChatGPT in your favorite terminal

Options:
    -v, --version            Print version information and quit
    -h, --help               Get help`);
    else if (input[2].startsWith("-"))
        console.log("Invalid Option. Try -h or --help for more options.");
    else getCommand(input[2]);
};

isOption(process.argv);

function getCommand(prompt: string) {
    console.log(prompt);
}
