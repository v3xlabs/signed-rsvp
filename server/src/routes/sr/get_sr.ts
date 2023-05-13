import { RouteHandler } from 'fastify';

export const get_sr: RouteHandler<{}> = async (request, reply) => {
    return { hello: 'world' };
};
