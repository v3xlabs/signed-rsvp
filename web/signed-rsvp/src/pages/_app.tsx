import 'tailwindcss/tailwind.css';
import '@/styles/styles.css';

import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { Nunito } from 'next/font/google';
import { useRouter } from 'next/router';
import { createClient, mainnet, WagmiConfig } from 'wagmi';

import { Layout } from '@/components/layout';

const client = createClient(
    getDefaultClient({
        appName: 'Signed RSVP',
        chains: [mainnet],
    })
);

const nunito = Nunito({
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

const App = ({ Component, pageProps }) => {
    const { pathname } = useRouter();

    // eslint-disable-next-line no-undef
    if (pathname === '/')
        return (
            <div className={nunito.className}>
                <Component {...pageProps} />
            </div>
        );

    return (
        <WagmiConfig client={client}>
            <ConnectKitProvider theme="minimal" mode="light">
                <div className={[nunito.className, 'w-full'].join(' ')}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </div>
            </ConnectKitProvider>
        </WagmiConfig>
    );
};

export default App;
