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
export class TrialAlreadyActivatedError extends Error {
    constructor(limit: number) {
        const message = `Your trial version has already been activated. You are left with ${limit} free prompts`;
        super(message);
    }
}
export class InvalidAPIKeyError extends Error {
    constructor() {
        const message = "Invalid Api Key";
        super(message);
    }
}
export class TrialLimitExceededError extends Error {
    constructor() {
        const message =
            "Free trial limit exceeded. Please upgrade your subscription to continue CurlGPT";
        super(message);
    }
}
export class APIKeyRetrievalError extends Error {
    constructor() {
        const message = "Unable to reach the server";
        super(message);
    }
}
