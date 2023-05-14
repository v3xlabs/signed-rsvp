import { solidityEncode } from '@worldcoin/idkit';
import { RouteHandler } from 'fastify';
import { generateSunflake } from 'sunflake';
import { verifyMessage } from 'viem';

import {
    getEvent,
    isNullifierStruck,
    saveSignature,
    strikeNullifier,
} from '../../database';
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
            merkle_root: string;
            nullifier_hash: string;
            proof: string;
            signal: {
                types: string[];
                values: string[];
            };
        };

        if (isNullifierStruck(event_id, worldcoinState.nullifier_hash)) {
            return reply.status(400).send({ error: 'Nullifier already used' });
        }

        if (
            worldcoinState.signal.types[0] !== 'uint256' ||
            worldcoinState.signal.values[0] !== event_id
        ) {
            return reply.status(400).send({ error: 'Invalid signal data' });
        }

        const response = await fetch(
            'https://developer.worldcoin.org/api/v1/verify/app_f5478af5a1f1e3a769b30b95e7cf0aa3',
            {
                method: 'POST',
                body: JSON.stringify({
                    action: 'verify-' + event_id,
                    signal: solidityEncode(
                        worldcoinState.signal.types,
                        worldcoinState.signal.values
                    ),
                    credential_type: worldcoinState.credential_type,
                    merkle_root: worldcoinState.merkle_root,
                    nullifier_hash: worldcoinState.nullifier_hash,
                    proof: worldcoinState.proof,
                }),
            }
        );

        const data = (await response.json()) as {
            success: boolean;
            nullifier_hash: string;
            action: string;
            created_at: string;
        };

        // TODO: Introduce nicer error handling
        // if (!data || !data.success) {
        //     logger.debug(data);

        //     return reply
        //         .status(400)
        //         .send({ error: 'Invalid worldcoin state post' });
        // }

        strikeNullifier(event_id, data.nullifier_hash);
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
