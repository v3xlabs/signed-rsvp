import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

const client = createClient(
    getDefaultClient({
        appName: 'Signature CEO',
    })
);

export const Document = () => {
    return (
        <WagmiConfig client={client}>
            <ConnectKitProvider theme="minimal" mode="light">
                <h1>you lost the game.</h1>
            </ConnectKitProvider>
        </WagmiConfig>
    );
}