import { RouteHandler } from "fastify";

export const post_event: RouteHandler<{}> = async (request, reply) => {
    return { hello: 'world' };
};