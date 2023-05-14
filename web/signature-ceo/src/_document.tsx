import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createClient, WagmiConfig } from 'wagmi';

import { Layout } from './components/layout';
import { HomePage } from './pages';
import { ReceiptPage } from './pages/receipt';
import { SelfSignPage } from './pages/sign';

const client = createClient(
    getDefaultClient({
        appName: 'Signature CEO',
    })
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/s',
                element: <SelfSignPage />,
            },
            {
                path: '/:signature_id',
                element: <ReceiptPage />,
            },
        ],
    },
]);

export const Document = () => {
    return (
        <WagmiConfig client={client}>
            <ConnectKitProvider theme="auto" mode="dark">
                <RouterProvider router={router} />
            </ConnectKitProvider>
        </WagmiConfig>
    );
};
