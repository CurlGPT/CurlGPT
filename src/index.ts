#!/usr/bin/env node

import { program } from "commander";
import getCommand from "./openai";
import { setApiKey } from "./config";
import chalk from "chalk";
import helpMessage from "./help";
import clipboard from "clipboardy";
import { string } from "yup";

program
    .option("-v, --version", "Print the CurlGPT version")
    .option("-s, --set-apiKey <apiKey>", "Set Openai's Api Key")
    .configureHelp({ formatHelp: (cmd, helperOptions) => helpMessage });

const handleOption = (input: string[]) => {
    program.parseOptions(input);

    const options = program.opts();

    if (options.version) {
        console.log(chalk.green("Version: 0.2.1"));
        process.exit(0);
    } else if (options.setApiKey) {
        const apiKey = program.getOptionValue("setApiKey");
        try {
            setApiKey(apiKey);
        } catch (error: any) {
            console.error(chalk.red.bold("Error:"), chalk.red(error.message));
            process.exit(1);
        }
        console.log(chalk.green("🎉 Successfully set the API Key!"));
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
        if (command) {
            clipboard.writeSync(command);
            console.log(command);
        }
    } catch (error: any) {
        console.error(chalk.red.bold("Error:"), chalk.red(error.message));
    }
});

program.parse(process.argv);
