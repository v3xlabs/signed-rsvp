// You are going to laugh, I know, but I was too lazy to setup an actual database, so have this instead.

import { Event } from './types/event';

const events: Event[] = [
    {
        id: '123456789',
        text: 'ronnie wants ur rsvp',
        image: '/ronnie.png',
        payload:
            'I, {name}, solemly pinky promise I will come to rAave in Lisbon 23',
        post_text: 'Ron E cnt w8 2 C U there!',
        worldcoin_state: '12356789',
    },
];

export const getEvent = (event_id: string): Event => {
    return events.find((event) => event.id === event_id);
};
