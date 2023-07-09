#!/usr/bin/env node

import { program } from "commander";
import getCommand from "./openai";
import { setApiKey } from "./configuration";
import chalk from "chalk";
import helpMessage from "./help";
import clipboard from "clipboardy";
import sendEvent from "./analytics";

program
    .option("-v, --version", "Print the CurlGPT version")
    .option("-s, --set-apiKey <apiKey>", "Set Openai's Api Key")
    .option("-f, --feedback", "Get the feeback link")
    .configureHelp({ formatHelp: () => helpMessage });

const handleOption = async (input: string[]) => {
    program.parseOptions(input);

    const options = program.opts();

    if (options.version) {
        console.log(chalk.green("Version: 0.4.1"));
        process.exit(0);
    } else if (options.setApiKey) {
        const apiKey = program.getOptionValue("setApiKey");
        try {
            setApiKey(apiKey);
            await sendEvent("APIKey");
        } catch (error: any) {
            console.error(chalk.red.bold("Error:"), chalk.red(error.message));
            process.exit(1);
        }
        console.log(chalk.green("🎉 Successfully set the API Key!"));
        process.exit(0);
    } else if (options.feedback) {
        console.log(
            `Use the following link to provide your feedback: ${chalk.blue.underline(
                "https://forms.gle/AQpsMxTar7FpdouT7"
            )}`
        );
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
        await sendEvent("Prompt");
    } catch (error: any) {
        console.error(chalk.red.bold("Error:"), chalk.red(error.message));
        process.exit(1);
    }
    process.exit(0);
});

program.parse(process.argv);
