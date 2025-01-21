'use client';
import { motion } from "motion/react"

export default function Motion({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{
        scale: [null, 1.0, 1.05],
        transition: {
          duration: 0.2,
          times: [0, 0.2, 1],
          ease: ["easeInOut", "easeOut"],
        },
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}