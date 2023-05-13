import { RouteHandler } from 'fastify';

import { getSignature } from '../../database';

export const get_signature: RouteHandler<{
    Params: { signature_id: string };
}> = async (request, reply) => {
    const signatureData = getSignature(request.params.signature_id);

    if (!signatureData) {
        return reply.status(404).send();
    }

    return reply.send(signatureData);
};
