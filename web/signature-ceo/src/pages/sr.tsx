import { ConnectKitButton } from 'connectkit';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

const genPayload = (text: string) => `---- SIGNATURE CEO ----\n${text}`;

const SignPageComp: FC<{ payload: string }> = ({ payload }) => {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const navigate = useNavigate();
    const { signMessage, isLoading } = useSignMessage({
        message: genPayload(payload),
        onSuccess: async (signature) => {
            const response = await fetch('https://api.signature.ceo/s', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    signature,
                    payload: genPayload(payload),
                    address,
                }),
            });

            if (response.status !== 200) {
                alert('Something went wrong, please try again later');

                return;
            }

            const { id } = await response.json();

            navigate(`/${id}`);
        },
    });

    return (
        <div className="flex flex-col gap-4">
            <div className="text-gray-300 p-4">
                Your signature for the following message has been requested.
                This signature will be stored and can be retrieved by the link
                that follows.
            </div>
            <textarea
                className="w-full p-4 outline-0 focus-within:border focus-within:border-blue-500"
                value={payload}
                readOnly
                rows={8}
            />
            {/* <button>Include current date & time</button> */}
            {isConnected && (
                <div className="text-sm">
                    You're signing this as {address}.{' '}
                    <button onClick={() => disconnect()}>
                        Use a different wallet
                    </button>
                </div>
            )}
            {!isConnected ? (
                <ConnectKitButton.Custom>
                    {({ show }) => (
                        <button className="btn w-full" onClick={show}>
                            Connect
                        </button>
                    )}
                </ConnectKitButton.Custom>
            ) : (
                <button
                    className="btn w-full"
                    onClick={() => {
                        signMessage();
                    }}
                >
                    {isLoading ? 'Check your wallet...' : 'Sign'}
                </button>
            )}
        </div>
    );
};

export const SignatureRequestPage: FC = () => {
    const { signature_id } = useParams();
    const { data } = useSWR<{
        id: string;
        payload: string;
    }>(
        signature_id
            ? 'https://api.signature.ceo/sr/' + signature_id
            : undefined,
        fetcher,
        {
            suspense: true,
        }
    );

    if (!data) {
        return (
            <div>
                <div className="text-2xl font-bold">
                    🤷 Couldnt find a `sign` of this one 😏
                </div>
            </div>
        );
    }

    return <SignPageComp payload={data.payload} />;
};
