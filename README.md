<h1 align="center">CurlGPT 👋</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Latest%20Version-0.4.1-brightgreen" alt="Latest Version">
</p>

<p align="center">CurlGPT is a command-line tool that brings the power of OpenAI's ChatGPT to your favorite terminal. It allows you to type the prompt and the command line will output the proper command. 💬🚀</p>

<video width="640" height="380" controls>
  <source src="https://github.com/CurlGPT/CurlGPT/assets/74011196/888fc421-f1d2-49f2-8a45-1fe2e43dcdbd.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Features ✨

-   Get the command for the specified prompt ChatGPT on your terminal.
-   Get accurate command for the prompt
-   Auto Copy the outputted command to clipboard
-   Easy-to-use command-line interface
-   Support for setting an API key for accessing OpenAI's API 🔑

## Installation 🛠️

1. Make sure you have Node.js installed on your system.
2. Run the following command to install CurlGPT globally:

    ```shell
    npm install -g curlgpt
    ```

## Usage 🚀

1. Create an [OpenAI's API Key](https://platform.openai.com) if you have not already created it.
2. Set your OpenAI API key using the **--set-apiKey** option:

    ```shell
    curlgpt --set-apiKey <your-api-key>
    ```

3. Test the CurlGPT by giving a prompt:

    ```shell
    curlgpt how to run a postgres container in local
    ```

    The tool will return appropriate response based on the provided prompt.

4. Explore additional options and commands using the built-in help:

    ```shell
    curlgpt --help
    ```

## Contributing 🤝

Contributions are welcome! If you find a bug, have a feature request, or want to contribute code, please open an issue or submit a pull request to the GitHub repository.

### Local Development 👨‍💻

1. Fork the [repository](https://github.com/CurlGPT/CurlGPT/fork) from Github
2. Clone the forked repository
    ```shell
    git clone https://github.com/<your-username>/CurlGPT.git
    ```
3. Open the clone repository in your favorite code editor
4. Install the dependencies by running the following command
    ```shell
    yarn
    ```
5. Test the tool by running the following command to print the CurlGPT version

    ```shell
        yarn start -v
    ```

> Note: you will require OpenAI's API Key to test the prompt in local

## License 📝

CurlGPT is open-source software released under the MIT License.
