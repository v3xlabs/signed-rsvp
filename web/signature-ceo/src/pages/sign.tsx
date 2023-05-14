import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useSignMessage } from 'wagmi';

import { Engine } from '@/components/engine';

const genPayload = (text: string) => `---- SIGNATURE CEO ----\n${text}`;

export const SelfSignPage = () => {
    const [text, setText] = useState('');
    const { address } = useAccount();
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
            <textarea
                className="w-full p-4 outline-0 focus-within:border focus-within:border-blue-500"
                onChange={(v) => {
                    setText(v.target.value);
                }}
                rows={8}
            />
            <button
                className="btn w-full"
                onClick={() => {
                    signMessage();
                }}
            >
                {isLoading ? 'Check your wallet...' : 'Sign'}
            </button>
        </Engine>
    );
};
