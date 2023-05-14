import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Engine } from '@/components/engine';

export const WritePage = () => {
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const onClick = useCallback(async () => {
        const v = await fetch('https://api.signature.ceo/sr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                payload: text,
            }),
        });

        if (v.status !== 200) {
            alert('Something went wrong, please try again later');

            return;
        }

        const { id } = await v.json();

        navigate(`/sr/${id}`);
    }, [text]);

    return (
        <Engine>
            <div className="flex flex-col gap-4">
                <div className="text-gray-300 p-4">
                    This message you write below will be the message signed by{' '}
                    <b>the other person</b> after clicking the `collect
                    signature(s)` button you will receive a sharable-link you
                    can use to obtain signatures.
                </div>
                <textarea
                    className="w-full p-4 outline-0 focus-within:border focus-within:border-blue-500"
                    onChange={(v) => {
                        setText(v.target.value);
                    }}
                    rows={8}
                />
            </div>
            <button
                className="btn w-full"
                disabled={text.trim().length === 0}
                onClick={onClick}
            >
                Collect signature(s)
            </button>
            {/* <button>Include current date & time</button> */}
        </Engine>
    );
};
