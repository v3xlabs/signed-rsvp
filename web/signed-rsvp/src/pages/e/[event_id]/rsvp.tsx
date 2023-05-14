import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount, useEnsName, useSignMessage } from 'wagmi';

import { DisconnectButton } from '@/components/DisconnectButton';
import { useEventData } from '@/hooks/useEventData';

const RSVP = () => {
    const { data: event } = useEventData();
    const router = useRouter();

    const { address } = useAccount();
    const { data: ensName } = useEnsName({ address });

    const { event_id } = router.query;

    const { isConnected } = useAccount();

    useEffect(() => {
        if (!isConnected) {
            router.push(`/e/${event_id}`);
        }
    }, [isConnected]);

    const { signMessage, isLoading } = useSignMessage({
        message: event.payload.replace('{name}', address),
        async onSuccess(data) {
            // alert(data);
            const d = await fetch('https://api.signature.ceo/e/' + event.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: address,
                    signature: data,
                    payload: event.payload.replace('{name}', address),
                    worldcoin: localStorage.getItem(`worldcoin-${event.id}`),
                }),
            });

            if (d.status !== 200) {
                alert('Error: ' + (await d.text()));

                return;
            }

            const { id } = await d.json();

            localStorage.setItem(`receipt-${event.id}`, id);

            router.push('/e/' + event.id + '/confirmation');
        },
    });

    return (
        <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{
                duration: 0.5,
                type: 'spring',
                stiffness: 260,
                damping: 20,
            }}
            className="flex justify-center items-center flex-col"
        >
            <div className="flex-col items-center flex">
                <h1 className="text-4xl font-bold">rAAVE Lisbon II</h1>
                <div className="mt-4 text-base flex border-[1px] border-black p-4 w-full text-gray-700 flex-col">
                    <div>
                        {event.payload
                            .split('{name}')
                            .reduce(
                                (c, entry, index, a) => [
                                    ...c,
                                    entry,
                                    index != a.length - 1 ? (
                                        <b>{ensName || address}</b>
                                    ) : undefined,
                                ],
                                []
                            )}
                    </div>
                    <div className="mt-5 text-sm justify-end text-end text-gray-400 flex">
                        RSVP provided by{' '}
                        <a
                            className="underline ml-1"
                            href="https://signature.ceo"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {' '}
                            signature.ceo
                        </a>
                    </div>
                </div>
                <div className="mt-4 text-base flex">Date and Time</div>
                <div className="text-sm text-gray-400 text-left">
                    May 14 · 6pm - May 15 · 2am WEST
                </div>
                <button className="rsvpbtn" onClick={() => signMessage()}>
                    {isLoading ? 'Check your wallet...' : 'RSVP'}
                </button>
            </div>
            <DisconnectButton />
        </motion.div>
    );
};

export default RSVP;
