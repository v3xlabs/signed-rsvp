import { DisconnectButton } from '@/components/DisconnectButton';
import Image from 'next/image';

const RSVP = () => {
    return (
        <div className="flex justify-center items-center flex-col">
            <div className="flex-col items-center flex">
                <h1 className="text-4xl font-bold">rAAVE Lisbon II</h1>
                <div className="mt-4 text-base flex border-[1px] border-black p-4 w-full text-gray-700 flex-col">
                    By signing this message, you are pinky promising that you
                    will attend this event.
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
