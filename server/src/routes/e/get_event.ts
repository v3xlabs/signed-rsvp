import { RouteHandler } from 'fastify';

export const get_event: RouteHandler<{}> = async (request, reply) => {
    return { hello: 'world' };
};
