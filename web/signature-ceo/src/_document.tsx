import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createClient, WagmiConfig } from 'wagmi';

import { Layout } from './components/layout';
import { HomePage } from './pages';
import { ReceiptPage } from './pages/receipt';
import { SelfSignPage } from './pages/sign';
import { WritePage } from './pages/write';
import { SignatureRequestPage } from './pages/sr';

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
                path: '/sr/:signature_id',
                element: <SignatureRequestPage />,
            },
            {
                path: '/sr',
                element: <WritePage />,
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
