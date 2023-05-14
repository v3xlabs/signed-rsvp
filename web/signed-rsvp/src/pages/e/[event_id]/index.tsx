import { ConnectKitButton } from 'connectkit';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { useEventData } from '@/hooks/useEventData';

const event = () => {
    const { data: event } = useEventData();
    const router = useRouter();
    const { event_id } = router.query;

    const { isConnected } = useAccount();

    useEffect(() => {
        if (isConnected) {
            router.push(`/e/${event_id}/proof`);
        }
    }, [isConnected]);

    if (!event) return <div>loading...</div>;

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
            className="h-full flex justify-center items-center"
        >
            <div className="flex-col items-center justify-center flex">
                <h1 className="text-4xl font-bold">{event.text}</h1>
                <div className="mt-4">
                    <ConnectKitButton.Custom>
                        {({ isConnected, show, address }) => {
                            return (
                                <button onClick={show} className="rsvpbtn">
                                    {isConnected ? address : 'Connect Wallet'}
                                </button>
                            );
                        }}
                    </ConnectKitButton.Custom>
                </div>
            </div>
        </motion.div>
    );
};

export default event;
