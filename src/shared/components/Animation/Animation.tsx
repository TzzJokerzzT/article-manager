import { motion } from 'motion/react';

export const Animation = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
      }}
    >
      {children}
    </motion.div>
  );
};
