import { FaUserCircle } from 'react-icons/fa';

const ProofOfPersonhood = () => {
    return (
        <div className="h-full w-full flex-col items-center justify-center flex">
            <h1 className="text-4xl font-bold">Ronnie wants your RSVP</h1>
            <div className="mt-4 text-base flex items-center">
                This event requires Proof of Personhood
                <FaUserCircle className="ml-2" />
            </div>
            <button className="rsvpbtn">Verify</button>
        </div>
    );
};

export default ProofOfPersonhood;
