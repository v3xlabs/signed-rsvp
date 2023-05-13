import { RouteHandler } from 'fastify';

export const post_event: RouteHandler<{
    Body: {};
}> = async (request, reply) => {
    return { hello: 'world' };
};
