import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import {
    ApiKeyNotFoundError,
    InvalidAPIKeyError,
    UsageLimitExceededError,
} from "./exception";

const homeDir = os.homedir();
const configFolderPath = path.join(homeDir, ".curlgpt");
const configFileName = "configuration.json";
const configFilePath = path.join(configFolderPath, configFileName);

const isValidApiKey = (apiKey: string): boolean => {
    const apiKeyRegex = /^la-[a-zA-Z0-9]{30}$/;
    return apiKeyRegex.test(apiKey);
};

export const setApiKey = (apiKey: string) => {
    if (!isValidApiKey(apiKey)) {
        throw new InvalidAPIKeyError();
    }
    let configuration;
    if (!fs.existsSync(configFilePath)) {
        fs.mkdirSync(configFolderPath, { recursive: true });

        configuration = {
            apiKey,
            promptCount: 0,
        };
    } else {
        const configData = fs.readFileSync(configFilePath, "utf-8");
        const exisitingConfiguration = JSON.parse(configData);
        configuration = { ...exisitingConfiguration, apiKey };
    }
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
        if (configuration.promptCount >= 500) {
            throw new UsageLimitExceededError();
        }

        return configuration.apiKey;
    } catch (error) {
        throw error;
    }
};

export const updatePromptCount = (usageCount: number) => {
    let configuration;
    const configData = fs.readFileSync(configFilePath, "utf-8");
    const exisitingConfiguration = JSON.parse(configData);
    configuration = { ...exisitingConfiguration, usageCount };
    fs.writeFileSync(configFilePath, JSON.stringify(configuration, null, 4));
};
