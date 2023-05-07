#!/usr/bin/env node

import os from "os";
import path from "path";
import { program } from "commander";
import getCommand from "./openai";
import { setApiKey } from "./config";
import chalk from "chalk";

const homeDir = os.homedir();
const configFilePath = path.join(homeDir, ".curlgpt");
const configFileName = "config.json";

program.version("0.0.4");

program
    .option("-v, --version", "Print the CurlGPT version")
    .option("-h, --help", "Get help")
    .option("-s, --set-apiKey <apiKey>", "Set Openai's Api Key");

const handleOption = (input: string[]) => {
    program.parseOptions(input);

    const options = program.opts();

    if (options.setApiKey) {
        const apiKey = program.getOptionValue("setApiKey");
        try {
            setApiKey(apiKey);
        } catch (error: any) {
            console.error(chalk.red.bold("Error:"), chalk.red(error.message));
        }
        process.exit(0);
    } else if (options.help || input.length < 3 || input[2]?.startsWith("-")) {
        program.help();
    }
};
if (process.argv.length < 3 || process.argv[2]?.startsWith("-"))
    handleOption(process.argv);

program.description("Enter the prompt for CurlGPT").action(async () => {
    try {
        const command = await getCommand(program.args.join(" "));
        console.log(command);
    } catch (error: any) {
        console.error(chalk.red.bold("Error:"), chalk.red(error.message));
    }
});

program.parse(process.argv);
