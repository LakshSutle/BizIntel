'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, DollarSign, MapPin, Calendar, Users, 
  Target, TrendingUp, ChevronRight, ChevronLeft,
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

export function OnboardingForm() {
  const { generateReport } = useDashboard();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    company_name: "",
    sales_channel: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const detectedCurrency = getCurrencyFromLocation(formData.location || '');

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.company_name?.trim()) newErrors.company_name = 'Required';
      if (!formData.business_type) newErrors.business_type = 'Required';
      if (!formData.location) newErrors.location = 'Required';
      if (!formData.business_age) newErrors.business_age = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      console.log(text);

      await generateReport(formData as BusinessInputs);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-xl">

        <div className="p-6 rounded-xl border bg-card">

          <h1 className="text-2xl font-bold mb-6">BizIntel AI</h1>

          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="space-y-4">

              {/* COMPANY NAME */}
              <div>
                <Label>Company Name</Label>
                <Input
                  value={formData.company_name}
                  onChange={(e) => updateField("company_name", e.target.value)}
                  placeholder="Enter company name"
                />
                {errors.company_name && <p className="text-red-500 text-sm">{errors.company_name}</p>}
              </div>

              {/* BUSINESS TYPE */}
              <div>
                <Label>Business Type</Label>
                <Input
                  value={formData.business_type || ""}
                  onChange={(e) => updateField("business_type", e.target.value)}
                />
              </div>

              {/* LOCATION */}
              <div>
                <Label>Location</Label>
                <Input
                  value={formData.location || ""}
                  onChange={(e) => updateField("location", e.target.value)}
                />
              </div>

              {/* AGE */}
              <div>
                <Label>Business Age</Label>
                <Input
                  type="number"
                  value={formData.business_age || ""}
                  onChange={(e) => updateField("business_age", e.target.value)}
                />
              </div>

            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-between mt-6">
            <Button onClick={handleNext}>Next</Button>
            {currentStep === 4 && (
              <Button onClick={handleSubmit}>Generate Report</Button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
