"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepProps {
  step: number;
  title: string;
  description?: string;
  isActive: boolean;
  isCompleted: boolean;
  isLast: boolean;
}

function Step({ step, title, description, isActive, isCompleted, isLast }: StepProps) {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {/* ステップ番号/チェックアイコン */}
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200",
            {
              "bg-blue-600 border-blue-600 text-white": isActive,
              "bg-green-600 border-green-600 text-white": isCompleted,
              "border-gray-300 text-gray-500": !isActive && !isCompleted,
            }
          )}
        >
          {isCompleted ? (
            <Check className="w-4 h-4" />
          ) : (
            <span className="text-sm font-medium">{step}</span>
          )}
        </div>

        {/* ステップ情報 */}
        <div className="ml-3">
          <p
            className={cn("text-sm font-medium", {
              "text-blue-600": isActive,
              "text-green-600": isCompleted,
              "text-gray-500": !isActive && !isCompleted,
            })}
          >
            {title}
          </p>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
      </div>

      {/* 接続線 */}
      {!isLast && (
        <div
          className={cn(
            "flex-1 h-0.5 mx-4 transition-all duration-200",
            {
              "bg-green-600": isCompleted,
              "bg-gray-300": !isCompleted,
            }
          )}
        />
      )}
    </div>
  );
}

interface StepsProps {
  currentStep: number;
  steps: Array<{
    title: string;
    description?: string;
  }>;
  className?: string;
}

export function Steps({ currentStep, steps, className }: StepsProps) {
  return (
    <div className={cn("flex items-center w-full", className)}>
      {steps.map((stepData, index) => (
        <Step
          key={index}
          step={index + 1}
          title={stepData.title}
          description={stepData.description}
          isActive={currentStep === index + 1}
          isCompleted={currentStep > index + 1}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
} 