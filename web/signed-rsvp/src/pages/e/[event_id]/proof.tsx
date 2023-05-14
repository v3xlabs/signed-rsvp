import { DisconnectButton } from '@/components/DisconnectButton';
import { useEventData } from '@/hooks/useEventData';
import { motion } from 'framer-motion';
import { Router, useRouter } from 'next/router';
import { FaUserCircle } from 'react-icons/fa';
import type { ISuccessResult } from '@worldcoin/idkit';
import dynamic from 'next/dynamic';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';

const IDKitWidget = dynamic(
    () => import('@worldcoin/idkit').then((mod) => mod.IDKitWidget),
    { ssr: false }
);

const ProofOfPersonhood = () => {
    const { data: event } = useEventData();
    const router = useRouter();
    const { event_id } = router.query;

    const { isConnected } = useAccount();
    useEffect(() => {
        if (!isConnected) {
            router.push(`/e/${event_id}`);
        }
    }, [isConnected]);

    const onSuccess = (result: ISuccessResult) => {
        // Yes miguel, we did console log it :tongue:
        console.log(result);

        // JK we are actually saving this and using it later
        localStorage.setItem('worldcoin-' + event_id, JSON.stringify(result));

        router.push('/e/' + event_id + '/rsvp');
    };

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
            className="h-full w-full flex-col items-center justify-center flex"
        >
            <h1 className="text-4xl font-bold">{event.text}</h1>
            <div className="mt-4 text-base flex items-center">
                This event requires Proof of Personhood
                <FaUserCircle className="ml-2" />
            </div>
            <IDKitWidget
                action="verify"
                app_id="app_f5478af5a1f1e3a769b30b95e7cf0aa3"
                autoClose
                onSuccess={onSuccess}
                signal=""
            >
                {({ open }) => (
                    <button className="rsvpbtn" onClick={open}>
                        Verify
                    </button>
                )}
            </IDKitWidget>
            <DisconnectButton />
        </motion.div>
    );
};

export default ProofOfPersonhood;
