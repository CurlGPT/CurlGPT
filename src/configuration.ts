import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import getVaultSecrets from "./vault";
import {
    TrialLimitExceededError,
    ApiKeyNotFoundError,
    InvalidAPIKeyError,
    TrialAlreadyActivatedError,
} from "./error";

const homeDir = os.homedir();
const configFolderPath = path.join(homeDir, ".curlgpt");
const configFileName = "configuration.json";
const configFilePath = path.join(configFolderPath, configFileName);

const vaultUrl =
    "https://curlgpt-public-vault-f8a43ab5.da777835.z1.hashicorp.cloud:8200";
const vaultNamespace = "admin";
const vaultRoleId = "664f4c0e-3870-cf35-9cba-e64d1019ed85";
const vaultSecretId = "91a1673b-27fa-be44-6c10-3d7d3d10e204";

const isValidApiKey = (apiKey: string): boolean => {
    const apiKeyRegex = /^sk-[a-zA-Z0-9]{48}$/;
    return apiKeyRegex.test(apiKey);
};

export const setTrial = () => {
    let configuration;
    if (!fs.existsSync(configFilePath)) {
        fs.mkdirSync(configFolderPath, { recursive: true });

        configuration = {
            trial: true,
            limit: 10,
            vaultUrl,
            vaultNamespace,
            vaultRoleId,
            vaultSecretId,
            apiKey: null,
        };
    } else {
        const configData = fs.readFileSync(configFilePath, "utf-8");

        const exisitingConfiguration = JSON.parse(configData);
        if (exisitingConfiguration.trial === true) {
            throw TrialAlreadyActivatedError(exisitingConfiguration.limit);
        } else {
            configuration = {
                ...exisitingConfiguration,
                trial: true,
            };
        }
    }
    fs.writeFileSync(configFilePath, JSON.stringify(configuration, null, 4));
};

export const setApiKey = (apiKey: string) => {
    if (!isValidApiKey(apiKey)) {
        throw InvalidAPIKeyError();
    }
    let configuration;
    if (!fs.existsSync(configFilePath)) {
        fs.mkdirSync(configFolderPath, { recursive: true });

        configuration = {
            trial: false,
            limit: 10,
            vaultUrl,
            vaultNamespace,
            vaultRoleId,
            vaultSecretId,
            apiKey,
        };
    } else {
        const configData = fs.readFileSync(configFilePath, "utf-8");
        const exisitingConfiguration = JSON.parse(configData);
        configuration = { ...exisitingConfiguration, trial: false, apiKey };
    }
    fs.writeFileSync(configFilePath, JSON.stringify(configuration, null, 4));
};

export const getApiKey = async () => {
    if (!fs.existsSync(configFilePath)) {
        throw ApiKeyNotFoundError();
    }

    try {
        const configData = fs.readFileSync(configFilePath, "utf-8");

        if (configData === "") {
            throw ApiKeyNotFoundError();
        }

        const configuration = JSON.parse(configData);

        if (configuration.trial === true) {
            if (configuration.limit <= 0) {
                throw TrialLimitExceededError();
            }
            const apiKey = await getVaultSecrets(configuration);
            decrementLimit();
            return apiKey;
        }
        if (!configuration || typeof configuration.apiKey !== "string") {
            throw ApiKeyNotFoundError();
        }

        return configuration.apiKey;
    } catch (error) {
        throw error;
    }
};

export const decrementLimit = () => {
    const configData = fs.readFileSync(configFilePath, "utf-8");
    const exisitingConfiguration = JSON.parse(configData);
    const configuration = {
        ...exisitingConfiguration,
        limit: exisitingConfiguration.limit - 1,
    };
    fs.writeFileSync(configFilePath, JSON.stringify(configuration, null, 4));
};
