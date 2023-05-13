import { RouteHandler } from 'fastify';

import { getEvent } from '../../database';

export const get_event: RouteHandler<{
    Params: { event_id: string };
}> = async (request, reply) => {
    const event = getEvent(request.params.event_id);

    reply.send(event);
};
