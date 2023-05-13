import { bootstrapServer } from './server';
import { logger } from './utils/logger';

// Creates the server
const server = bootstrapServer();

const rn = async () => {
    // Start our server on port 1234
    await server.listen({ port: 1234, host: '0.0.0.0' });
};

rn();

// Log that we are running
logger.info('Server running on port 1234');
