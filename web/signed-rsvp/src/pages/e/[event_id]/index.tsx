import { useRouter } from 'next/router';
import Image from 'next/image';
import { ConnectKitButton } from 'connectkit';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

const event = () => {
    const router = useRouter();
    const { event_id } = router.query;

    const { isConnected } = useAccount();
    const { push } = useRouter();
    useEffect(() => {
        if (isConnected) {
            push(`/e/${event_id}/proof`);
        }
    }, [isConnected]);

    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex-col items-center justify-center flex">
                <h1 className="text-4xl font-bold">Ronnie wants your RSVP</h1>
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
        </div>
    );
};

export default event;
