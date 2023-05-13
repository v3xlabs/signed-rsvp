import { bootstrapServer } from './server';
import { logger } from './utils/logger';

// Creates the server
const server = bootstrapServer();

// Start our server on port 1234
server.listen({ port: 1234 });

// Log that we are running
logger.info('Server running on port 1234');
