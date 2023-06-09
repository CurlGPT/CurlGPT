import { getApiKey } from "./configuration";
import axios from "axios";
import ora from "ora";

const getCommand = async (prompt: string) => {
    let apiKey;
    try {
        apiKey = await getApiKey();
    } catch (error) {
        throw error;
    }

    const spinner = ora("Getting API Key").start();
    spinner.spinner = "earth";

    const headers = {
        apikey: apiKey,
        "Content-Type": "application/json",
    };

    const body = { prompt };

    spinner.text = "Generating command...";

    try {
        const response = await axios.post(
            `https://curlgpt.vercel.app/api/v1/prompt`,
            body,
            { headers }
        );
        spinner.stop();
        return response.data.command;
    } catch (error: any) {
        spinner.stop();
        throw new Error(error.response.data.error);
    }
};
export default getCommand;
