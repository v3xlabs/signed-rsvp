import { RouteHandler } from 'fastify';
import { generateSunflake } from 'sunflake';

import { saveSignatureRequest } from '../../database';

const generateSnowflake = generateSunflake();

export const create_sr: RouteHandler<{
    Body: {
        payload: string;
    };
}> = async (request, reply) => {
    const signatureRequest_id = generateSnowflake(); // TODO: Generate a signature id

    // Save SignaturesignatureStorage
    saveSignatureRequest({
        id: signatureRequest_id,
        payload: request.body.payload,
    });

    return reply.status(200).send({ id: signatureRequest_id });
};
