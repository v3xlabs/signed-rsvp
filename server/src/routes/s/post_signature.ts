import { RouteHandler } from 'fastify';
import { generateSunflake } from 'sunflake';
import { verifyMessage } from 'viem';

import { saveSignature } from '../../database';

const generateSnowflake = generateSunflake();

export const post_signature: RouteHandler<{
    Body: {
        address: string;
        signature: string;
        payload: string;
        sr_id?: string;
    };
}> = async (request, reply) => {
    // Verify signature w payload
    const state = await verifyMessage({
        address: request.body.address as `0x${string}`,
        signature: request.body.signature as `0x${string}`,
        message: request.body.payload,
    });

    if (!state) {
        return reply.status(400).send();
    }

    const signature_id = generateSnowflake(); // TODO: Generate a signature id

    // Save SignaturesignatureStorage
    saveSignature({
        id: signature_id,
        address: request.body.address,
        signature: request.body.signature,
        payload: request.body.payload,
        sr_id: request.body.sr_id,
    });

    return reply.status(200).send({ id: signature_id });
};
