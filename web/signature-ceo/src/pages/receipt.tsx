import { FC, useEffect, useState } from 'react';
import { FiCheckCircle, FiLoader } from 'react-icons/fi';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { verifyMessage } from 'viem';
import { useEnsAvatar, useEnsName } from 'wagmi';

import { ShareButton } from '@/components/sharebtn';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

const Verifier: FC<{
    address: string;
    signature: string;
    payload: string;
}> = ({ address, signature, payload }) => {
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        (async () => {
            const _verified = await verifyMessage({
                address: address as any, // Screw viem types
                message: payload,
                signature: signature as any, // Screw viem types lmeow
            });

            setVerified(_verified);
        })();
    }, [address, signature, payload]);

    if (!verified) {
        return (
            <div>
                <div className="text-red-500 flex items-center gap-2">
                    <div>Not Verified</div>
                    <FiLoader className="animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="text-green-500 flex items-center gap-2">
            <div>Verified</div>
            <FiCheckCircle className="text-green-500" />
        </div>
    );
};

const PersonCard: FC<{
    address: string;
    signature: string;
    payload: string;
}> = ({ address, signature, payload }) => {
    const { data: ensName } = useEnsName({
        address: address as any,
        chainId: 1,
    });
    const { data: ensAvatar } = useEnsAvatar({
        address: address as any,
        chainId: 1,
    });

    return (
        <div className="scard bg-neutral-900 px-8 py-8">
            <div className="flex justify-between items-center">
                <div className="flex gap-4 font-bold items-center">
                    {ensAvatar && (
                        <img
                            src={ensAvatar}
                            alt={ensName || ''}
                            className="w-8 h-8 rounded-md"
                        />
                    )}
                    <span>{ensName || address}</span>
                </div>
                <Verifier
                    address={address}
                    signature={signature}
                    payload={payload}
                />
            </div>
        </div>
    );
};

export const ReceiptPage = () => {
    const { signature_id } = useParams();
    const { data } = useSWR<{
        id: string;
        signature: string;
        payload: string;
        address: string;
    }>(
        signature_id
            ? 'https://api.signature.ceo/s/' + signature_id
            : undefined,
        fetcher,
        {
            suspense: true,
        }
    );

    if (!data) {
        return (
            <div>
                <div className="text-2xl font-bold">
                    🤷 Couldnt find a `sign` of this one 😏
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="text-gray-300 p-4">
                This page is a signature receipt for the message visible below.
                If you see a green checkmark below the message your device has
                verified the signature and certified that the message was signed
                by the address/user visible below.
            </div>
            <PersonCard
                address={data.address}
                signature={data.signature}
                payload={data.payload}
            />
            <div className="card p-0 whitespace-pre overflow-hidden">
                <div className="w-full p-4 bg-blue-500 text-[#202023] font-bold">
                    Message
                </div>
                <div className="p-4 text-center italic">
                    {data.payload.replace('---- SIGNATURE CEO ----\n', '')}
                </div>
            </div>
            <div className="card p-0 overflow-hidden flex">
                <div className="p-4 bg-[#202023] text-white font-bold">
                    Signature
                </div>
                <input
                    className="p-4 bg-transparent border-0 outline-none w-full italic"
                    value={data.signature}
                />
            </div>
            <ShareButton />
        </div>
    );
};
