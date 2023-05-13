import { RouteHandler } from 'fastify';

export const post_sr: RouteHandler<{}> = async (request, reply) => {
    return { hello: 'world' };
};
