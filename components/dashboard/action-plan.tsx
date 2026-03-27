'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronDown, Calendar, Target } from 'lucide-react';
import type { ActionPlanWeek } from '@/lib/types';

interface ActionPlanProps {
  actionPlan: ActionPlanWeek[];
}

export function ActionPlan({ actionPlan }: ActionPlanProps) {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  const toggleWeek = (week: number) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">30-Day Action Plan</h3>
          <p className="text-sm text-muted-foreground">Week-by-week strategic roadmap</p>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-4">
          {actionPlan.map((week, index) => {
            const isExpanded = expandedWeek === week.week;
            const isCompleted = index === 0; // First week marked as "in progress"

            return (
              <motion.div
                key={`week-${week.week}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-10"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-4 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    isCompleted
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border-2 border-border text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-bold">{week.week}</span>
                  )}
                </div>

                {/* Week card */}
                <div
                  className={`rounded-lg border transition-all cursor-pointer ${
                    isExpanded
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-secondary/30 hover:border-primary/50'
                  }`}
                  onClick={() => toggleWeek(week.week)}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground">
                              Week {week.week}
                            </span>
                            {isCompleted && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary font-medium">
                                In Progress
                              </span>
                            )}
                          </div>
                          <h4 className="font-semibold text-foreground">{week.title}</h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground">
                          <Target className="h-3 w-3" />
                          {week.focus}
                        </span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-border">
                            <ul className="space-y-3">
                              {week.tasks.map((task, taskIndex) => (
                                <motion.li
                                  key={`week-${week.week}-task-${taskIndex}`}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: taskIndex * 0.05 }}
                                  className="flex items-start gap-3"
                                >
                                  <Circle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-muted-foreground">{task}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
