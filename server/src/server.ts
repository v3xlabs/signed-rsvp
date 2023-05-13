import { fastify } from 'fastify';

export const bootstrapServer = () => {
    const server = fastify({ logger: true });

    server.get('/', async () => {
        return { hello: 'world' };
    });

    return server;
};
