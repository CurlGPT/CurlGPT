import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import { ApiKeyNotFoundError, InvalidAPIKeyError } from "./exception";

const homeDir = os.homedir();
const configFolderPath = path.join(homeDir, ".curlgpt");
const configFileName = "configuration.json";
const configFilePath = path.join(configFolderPath, configFileName);

const isValidApiKey = (apiKey: string): boolean => {
    const apiKeyRegex = /^sk-[a-zA-Z0-9]{48}$/;
    return apiKeyRegex.test(apiKey);
};

export const setApiKey = (apiKey: string) => {
    if (!isValidApiKey(apiKey)) {
        throw new InvalidAPIKeyError();
    }
    let configuration;
    if (!fs.existsSync(configFilePath)) {
        fs.mkdirSync(configFolderPath, { recursive: true });
    }
    configuration = { apiKey };
    fs.writeFileSync(configFilePath, JSON.stringify(configuration, null, 4));
};

export const getApiKey = () => {
    if (!fs.existsSync(configFilePath)) {
        throw new ApiKeyNotFoundError();
    }

    try {
        const configData = fs.readFileSync(configFilePath, "utf-8");

        if (configData === "") {
            throw new ApiKeyNotFoundError();
        }

        const configuration = JSON.parse(configData);

        if (!configuration || typeof configuration.apiKey !== "string") {
            throw new ApiKeyNotFoundError();
        }

        return configuration.apiKey;
    } catch (error) {
        throw error;
    }
};
