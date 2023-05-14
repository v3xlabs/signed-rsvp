import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';

import { useEventData } from '@/hooks/useEventData';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    const { data: event } = useEventData();
    const router = useRouter();
    const { event_id } = router.query;

    if (!event)
        return (
            <div className="h-screen w-screen items-center flex justify-center">
                <div className="text-2xl">
                    loading
                    <span
                        className="animate-pulse
                    "
                    >
                        ...
                    </span>
                </div>
            </div>
        );

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <a
                href={`/e/${event_id}`}
                className="flex justify-center items-center px-10 py-4"
            >
                <img
                    src={event.image}
                    alt="logo"
                    className="w-44 mb-6 focus:outline-none"
                />
            </a>
            <div className="max-w-md w-full md:px-0 px-6 text-lg">
                <AnimatePresence>{children}</AnimatePresence>
            </div>
            <div className="absolute bottom-0 right-0 items-center pb-2 pr-2">
                <div>
                    <span className="text-gray-500 text-sm mr-2">
                        Made with 💕 by{' '}
                        <a
                            className="hover:underline hover:cursor-pointer"
                            href="https://twitter.com/AnaArsonist"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Ana
                        </a>{' '}
                        and{' '}
                        <a
                            className="hover:underline hover:cursor-pointer"
                            href="https://twitter.com/LucemansNL"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Luc
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};
