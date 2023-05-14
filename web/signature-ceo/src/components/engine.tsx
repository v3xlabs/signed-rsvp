import { motion } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

export const Engine: FC<PropsWithChildren & { className?: string }> = ({
    children,
    className,
}) => (
    <motion.div
        className={['flex flex-col gap-4 items-center md:pt-4', className]
            .filter(Boolean)
            .join(' ')}
        initial={{ x: '10%', opacity: 0 }}
        animate={{ x: '0vw', opacity: 1 }}
        exit={{ x: '-1000px', opacity: 1 }}
    >
        {children}
    </motion.div>
);
