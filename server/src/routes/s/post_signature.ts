import { RouteHandler } from "fastify";

export const post_signature: RouteHandler<{}> = async (request, reply) => {
    return { hello: 'world' };
};
