import os from "os";
import fs from "fs";
import path from "path";

const homeDir = os.homedir();
const configFolderPath = path.join(homeDir, ".curlgpt");
const configFileName = "config.json";
const configFilePath = path.join(configFolderPath, configFileName);

const apiKeyNotFoundError = new Error(
    "Openai's Api Key is not found. Please create an API Key from https://platform.openai.com/ and set the API Key with `curlgpt --set-apiKey <apiKey>` command"
);

function isValidApiKey(apiKey: string): boolean {
    const apiKeyRegex = /^sk-[a-zA-Z0-9]{48}$/;
    return apiKeyRegex.test(apiKey);
}

export const setApiKey = (apiKey: string) => {
    if (!isValidApiKey(apiKey)) {
        throw new Error("Invalid Api Key");
    }
    if (!fs.existsSync(configFolderPath)) {
        fs.mkdirSync(configFolderPath, { recursive: true });
    }
    const config = { apiKey };
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
};

export const getApiKey = () => {
    if (!fs.existsSync(configFilePath)) {
        throw apiKeyNotFoundError;
    }

    try {
        const configData = fs.readFileSync(configFilePath, "utf-8");
        if (configData === "") {
            throw apiKeyNotFoundError;
        }

        const config = JSON.parse(configData);
        if (!config || typeof config.apiKey !== "string") {
            throw apiKeyNotFoundError;
        }

        return config.apiKey;
    } catch (error) {
        throw apiKeyNotFoundError;
    }
};
