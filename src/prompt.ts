import { getApiKey } from "./configuration";
import axios from "axios";

const getCommand = async (prompt: string) => {
    let apiKey;
    try {
        apiKey = await getApiKey();
    } catch (error) {
        throw error;
    }

    const headers = {
        apikey: apiKey,
        "Content-Type": "application/json",
    };

    const body = { prompt };
    const response = await axios.post(
        `https://curlgpt.vercel.app/api/v1/prompt`,
        body,
        { headers }
    );

    const { data } = response;
    if (data.error) throw new Error(data.error);

    return data.command;
};
export default getCommand;
