import { Link } from 'react-router-dom';

export const Logo = () => {
    return (
        <Link to="/">
            <h1 className="text-xl italic pb-4">
                <span>✍️ </span>
                <span className="text-blue-400 font-bold italic">
                    signature
                </span>
                <span>.</span>
                <span className="italic text-pink-500 font-bold">ceo</span>
            </h1>
        </Link>
    );
};
