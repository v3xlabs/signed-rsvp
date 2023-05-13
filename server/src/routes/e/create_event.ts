import { RouteHandler } from "fastify";

export const create_event: RouteHandler<{}> = async (request, reply) => {
    return { hello: 'world' };
};
