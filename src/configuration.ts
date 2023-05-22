import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import getVaultSecrets from "./vault";

const homeDir = os.homedir();
const configFolderPath = path.join(homeDir, ".curlgpt");
const configFileName = "configuration.json";
const configFilePath = path.join(configFolderPath, configFileName);

const vaultUrl =
    "https://curlgpt-public-vault-f8a43ab5.da777835.z1.hashicorp.cloud:8200";
const vaultNamespace = "admin";
const vaultRoleId = "664f4c0e-3870-cf35-9cba-e64d1019ed85";
const vaultSecretId = "91a1673b-27fa-be44-6c10-3d7d3d10e204";

const apiKeyNotFoundError = new Error(
    `Openai's Api Key is not found. Please create an API Key from ${chalk.red.underline(
        "https://platform.openai.com/"
    )} and set the API Key with \`curlgpt --set-apiKey <apiKey>\` command`
);

const isValidApiKey = (apiKey: string): boolean => {
    const apiKeyRegex = /^sk-[a-zA-Z0-9]{48}$/;
    return apiKeyRegex.test(apiKey);
};

export const setTrial = () => {
    if (fs.existsSync(configFilePath)) {
        const configData = fs.readFileSync(configFilePath, "utf-8");

        if (configData !== "") {
            const configuration = JSON.parse(configData);
            if (configuration.trial === true) {
                throw new Error(
                    `Your trial version has already been activated. You are left with ${configuration.limit} free prompts`
                );
            }
        }
    }
    if (!fs.existsSync(configFolderPath)) {
        fs.mkdirSync(configFolderPath, { recursive: true });
    }
    const configuration = {
        trial: true,
        limit: 10,
        vaultUrl,
        vaultNamespace,
        vaultRoleId,
        vaultSecretId,
    };
    fs.writeFileSync(configFilePath, JSON.stringify(configuration, null, 2));
};

export const setApiKey = (apiKey: string) => {
    if (!isValidApiKey(apiKey)) {
        throw new Error("Invalid Api Key");
    }
    if (!fs.existsSync(configFolderPath)) {
        fs.mkdirSync(configFolderPath, { recursive: true });
    }
    const configuration = { apiKey };
    fs.writeFileSync(configFilePath, JSON.stringify(configuration, null, 2));
};

export const getApiKey = async () => {
    if (!fs.existsSync(configFilePath)) {
        throw apiKeyNotFoundError;
    }

    try {
        const configData = fs.readFileSync(configFilePath, "utf-8");

        if (configData === "") {
            throw apiKeyNotFoundError;
        }

        const configuration = JSON.parse(configData);

        if (configuration.trial === true) {
            return await getVaultSecrets(configuration);
        }
        if (!configuration || typeof configuration.apiKey !== "string") {
            throw apiKeyNotFoundError;
        }

        return configuration.apiKey;
    } catch (error) {
        throw error;
    }
};
