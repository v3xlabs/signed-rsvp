import cors from '@fastify/cors';
import { fastify } from 'fastify';

import { create_event } from './routes/e/create_event';
import { get_event } from './routes/e/get_event';
import { post_event } from './routes/e/post_event';
import { get_signature } from './routes/s/get_signature';
import { post_signature } from './routes/s/post_signature';
import { create_sr } from './routes/sr/create_sr';
import { get_sr } from './routes/sr/get_sr';

export const bootstrapServer = () => {
    const server = fastify({ logger: true });

    server.register(cors, {
        origin: '*',
    });

    server.get('/', (request, response) => {
        response.send('Hello World!');
    });

    server.register(
        (s, c, done) => {
            // Submit a signature and payload directly to the server
            s.post('/', post_signature);

            // Get the information associated with a signature and its payload
            s.get('/:signature_id', get_signature);

            done();
        },
        { prefix: '/s' }
    );

    server.register(
        (s, c, done) => {
            // Get the information associated with a signature request and its payload
            s.get('/:signreq_id', get_sr);

            // Submit a signature to a specific signature request
            // @deprecated in favor of POST /s
            // s.post('/:signreq_id', post_sr);

            // Create a signature request
            s.post('/', create_sr);

            done();
        },
        { prefix: '/sr' }
    );

    server.register(
        (s, c, done) => {
            // Get the information associated with an event
            s.get('/:event_id', get_event);

            // Submit a signature to a specific event
            s.post('/:event_id', post_event);

            // Create an event
            s.post('/', create_event);

            done();
        },
        { prefix: '/e' }
    );

    return server;
};
