import { RouteHandler } from "fastify";

export const create_sr: RouteHandler<{}> = async (request, reply) => {
    return { hello: 'world' };
};
