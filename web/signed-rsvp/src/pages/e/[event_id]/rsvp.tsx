import Image from 'next/image';

const RSVP = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center flex-col">
            <img
                src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F508079689%2F1035805787843%2F1%2Foriginal.20230504-225619?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C3004%2C1502&s=0a4c131de7714638041b2c688015f66b"
                alt="joe"
                className="w-[800px] object-cover"
            />
            <div className="flex-col items-center flex">
                <h1 className="text-4xl font-bold">rAAVE Lisbon II</h1>
                <div className="mt-4 text-base flex">Data and Time</div>
                <div className="text-sm text-gray-400 text-left">
                    May 14 · 6pm - May 15 · 2am WEST
                </div>
                <button className="rsvpbtn">RSVP</button>
            </div>
        </div>
    );
};

export default RSVP;
