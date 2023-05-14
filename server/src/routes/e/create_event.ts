import { RouteHandler } from 'fastify';
import { generateSunflake } from 'sunflake';

import { saveEvent } from '../../database';

const generateSnowflake = generateSunflake();

export const create_event: RouteHandler<{
    Body: {
        text: string;
        date: string;
        title: string;
        post_text: string;
        image: string;
        worldcoin_state?: string;
        payload: string;
    };
}> = async (request, reply) => {
    const event_id = generateSnowflake(); // TODO: Generate a signature id

    // Save Event
    saveEvent({
        id: event_id,
        date: request.body.date,
        title: request.body.title,
        text: request.body.text,
        post_text: request.body.post_text,
        image: request.body.image,
        worldcoin_state: request.body.worldcoin_state,
        payload: request.body.payload,
    });

    return reply.status(200).send({ id: event_id });
};
