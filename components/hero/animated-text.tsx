"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedText({
  children,
  speed = 1,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: speed }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
