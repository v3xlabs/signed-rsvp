import { ConnectKitButton } from 'connectkit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import { Engine } from '@/components/engine';

const genPayload = (text: string) => `---- SIGNATURE CEO ----\n${text}`;

export const SelfSignPage = () => {
    const [text, setText] = useState('');
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const navigate = useNavigate();
    const { signMessage, isLoading } = useSignMessage({
        message: genPayload(text),
        onSuccess: async (signature) => {
            const response = await fetch('https://api.signature.ceo/s', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    signature,
                    payload: genPayload(text),
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
        <Engine>
            <div className="flex flex-col gap-4">
                <div className="text-gray-300 p-4">
                    This message you write below will be the message signed by{' '}
                    <b>you</b> after clicking the `connect` / `sign` button you
                    will receive a sharable-link you can use to distribute your
                    signature.
                </div>
                <textarea
                    className="w-full p-4 outline-0 focus-within:border focus-within:border-blue-500"
                    onChange={(v) => {
                        setText(v.target.value);
                    }}
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
                        disabled={text.trim().length === 0}
                    >
                        {isLoading ? 'Check your wallet...' : 'Sign'}
                    </button>
                )}
            </div>
        </Engine>
    );
};
