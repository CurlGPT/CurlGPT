import { Configuration, OpenAIApi } from "openai";
import { getApiKey } from "./config";

const getCommand = async (prompt: string) => {
    let apiKey;
    try {
        apiKey = getApiKey();
    } catch (error) {
        throw error;
    }

    const configuration = new Configuration({ apiKey });

    const openai = new OpenAIApi(configuration);

    const command = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `Topic: command line tool. Length: 1 line. Task: generate shell command on ${prompt}`,
            },
        ],
    });
    if (command.data.choices[0]?.message) {
        return command.data.choices[0].message.content;
    }
    return command.data;
};
export default getCommand;
