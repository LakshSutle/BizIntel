'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Zap, TrendingUp, Megaphone, Settings2 } from 'lucide-react';
import type { StrategicRecommendation } from '@/lib/types';

interface RecommendationsProps {
  recommendations: StrategicRecommendation[];
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'financial':
      return TrendingUp;
    case 'growth':
      return Zap;
    case 'marketing':
      return Megaphone;
    case 'operations':
      return Settings2;
    default:
      return Lightbulb;
  }
};

const getImpactStyle = (impact: string) => {
  switch (impact) {
    case 'High':
      return 'bg-emerald/20 text-emerald border-emerald/30';
    case 'Medium':
      return 'bg-amber/20 text-amber border-amber/30';
    case 'Low':
      return 'bg-muted text-muted-foreground border-border';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
};

export function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Lightbulb className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Strategic Recommendations</h3>
          <p className="text-sm text-muted-foreground">Actionable insights to improve performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec, index) => {
          const Icon = getCategoryIcon(rec.category);
          return (
            <motion.div
              key={`rec-${rec.title}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-4 rounded-lg border border-border bg-secondary/30 hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getImpactStyle(rec.impact)}`}>
                  {rec.impact} Impact
                </span>
              </div>

              <h4 className="font-semibold text-foreground text-sm mb-2">{rec.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{rec.description}</p>

              <div className="mt-3 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">Category: </span>
                <span className="text-xs font-medium text-foreground">{rec.category}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
