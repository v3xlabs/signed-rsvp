import { RouteHandler } from 'fastify';

import { getSignatureRequest } from '../../database';

export const get_sr: RouteHandler<{
    Params: { signreq_id: string };
}> = async (request, reply) => {
    const signatureRequestData = getSignatureRequest(request.params.signreq_id);

    if (!signatureRequestData) {
        return reply.status(404).send();
    }

    return reply.send(signatureRequestData);
};
