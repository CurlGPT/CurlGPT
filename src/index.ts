#!/usr/bin/env node

import { program } from "commander";
import getCommand from "./prompt";
import { setApiKey } from "./configuration";
import chalk from "chalk";
import helpMessage from "./help";
import clipboard from "clipboardy";

program
    .option("-v, --version", "Print the CurlGPT version")
    .option("-s, --set-apiKey <apiKey>", "Set CurlGPT's Api Key")
    .configureHelp({ formatHelp: () => helpMessage });

const handleOption = async (input: string[]) => {
    program.parseOptions(input);

    const options = program.opts();
    if (options.version) {
        console.log(chalk.green("Version: 1.0.1"));
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
        const prompt = program.args.join(" ");
        if (!prompt) return;
        const command = await getCommand(prompt);
        if (command) {
            clipboard.writeSync(command);
            console.log(command);
        }
    } catch (error: any) {
        console.error(chalk.red.bold("Error:"), chalk.red(error.message));
        process.exit(1);
    }
    process.exit(0);
});

program.parse(process.argv);
