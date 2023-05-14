import { RouteHandler } from 'fastify';
import { generateSunflake } from 'sunflake';
import { verifyMessage } from 'viem';

import { getEvent, saveSignature } from '../../database';
import { SignatureData } from '../../types/signature_data';
import { logger } from '../../utils/logger';

const generateSnowflake = generateSunflake();

export const post_event: RouteHandler<{
    Body: {
        address: string;
        signature: string;
        payload: string;
        // Optional if enabled for event
        worldcoin?: string;
    };
    Params: {
        event_id: string;
    };
}> = async (request, reply) => {
    const { address, payload, signature, worldcoin } = request.body;
    const { event_id } = request.params;

    const eventData = getEvent(event_id);

    if (!eventData) {
        return reply.status(404).send({ error: 'Event not found' });
    }

    if (!!eventData.worldcoin_state != !!worldcoin) {
        return reply.status(400).send({ error: 'Invalid worldcoin state' });
    }

    if (eventData.worldcoin_state) {
        const worldcoinState = JSON.parse(worldcoin) as {
            credential_type: 'orb' | 'phone';
            merke_root: string;
            nullifier_hash: string;
            proof: string;
            signal: string;
        };

        const response = await fetch(
            'https://developer.worldcoin.org/api/v1/verify/app_f5478af5a1f1e3a769b30b95e7cf0aa3',
            {
                body: JSON.stringify({
                    action: 'verify-' + event_id,
                    signal: worldcoinState.signal,
                    credential_type: worldcoinState.credential_type,
                    merkle_root: worldcoinState.merke_root,
                    nullifier_hash: worldcoinState.nullifier_hash,
                    proof: worldcoinState.proof,
                }),
            }
        );

        // TODO: use
        logger.debug(response);
    }

    if (payload !== eventData.payload.replace('{name}', address)) {
        return reply.status(400).send({ error: 'Invalid payload' });
    }

    const verifySignature = await verifyMessage({
        address: address as any, // TYPES AHHHHHH
        message: payload,
        signature: signature as any,
    });

    if (!verifySignature) {
        return reply.status(400).send({ error: 'Invalid signature' });
    }

    const data = {
        address,
        payload,
        id: generateSnowflake(),
        signature,
    } as SignatureData;

    saveSignature(data);

    return reply.status(200).send({ id: data.id });
};
