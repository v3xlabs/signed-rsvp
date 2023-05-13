// You are going to laugh, I know, but I was too lazy to setup an actual database, so have this instead.
// TODO: Actually hook up to a db lmeow

import { Event } from './types/event';
import { SignatureData } from './types/signature_data';
import { SignatureRequest } from './types/signature_request';

const events: Event[] = [
    {
        id: '123456789',
        text: 'ronnie wants ur rsvp',
        image: '/ronnie.png',
        payload:
            'I, {name}, solemly pinky promise I will come to rAave in Lisbon 23',
        post_text: 'Ron E cnt w8 2 C U there!',
        worldcoin_state: '12356789',
    },
];

export const getEvent = (event_id: string): Event => {
    return events.find((event) => event.id === event_id);
};

export const saveEvent = (event: Event): void => {
    events.push(event);
};

const signatureStorage: SignatureData[] = [];

export const getSignature = (signature_id: string): SignatureData => {
    return signatureStorage.find((sig) => sig.id === signature_id);
};

export const saveSignature = (signature: SignatureData): void => {
    signatureStorage.push(signature);
};

const signatureRequestStorage: SignatureRequest[] = [];

export const saveSignatureRequest = (
    signatureRequest: SignatureRequest
): void => {
    signatureRequestStorage.push(signatureRequest);
};

export const getSignatureRequest = (
    signatureRequest_id: string
): SignatureRequest => {
    return signatureRequestStorage.find((sr) => sr.id === signatureRequest_id);
};
