'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, DollarSign, MapPin, Calendar, Users, 
  Target, TrendingUp, ShoppingBag, ChevronRight, ChevronLeft,
  Briefcase, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ThemeToggle } from '@/components/theme-toggle';
import { useDashboard } from '@/lib/dashboard-context';
import { getCurrencyFromLocation } from '@/lib/currency';
import type { BusinessInputs } from '@/lib/types';

const BUSINESS_TYPES = [
  'Retail',
  'E-commerce',
  'Professional Services',
  'Manufacturing',
  'Food & Beverage',
  'Healthcare',
  'Technology',
  'Real Estate',
  'Construction',
  'Other',
];

const CUSTOMER_TYPES = [
  'B2B (Business to Business)',
  'B2C (Business to Consumer)',
  'Both B2B and B2C',
];

const SALES_CHANNELS = [
  'Physical Store',
  'Online Website',
  'Social Media',
  'Marketplace (Amazon, etc.)',
  'Direct Sales',
  'Distributors',
  'Wholesale',
];

const GROWTH_TRENDS = [
  'Rapidly Growing (>20% annually)',
  'Steady Growth (5-20% annually)',
  'Stable (0-5% annually)',
  'Declining',
];

interface FormStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FORM_STEPS: FormStep[] = [
  { id: 1, title: 'Business Basics', description: 'Tell us about your business', icon: <Building2 className="h-5 w-5" /> },
  { id: 2, title: 'Financial Overview', description: 'Your revenue and expenses', icon: <DollarSign className="h-5 w-5" /> },
  { id: 3, title: 'Operations', description: 'How your business operates', icon: <Users className="h-5 w-5" /> },
  { id: 4, title: 'Strategy', description: 'Goals and challenges', icon: <Target className="h-5 w-5" /> },
];

export function OnboardingForm() {
  const { generateReport } = useDashboard();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BusinessInputs>>({
    sales_channel: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get currency based on location
  const detectedCurrency = getCurrencyFromLocation(formData.location || '');

  const updateField = (field: keyof BusinessInputs, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleSalesChannel = (channel: string) => {
    const current = formData.sales_channel || [];
    const updated = current.includes(channel)
      ? current.filter(c => c !== channel)
      : [...current, channel];
    updateField('sales_channel', updated);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.business_type) newErrors.business_type = 'Required';
      if (!formData.location) newErrors.location = 'Required';
      if (!formData.business_age || formData.business_age < 0) newErrors.business_age = 'Required';
    } else if (step === 2) {
      if (!formData.revenue || formData.revenue <= 0) newErrors.revenue = 'Required';
      if (!formData.expenses || formData.expenses < 0) newErrors.expenses = 'Required';
    } else if (step === 3) {
      if (!formData.employees || formData.employees < 1) newErrors.employees = 'Required';
      if (!formData.customer_type) newErrors.customer_type = 'Required';
      if (!formData.sales_channel?.length) newErrors.sales_channel = 'Select at least one';
      if (!formData.growth_trend) newErrors.growth_trend = 'Required';
    } else if (step === 4) {
      if (!formData.business_goal?.trim()) newErrors.business_goal = 'Required';
      if (!formData.biggest_challenge?.trim()) newErrors.biggest_challenge = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
  console.log("🔥 BUTTON CLICKED");

  if (!validateStep(currentStep)) {
    console.log("❌ Validation failed");
    return;
  }

  try {
    console.log("🚀 Calling API...");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log("📡 API STATUS:", res.status);

    const text = await res.text();

    console.log("🔥 API RESPONSE:", text);

  } catch (err) {
    console.error("❌ API ERROR:", err);
  }

  // Keep your dashboard working
  try {
    await generateReport(formData as BusinessInputs);
  } catch (error) {
    console.error("❌ Dashboard Error:", error);
  }
};
  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Glassmorphism Card */}
        <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald/20 rounded-full blur-3xl pointer-events-none" />
          
          {/* Header */}
          <div className="relative p-6 pb-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">BizIntel AI</h1>
                  <p className="text-muted-foreground text-sm">Generate your personalized analysis</p>
                </div>
              </div>
              <ThemeToggle />
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Step {currentStep} of 4</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-emerald"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex justify-between mt-6">
              {FORM_STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    step.id === currentStep
                      ? 'text-primary'
                      : step.id < currentStep
                      ? 'text-emerald'
                      : 'text-muted-foreground'
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      step.id === currentStep
                        ? 'bg-primary/20'
                        : step.id < currentStep
                        ? 'bg-emerald/20'
                        : 'bg-secondary'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-xs mt-1 hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form content */}
          <div className="relative p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Step 1: Business Basics */}
                {currentStep === 1 && (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-semibold text-foreground">{FORM_STEPS[0].title}</h2>
                      <p className="text-muted-foreground text-sm">{FORM_STEPS[0].description}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="business_type" className="text-foreground">Business Type</Label>
                        <Select
                          value={formData.business_type || ''}
                          onValueChange={(value) => updateField('business_type', value)}
                        >
                          <SelectTrigger id="business_type" className={errors.business_type ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select your business type" />
                          </SelectTrigger>
                          <SelectContent>
                            {BUSINESS_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.business_type && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.business_type}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-foreground">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="location"
                            placeholder="City, State/Country"
                            className={`pl-10 ${errors.location ? 'border-destructive' : ''}`}
                            value={formData.location || ''}
                            onChange={(e) => updateField('location', e.target.value)}
                          />
                        </div>
                        {errors.location && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.location}
                          </p>
                        )}
                        {formData.location && (
                          <p className="text-xs text-muted-foreground">
                            Detected currency: <span className="text-primary font-medium">{detectedCurrency.symbol} ({detectedCurrency.code})</span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="business_age" className="text-foreground">Business Age (Years)</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="business_age"
                            type="number"
                            min="0"
                            placeholder="Years in operation"
                            className={`pl-10 ${errors.business_age ? 'border-destructive' : ''}`}
                            value={formData.business_age || ''}
                            onChange={(e) => updateField('business_age', parseInt(e.target.value) || 0)}
                          />
                        </div>
                        {errors.business_age && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.business_age}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Financial Overview */}
                {currentStep === 2 && (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-semibold text-foreground">{FORM_STEPS[1].title}</h2>
                      <p className="text-muted-foreground text-sm">{FORM_STEPS[1].description}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="revenue" className="text-foreground">Monthly Revenue ({detectedCurrency.symbol})</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald" />
                          <Input
                            id="revenue"
                            type="number"
                            min="0"
                            placeholder="e.g., 50000"
                            className={`pl-10 ${errors.revenue ? 'border-destructive' : ''}`}
                            value={formData.revenue || ''}
                            onChange={(e) => updateField('revenue', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        {errors.revenue && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.revenue}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expenses" className="text-foreground">Monthly Expenses ({detectedCurrency.symbol})</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-rose" />
                          <Input
                            id="expenses"
                            type="number"
                            min="0"
                            placeholder="e.g., 35000"
                            className={`pl-10 ${errors.expenses ? 'border-destructive' : ''}`}
                            value={formData.expenses || ''}
                            onChange={(e) => updateField('expenses', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        {errors.expenses && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.expenses}
                          </p>
                        )}
                      </div>

                      {/* Live calculation preview */}
                      {formData.revenue && formData.expenses !== undefined && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-lg bg-secondary/50 border border-border"
                        >
                          <p className="text-sm text-muted-foreground mb-2">Estimated Monthly Profit</p>
                          <p className={`text-2xl font-bold ${
                            (formData.revenue - (formData.expenses || 0)) >= 0 ? 'text-emerald' : 'text-destructive'
                          }`}>
                            {detectedCurrency.symbol}{((formData.revenue || 0) - (formData.expenses || 0)).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formData.revenue > 0 
                              ? `${(((formData.revenue - (formData.expenses || 0)) / formData.revenue) * 100).toFixed(1)}% margin`
                              : 'Enter revenue to calculate margin'}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </>
                )}

                {/* Step 3: Operations */}
                {currentStep === 3 && (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-semibold text-foreground">{FORM_STEPS[2].title}</h2>
                      <p className="text-muted-foreground text-sm">{FORM_STEPS[2].description}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="employees" className="text-foreground">Number of Employees</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="employees"
                            type="number"
                            min="1"
                            placeholder="Including yourself"
                            className={`pl-10 ${errors.employees ? 'border-destructive' : ''}`}
                            value={formData.employees || ''}
                            onChange={(e) => updateField('employees', parseInt(e.target.value) || 0)}
                          />
                        </div>
                        {errors.employees && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.employees}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customer_type" className="text-foreground">Customer Type</Label>
                        <Select
                          value={formData.customer_type || ''}
                          onValueChange={(value) => updateField('customer_type', value)}
                        >
                          <SelectTrigger id="customer_type" className={errors.customer_type ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Who are your customers?" />
                          </SelectTrigger>
                          <SelectContent>
                            {CUSTOMER_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.customer_type && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.customer_type}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-foreground">Sales Channels (Select all that apply)</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {SALES_CHANNELS.map((channel) => (
                            <div
                              key={channel}
                              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                                formData.sales_channel?.includes(channel)
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              onClick={() => toggleSalesChannel(channel)}
                            >
                              <Checkbox
                                checked={formData.sales_channel?.includes(channel)}
                                onCheckedChange={() => toggleSalesChannel(channel)}
                              />
                              <span className="text-sm text-foreground">{channel}</span>
                            </div>
                          ))}
                        </div>
                        {errors.sales_channel && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.sales_channel}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="growth_trend" className="text-foreground">Growth Trend</Label>
                        <Select
                          value={formData.growth_trend || ''}
                          onValueChange={(value) => updateField('growth_trend', value)}
                        >
                          <SelectTrigger id="growth_trend" className={errors.growth_trend ? 'border-destructive' : ''}>
                            <SelectValue placeholder="How is your business growing?" />
                          </SelectTrigger>
                          <SelectContent>
                            {GROWTH_TRENDS.map((trend) => (
                              <SelectItem key={trend} value={trend}>{trend}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.growth_trend && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.growth_trend}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Step 4: Strategy */}
                {currentStep === 4 && (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-semibold text-foreground">{FORM_STEPS[3].title}</h2>
                      <p className="text-muted-foreground text-sm">{FORM_STEPS[3].description}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="business_goal" className="text-foreground">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-primary" />
                            Primary Business Goal
                          </div>
                        </Label>
                        <Textarea
                          id="business_goal"
                          placeholder="What do you want to achieve in the next 12 months? E.g., Increase revenue by 30%, expand to new markets..."
                          className={`min-h-[100px] ${errors.business_goal ? 'border-destructive' : ''}`}
                          value={formData.business_goal || ''}
                          onChange={(e) => updateField('business_goal', e.target.value)}
                        />
                        {errors.business_goal && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.business_goal}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="biggest_challenge" className="text-foreground">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-amber" />
                            Biggest Challenge
                          </div>
                        </Label>
                        <Textarea
                          id="biggest_challenge"
                          placeholder="What&apos;s holding your business back? E.g., Lack of qualified leads, cash flow issues, competition..."
                          className={`min-h-[100px] ${errors.biggest_challenge ? 'border-destructive' : ''}`}
                          value={formData.biggest_challenge || ''}
                          onChange={(e) => updateField('biggest_challenge', e.target.value)}
                        />
                        {errors.biggest_challenge && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.biggest_challenge}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>

              <Button
                onClick={currentStep === 4 ? handleSubmit : handleNext}
                className="gap-2 bg-gradient-to-r from-primary to-indigo-500 hover:opacity-90 text-primary-foreground"
              >
                {currentStep === 4 ? 'Generate Report' : 'Continue'}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
