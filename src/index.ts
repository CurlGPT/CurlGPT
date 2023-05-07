#!/usr/bin/env node

import { program } from "commander";
import getCommand from "./openai";
import fs from "fs";

const configFilePath = "/Users/lokeswaranaruljothy/Desktop/curlgpt.json";

program
    .option("-v, --version", "Print the CurlGPT version")
    .option("-h, --help", "Get help")
    .option("-a, --apikey <apikey>", "Set Openai's Api Key");

const handleOption = (input: string[]) => {
    program.parseOptions(input);

    const options = program.opts();

    if (options.version) {
        console.log("Version: 0.0.1");
        process.exit(0);
    } else if (options.apikey) {
        const apikey = program.getOptionValue("apikey");
        const config = { apikey };
        fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
        process.exit(0);
    } else if (options.help || input.length < 3 || input[2]?.startsWith("-")) {
        program.help();
    }
};
if (process.argv.length < 3 || process.argv[2]?.startsWith("-"))
    handleOption(process.argv);

program.description("Enter the prompt for CurlGPT").action(async () => {
    const command = await getCommand(program.args.join(" "));
    console.log(command);
});

program.parse(process.argv);
