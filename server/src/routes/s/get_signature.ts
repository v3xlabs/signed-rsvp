import { RouteHandler } from "fastify";

export const get_signature: RouteHandler<{}> = async (request, reply) => {
    return { hello: 'world' };
};
