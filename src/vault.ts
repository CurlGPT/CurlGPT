import axios from "axios";

interface Configuration {
    trial: boolean;
    limit: number;
    vaultUrl: string;
    vaultNamespace: string;
    vaultRoleId: string;
    vaultSecretId: string;
}
async function getVaultSecrets(configuration: Configuration): Promise<string> {
    const { vaultUrl, vaultNamespace, vaultRoleId, vaultSecretId } =
        configuration;
    try {
        const authResponse = await axios.post(
            `${vaultUrl}/v1/auth/approle/login`,
            { role_id: vaultRoleId, secret_id: vaultSecretId },
            {
                headers: {
                    "X-Vault-Namespace": vaultNamespace,
                },
            }
        );

        const vaultToken = authResponse.data.auth.client_token;

        const secretResponse = await axios.get(
            `${vaultUrl}/v1/secret/data/sample-secret`,
            {
                headers: {
                    "X-Vault-Namespace": vaultNamespace,
                    "X-Vault-Token": vaultToken,
                },
            }
        );

        const apiKey = secretResponse.data.data.data.apiKey;

        return apiKey;
    } catch (error: any) {
        throw new Error(`Error retrieving API Key: ${error.message}`);
    }
}

export default getVaultSecrets;
