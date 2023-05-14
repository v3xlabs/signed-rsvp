import { Link } from 'react-router-dom';

import { Engine } from '@/components/engine';

export const HomePage = () => {
    return (
        <Engine>
            Who is going to sign it?
            <div className="flex gap-4 flex-col md:flex-row w-full">
                <Link to="/s" className="btn w-full">
                    Let me sign
                </Link>
                <Link to="/sr" className="btn w-full">
                    Someone else gonna sign this one
                </Link>
            </div>
        </Engine>
    );
};
