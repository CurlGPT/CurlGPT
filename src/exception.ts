import chalk from "chalk";

export class ApiKeyNotFoundError extends Error {
    constructor() {
        const message = `Api Key is not found. Please create an API Key from ${chalk.underline(
            "https://curlgpt.vercel.app/"
        )}\nSet the API Key with the command ${chalk.bold(
            `curlgpt --set-apiKey <apiKey>`
        )}`;
        super(message);
    }
}

export class InvalidAPIKeyError extends Error {
    constructor() {
        const message = "Invalid Api Key";
        super(message);
    }
}

export class UsageLimitExceededError extends Error {
    constructor() {
        const message =
            "Usage limit exceeded. You have reached the maximum limit of 500 prompts. Please contact the administrator for further assistance";
        super(message);
    }
}
