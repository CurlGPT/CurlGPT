import { Configuration, OpenAIApi } from "openai";
import { getApiKey } from "./configuration";

const getCommand = async (prompt: string) => {
    let apiKey;
    try {
        apiKey = await getApiKey();
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
    if (command.data.choices[0]?.message != null) {
        return command.data.choices[0].message.content;
    }
};
export default getCommand;
