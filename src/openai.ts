import os from "os";
import fs from "fs";
import path from "path";
import { Configuration, OpenAIApi } from "openai";

const homeDir = os.homedir();
const configFilePath = path.join(homeDir, ".curlgpt");
const configFileName = "config.json";

const getCommand = async (prompt: string) => {
    const configData = fs.readFileSync(
        configFilePath + "/" + configFileName,
        "utf-8"
    );
    const config = JSON.parse(configData);
    const apiKey = config.apiKey;

    const configuration = new Configuration({ apiKey });

    const openai = new OpenAIApi(configuration);

    const command = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `Topic: command line tool. Length: 1 line. Task: generate shell command on ${prompt}`,
            },
        ],
    });
    if (command.data.choices[0]?.message) {
        return command.data.choices[0].message.content;
    }
    return command.data;
};
export default getCommand;
