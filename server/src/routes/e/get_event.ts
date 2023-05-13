import { RouteHandler } from 'fastify';

type Event = {
    text: string;
    post_text: string;
    image: string;
    worldcoin_state?: string;
    payload: string;
};

export const get_event: RouteHandler<{
    Params: { event_id: string };
}> = async (request, reply) => {
    reply.send({
        text: 'ronnie wants ur rsvp',
        image: '/ronnie.png',
        payload:
            'I, {name}, solemly pinky promise I will come to rAave in Lisbon 23',
        post_text: 'Ron E cnt w8 2 C U there!',
        worldcoin_state: '12356789',
    } as Event);
};
