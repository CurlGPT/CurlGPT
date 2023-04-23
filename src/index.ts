#!/usr/bin/env node

import { program } from "commander";

program
    .option("-v, --version", "Print the CurlGPT version")
    .option("-h, --help", "Get help");

const handleOption = (input: string[]) => {
    program.parseOptions(input);

    const options = program.opts();

    if (options.version) {
        console.log("Version: 0.0.1");
        process.exit(0);
    } else if (options.help || input.length < 3 || input[2].startsWith("-")) {
        program.help();
    }
};
if (process.argv.length < 3 || process.argv[2].startsWith("-"))
    handleOption(process.argv);

program.description("Enter the prompt for CurlGPT").action(() => {
    console.log("Prompt:", program.args.join(" "));
});

program.parse(process.argv);
