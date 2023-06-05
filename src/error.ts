import chalk from "chalk";

export const ApiKeyNotFoundError = () =>
    new Error(
        `Openai's Api Key is not found. Please create an API Key from ${chalk.underline(
            "https://platform.openai.com/"
        )}\nSet the API Key with the command ${chalk.bold(
            `curlgpt --set-apiKey <apiKey>`
        )}`
    );

export const TrialAlreadyActivatedError = (limit: number) =>
    new Error(
        `Your trial version has already been activated. You are left with ${limit} free prompts`
    );

export const InvalidAPIKeyError = () => new Error("Invalid Api Key");

export const TrialLimitExceededError = () =>
    new Error(
        "Free trial limit exceeded. Please upgrade your subscription to continue CurlGPT"
    );
export const APIKeyRetrievalError = () =>
    new Error(`Unable to reach the server.`);
