'use client';

import { motion } from 'framer-motion';

export function LoadingScreen() {
  const steps = [
    "Analyzing your business data...",
    "Calculating financial metrics...",
    "Generating insights...",
    "Building strategy...",
    "Preparing dashboard...",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      {steps.map((text, index) => (
        <motion.p
          key={`loading-${text}-${index}`} // ✅ FIXED KEY
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.3 }}
          className="text-sm text-muted-foreground"
        >
          {text}
        </motion.p>
      ))}
    </div>
  );
}
