import { AnimatePresence } from 'framer-motion';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Logo } from './logo';

export const Layout: FC = () => {
    return (
        <div className="bg-[#121212] text-white w-full min-h-screen flex">
            <div className="mt-4 md:mt-48 flex items-center flex-col w-full">
                <Logo />
                <div className="w-full max-w-xl mx-auto md:px-0 px-6">
                    <AnimatePresence>
                        <Outlet />
                    </AnimatePresence>
                </div>
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
