'use client';

import { motion } from 'framer-motion';

export const PageWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    transition={{
      ease: 'linear',
      duration: 1,
      x: { duration: 1 }
    }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
  >
    {children}
  </motion.div>
);
