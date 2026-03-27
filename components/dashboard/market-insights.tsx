'use client';

import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Sparkles, Shield } from 'lucide-react';
import type { MarketInsight } from '@/lib/types';

interface MarketInsightsProps {
  insights: MarketInsight[];
}

export function MarketInsights({ insights }: MarketInsightsProps) {
  const opportunities = insights.filter(i => i.type === 'opportunity');
  const threats = insights.filter(i => i.type === 'threat');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-amber/10">
          <Sparkles className="h-5 w-5 text-amber" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Market Intelligence</h3>
          <p className="text-sm text-muted-foreground">Opportunities vs Threats analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opportunities */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-emerald" />
            <h4 className="font-medium text-emerald">Opportunities</h4>
          </div>
          {opportunities.map((insight, index) => (
            <motion.div
              key={`opportunity-${insight.title}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-3 rounded-lg bg-emerald/5 border border-emerald/20 hover:border-emerald/40 transition-colors"
            >
              <h5 className="font-medium text-foreground text-sm">{insight.title}</h5>
              <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Threats */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-rose" />
            <h4 className="font-medium text-rose">Threats</h4>
          </div>
          {threats.map((insight, index) => (
            <motion.div
              key={`threat-${insight.title}-${index}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-3 rounded-lg bg-rose/5 border border-rose/20 hover:border-rose/40 transition-colors"
            >
              <h5 className="font-medium text-foreground text-sm">{insight.title}</h5>
              <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
