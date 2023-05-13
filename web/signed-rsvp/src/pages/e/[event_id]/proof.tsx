import { DisconnectButton } from '@/components/DisconnectButton';
import { useEventData } from '@/hooks/useEventData';
import { motion } from 'framer-motion';
import { Router, useRouter } from 'next/router';
import { FaUserCircle } from 'react-icons/fa';
import { useDisconnect } from 'wagmi';

const ProofOfPersonhood = () => {
    const { data: event } = useEventData();
    const router = useRouter();
    const { event_id } = router.query;

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
            <button className="rsvpbtn">Verify</button>
            <DisconnectButton />
        </motion.div>
    );
};

export default ProofOfPersonhood;
