'use client';

import { motion } from 'framer-motion';
import { Heart, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import type { HealthScore as HealthScoreType } from '@/lib/types';

interface HealthScoreProps {
  healthScore: HealthScoreType;
  diagnosis: string;
}

const getRiskColor = (level: string) => {
  switch (level) {
    case 'Low':
      return 'text-emerald';
    case 'Medium':
      return 'text-amber';
    case 'High':
      return 'text-rose';
    default:
      return 'text-muted-foreground';
  }
};

const getRiskBg = (level: string) => {
  switch (level) {
    case 'Low':
      return 'bg-emerald/20 border-emerald/30';
    case 'Medium':
      return 'bg-amber/20 border-amber/30';
    case 'High':
      return 'bg-rose/20 border-rose/30';
    default:
      return 'bg-muted border-border';
  }
};

const getRiskIcon = (level: string) => {
  switch (level) {
    case 'Low':
      return CheckCircle;
    case 'Medium':
      return AlertTriangle;
    case 'High':
      return XCircle;
    default:
      return Info;
  }
};

export function HealthScore({ healthScore, diagnosis }: HealthScoreProps) {
  const { score, riskLevel, factors } = healthScore;
  const RiskIcon = getRiskIcon(riskLevel);

  // Calculate the stroke dash offset for the circular progress
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-rose/10">
          <Heart className="h-5 w-5 text-rose" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Business Health Score</h3>
          <p className="text-sm text-muted-foreground">Overall assessment and diagnosis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score Visualization */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-32 h-32">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="45"
                fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth="10"
              />
              {/* Progress circle */}
              <motion.circle
                cx="64"
                cy="64"
                r="45"
                fill="none"
                stroke={
                  score >= 70
                    ? 'hsl(160, 84%, 39%)'
                    : score >= 50
                    ? 'hsl(38, 92%, 50%)'
                    : 'hsl(0, 84%, 60%)'
                }
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className={`text-3xl font-bold ${
                  score >= 70 ? 'text-emerald' : score >= 50 ? 'text-amber' : 'text-rose'
                }`}
              >
                {score}
              </motion.span>
              <span className="text-xs text-muted-foreground">out of 100</span>
            </div>
          </div>

          {/* Risk Level Badge */}
          <div className={`mt-4 px-4 py-2 rounded-full border flex items-center gap-2 ${getRiskBg(riskLevel)}`}>
            <RiskIcon className={`h-4 w-4 ${getRiskColor(riskLevel)}`} />
            <span className={`text-sm font-medium ${getRiskColor(riskLevel)}`}>
              {riskLevel} Risk
            </span>
          </div>
        </div>

        {/* Factors and Diagnosis */}
        <div className="space-y-4">
          {/* Key Factors */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Key Factors</h4>
            <ul className="space-y-2">
              {factors.map((factor, index) => (
                <motion.li
                  key={`factor-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="h-4 w-4 text-emerald flex-shrink-0 mt-0.5" />
                  {factor}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Diagnosis */}
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              Business Diagnosis
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {diagnosis}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
