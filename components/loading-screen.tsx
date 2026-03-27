'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Brain, 
  LineChart, 
  Target, 
  CheckCircle2,
  Briefcase 
} from 'lucide-react';

const LOADING_STEPS = [
  { text: "Analyzing your business data...", icon: BarChart3 },
  { text: "Calculating financial metrics...", icon: LineChart },
  { text: "Generating AI insights...", icon: Brain },
  { text: "Building strategy recommendations...", icon: Target },
  { text: "Preparing your dashboard...", icon: Briefcase },
];

export function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 0.5;
      });
    }, 30);

    // Step progression
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= LOADING_STEPS.length - 1) return prev;
        return prev + 1;
      });
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Main card */}
        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl p-8">
          {/* Animated logo/spinner */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Outer spinning ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary/20"
                style={{ width: 80, height: 80 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
                style={{ width: 80, height: 80 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              {/* Inner pulsing circle */}
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-emerald/20 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Briefcase className="h-8 w-8 text-primary" />
              </motion.div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Generating Your Report
            </h2>
            <p className="text-sm text-muted-foreground">
              Please wait while we analyze your business
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-emerald"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right mt-1">
              {Math.round(progress)}%
            </p>
          </div>

          {/* Step indicators */}
          <div className="space-y-3">
            {LOADING_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isComplete = index < currentStep;

              return (
                <motion.div
                  key={step.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: index <= currentStep ? 1 : 0.4,
                    x: 0 
                  }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary/10 border border-primary/30' 
                      : isComplete 
                        ? 'bg-emerald/5' 
                        : 'bg-secondary/30'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    isComplete 
                      ? 'bg-emerald/20 text-emerald' 
                      : isActive 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-secondary text-muted-foreground'
                  }`}>
                    {isComplete ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : isActive ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>
                  <span className={`text-sm ${
                    isActive 
                      ? 'text-foreground font-medium' 
                      : isComplete 
                        ? 'text-emerald' 
                        : 'text-muted-foreground'
                  }`}>
                    {step.text}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Animated dots */}
          <div className="flex justify-center gap-1 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
