import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useDisconnect } from 'wagmi';

import { useEventData } from '@/hooks/useEventData';

export const DisconnectButton = () => {
    const { disconnect } = useDisconnect();
    const { push } = useRouter();
    const { data: event } = useEventData();

    if (!event)
        return (
            <div className="h-screen w-screen items-center flex justify-center">
                <div className="text-2xl">
                    loading
                    <span
                        className="animate-pulse
                "
                    >
                        ...
                    </span>
                </div>
            </div>
        );

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.2,
                delay: 0.7,
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-xl absolute top-0 right-0 m-5"
            onClick={() => {
                disconnect();
                push('/e/' + event.id);
            }}
        >
            Disconnect Wallet
        </motion.button>
    );
};
