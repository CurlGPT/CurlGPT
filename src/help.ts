import chalk from "chalk";

const helpMessage = `
${chalk.bgMagenta.bold(`
===============================================================
        CurlGPT - ChatGPT in your favourite terminal 🤖        
===============================================================`)}

Usage: curlgpt ${chalk.green("[prompt]")} / ${chalk.yellow("[option]")}

${chalk.green("📝 Prompt")} - Enter the prompt for which the command is needed.

Example:
🚀 Input:   curlgpt ${chalk.green("how to run a postgres container in local")}
💻 Output: ${chalk.magenta(
    " docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres"
)}


${chalk.yellow("Options:")}
       
    📌 -v, --version               Print the CurlGPT version
    ❓ -h, --help                  Get help
    🧪 -t, --trial                 Set up a trial with up to 30 prompts for free
    🔑 -s, --set-apiKey <apiKey>   Set Openai's Api Key
    💭 -f, --feedback              Get the feeback link

Please feel free to leave a ⭐️ on the Github repository(${chalk.blue.underline(
    "https://github.com/CurlGPT/CurlGPT"
)}) if you appreciated CurlGPT.
`;

export default helpMessage;
