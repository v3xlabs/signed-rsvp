import { DisconnectButton } from '@/components/DisconnectButton';
import { useEventData } from '@/hooks/useEventData';
import { useRouter } from 'next/router';
import { useAccount, useEnsName } from 'wagmi';
import { usePreferredName } from 'ens-tools/dist/react';

const RSVP = () => {
    const { data: event } = useEventData();
    const router = useRouter();

    const { address } = useAccount();
    const { data: ensName } = useEnsName({ address });

    return (
        <div className="flex justify-center items-center flex-col">
            <div className="flex-col items-center flex">
                <h1 className="text-4xl font-bold">rAAVE Lisbon II</h1>
                <div className="mt-4 text-base flex border-[1px] border-black p-4 w-full text-gray-700 flex-col">
                    <div>
                        {event.payload
                            .split('{name}')
                            .reduce(
                                (c, e, i, a) => [
                                    ...c,
                                    e,
                                    i != a.length - 1 ? (
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
                <button className="rsvpbtn">RSVP</button>
            </div>
            <DisconnectButton />
        </div>
    );
};

export default RSVP;
