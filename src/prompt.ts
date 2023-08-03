import { Configuration, OpenAIApi } from "openai";
import { getApiKey } from "./configuration";
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

    const configuration = new Configuration({ apiKey });

    const openai = new OpenAIApi(configuration);

    spinner.text = "Generating command...";
    try {
        const command = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-16k-0613",
            messages: [
                {
                    role: "user",
                    content: `Topic: command line tool. Length: 1 line. Task: Give only the shell command for ${prompt}`,
                },
            ],
        });
        if (command.data.choices[0]?.message != null) {
            return command.data.choices[0].message.content;
        }
    } catch (error: any) {
        throw new Error(error.response.data.error.message);
    } finally {
        spinner.stop();
    }
};
export default getCommand;
