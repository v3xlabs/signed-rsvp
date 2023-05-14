import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

type EventData = {
    id: string;
    title: string;
    date: string;
    text: string;
    post_text: string;
    image: string;
    worldcoin_state?: string;
    payload: string;
};

export const useEventData = () => {
    const { query } = useRouter();
    const { event_id } = query;

    return useSWR<EventData>(
        // eslint-disable-next-line unicorn/no-null
        event_id === null ? null : `https://api.signature.ceo/e/${event_id}`,
        fetcher
    );
};
