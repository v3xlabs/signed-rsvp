import { CredentialType, ISuccessResult } from '@worldcoin/idkit';
import { solidityEncode } from '@worldcoin/idkit';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useAccount } from 'wagmi';

import { DisconnectButton } from '@/components/DisconnectButton';
import { useEventData } from '@/hooks/useEventData';

const IDKitWidget = dynamic(
    () => import('@worldcoin/idkit').then((module_) => module_.IDKitWidget),
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
        localStorage.setItem(
            'worldcoin-' + event_id,
            JSON.stringify({
                ...result,
                signal: solidityEncode(['uint256'], [event_id]),
            })
        );

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
                app_id="app_f5478af5a1f1e3a769b30b95e7cf0aa3"
                action={'verify-' + event.id}
                autoClose
                onSuccess={onSuccess}
                signal={solidityEncode(['uint256'], [event_id])}
                action_description="Verify your identity to RSVP for this event."
                credential_types={[CredentialType.Orb, CredentialType.Phone]}
                enableTelemetry={false}
                theme="light"
            >
                {({ open }) => (
                    <button className="rsvpbtn" onClick={() => open()}>
                        Verify
                    </button>
                )}
            </IDKitWidget>
            <DisconnectButton />
        </motion.div>
    );
};

export default ProofOfPersonhood;
