import { DisconnectButton } from '@/components/DisconnectButton';
import { motion } from 'framer-motion';

const ConfirmationPage = () => {
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
            className="items-center flex justify-center flex-col gap-y-2"
        >
            <div className="text-2xl">See you there!</div>
            <div className="text-sm">May 14 · 6pm - May 15 · 2am WEST</div>
            <DisconnectButton />
        </motion.div>
    );
};

export default ConfirmationPage;
